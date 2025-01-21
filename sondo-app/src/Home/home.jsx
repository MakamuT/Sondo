import './home.css'; // Importing the CSS file to style the Home component.
import Header from './header'; // Importing the Header component to display at the top of the page.
import { useState } from "react"; // Importing the useState hook to manage component-specific state.
import { useNavigate } from "react-router-dom"; // Importing useNavigate to enable navigation to other pages programmatically.

function Home() {
  // State to store the user's search input.
  const [searchQuery, setSearchQuery] = useState(""); 
  // State to store the search results fetched from the Overpass API.
  const [searchResults, setSearchResults] = useState([]);
  // State to manage the loading status during asynchronous operations.
  const [loading, setLoading] = useState(false);
  // Hook to navigate the user to a different route within the app.
  const navigate = useNavigate();

  /**
   * Handles user interaction with a specific mall card.
   * Navigates the user to a booking page for the selected mall, passing the mall's ID and name as state.
   * @param {string} mallId - Unique identifier for the selected mall.
   * @param {string} mallName - Name of the selected mall.
   */
  const handleMallClick = (mallId, mallName) => {
    navigate(`/booking/${mallId}`, { state: { name: mallName } });
  };

  /**
   * Initiates a search for malls around a fixed location (Johannesburg in this case).
   * Fetches data from the Overpass API and updates the state with the results.
   * Displays an alert if no input is provided or no results are found.
   */
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      // If the search query is empty or contains only spaces, alert the user.
      alert("Please enter a search query.");
      return;
    }

    setLoading(true); // Set loading state to true to indicate that data is being fetched.
    try {
      // Build the Overpass API query to search for nodes matching the input within a 10km radius of Johannesburg's coordinates.
      const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];
      (
        node["name"~"${searchQuery}",i](around:10000,-26.2041,28.0473);
      );
      out;`;
      const response = await fetch(overpassUrl); // Send a GET request to the Overpass API.
      const data = await response.json(); // Parse the JSON response.

      console.log("Raw Overpass Response:", data); // Log the raw API response for debugging purposes.

      // Transform the raw API response into a more user-friendly format.
      const results = data.elements.map((element) => ({
        id: element.id, // Unique ID for the element.
        name: element.tags.name || "Unnamed Location", // Use "Unnamed Location" if no name is provided.
        type: element.tags.amenity || element.tags.entrance || "Point of Interest", // Determine the type of the location.
        address: `Lat: ${element.lat}, Lon: ${element.lon}`, // Display the location's latitude and longitude.
        coordinates: [element.lon, element.lat], // Store the coordinates for potential future use.
      }));

      // Alert the user if no results are found.
      if (results.length === 0) {
        alert("No results found. Try refining your search query.");
      }

      setSearchResults(results); // Update the state with the transformed results.
    } catch (error) {
      // Log any errors that occur during the fetch request.
      console.error("Error with Overpass API:", error);
      // Notify the user that the fetch request failed.
      alert("Failed to fetch search results. Please try again.");
    } finally {
      // Reset the loading state to false once the fetch operation is complete.
      setLoading(false);
    }
  };

  /**
   * Updates the search query state as the user types into the input field.
   * @param {Event} e - The event object from the input field's onChange event.
   */
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query state with the new input value.
  };

  /**
   * Performs a search for malls based on the user's current geolocation.
   * Utilizes the Geolocation API to get the user's coordinates and queries the Overpass API with those coordinates.
   * Alerts the user if location services are disabled or if no results are found near their location.
   */
  const handleGeolocationSearch = () => {
    if (!searchQuery.trim()) {
      alert("Please enter a search query.");
      return;
    }

    setLoading(true); // Set loading state to true to indicate that data is being fetched.
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords; // Extract the user's latitude and longitude.
        try {
          // Build the Overpass API query using the user's dynamic coordinates.
          const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];
          (
            node["name"~"${searchQuery}",i](around:10000,${latitude},${longitude});
          );
          out;`;
          const response = await fetch(overpassUrl); // Send a GET request to the Overpass API.
          const data = await response.json(); // Parse the JSON response.

          console.log("Dynamic Location Results:", data); // Log the raw API response for debugging purposes.

          // Transform the raw API response into a more user-friendly format.
          const results = data.elements.map((element) => ({
            id: element.id,
            name: element.tags.name || "Unnamed Location",
            type: element.tags.amenity || element.tags.entrance || "Point of Interest",
            address: `Lat: ${element.lat}, Lon: ${element.lon}`,
            coordinates: [element.lon, element.lat],
          }));

          // Alert the user if no results are found near their location.
          if (results.length === 0) {
            alert("No results found near your location.");
          }

          setSearchResults(results); // Update the state with the transformed results.
        } catch (error) {
          // Log any errors that occur during the fetch request.
          console.error("Error with Overpass API:", error);
          // Notify the user that the fetch request failed.
          alert("Failed to fetch search results. Please try again.");
        } finally {
          // Reset the loading state to false once the fetch operation is complete.
          setLoading(false);
        }
      },
      (error) => {
        // Log geolocation errors.
        console.error("Geolocation Error:", error);
        // Notify the user that location services are disabled or inaccessible.
        alert("Could not fetch your location. Please enable location services.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="container">
      <Header /> {/* Render the Header component to display at the top of the page. */}
      <div className="home">
        <div className="search-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search for malls by name..." // Placeholder text for the input field.
              value={searchQuery} // Bind the input field's value to the searchQuery state.
              onChange={handleInputChange} // Update searchQuery as the user types.
            />
            {/* Uncomment the following line to enable fixed-location searches. */}
            {/* <button onClick={handleSearch}>Search</button> */}
            <button onClick={handleGeolocationSearch}>Search Near Me</button> {/* Button to trigger geolocation-based search. */}
          </div>
        </div>

        {loading && <p>Loading...</p>} {/* Display a loading message while data is being fetched. */}

        {searchResults.length > 0 ? (
          <div className="results">
            <h2>Search Results</h2>
            <div className="mall-cards">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="mall-card"
                  onClick={() => handleMallClick(result.id, result.name)} // Navigate to the booking page when a card is clicked.
                  style={{ cursor: "pointer" }} // Change cursor to indicate the card is clickable.
                >
                  <h3>{result.name}</h3>
                  <p>Type: {result.type}</p>
                  <p>{result.address}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          !loading && <p>No results found. Try refining your search query.</p> // Display a message if no results are found.
        )}
      </div>
    </div>
  );
}

export default Home; // Export the Home component to make it available for import in other files.
