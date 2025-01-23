import './home.css';
import Header from './header';
import Footer from './Footer';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  // State for the user's search input
  const [searchQuery, setSearchQuery] = useState("");
  
  // State for storing the filtered malls fetched from the API
  const [filteredMalls, setFilteredMalls] = useState([]);
  
  // Hook for navigation to other pages
  const navigate = useNavigate();

  // Function to fetch places from the Google Places API based on the search query
  const fetchPlaces = async () => {
    if (!searchQuery.trim()) {
      alert("Please enter a location to search.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/places?query=${encodeURIComponent(searchQuery)}`);
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (data.results && data.results.length > 0) {
        const malls = data.results.map((place) => ({
          id: place.place_id,
          name: place.name,
          imgUrl: place.photos
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=APIKEYPLACEHOLDER`
            : "",
          address: place.formatted_address,
        }));
        setFilteredMalls(malls);
      } else {
        alert("No results found. Try a different query.");
        setFilteredMalls([]);
      }
    } catch (error) {
      console.error("Error fetching places:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  //handle navigation to the booking page for user selected mall. 
  // Redirect to the booking page with the mall ID as a parameter
  const handleMallClick = (mallId) => {
    navigate(`/booking/${mallId}`); 
  };

  // Handle changes in the search input field
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container">
      {/******************* Header ********************/}
      <Header />
      
      <div className="home">
        {/********** Search Section ***************/}
        <div className="search-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by city or mall name..."
              value={searchQuery} // Bond input field to the searchQuery state
              onChange={handleInputChange} // Call handleInputChange on every input change
            />
            <button onClick={fetchPlaces}>Search</button>
          </div>
        </div>

        {/***************** Search Results ***************/}
        {filteredMalls.length > 0 && ( // Render this block only if there are results returned
          <div className="results">
            <h2>Search Results</h2>
            <div className="mall-cards"> 
              {filteredMalls.map((mall) => ( // Map through the filtered malls rendering each as a card
                <div
                  key={mall.id} // Unique key for card
                  className="mall-card"
                  onClick={() => handleMallClick(mall.id)}
                >
                  <img
                    src={mall.imgUrl} // Image of the mall
                    alt={mall.name} // Alt text for the image
                    onError={(e) => (e.target.src = "fallback-image.jpg")} // fallback image, replace later
                  />
                  <h3>{mall.name}</h3> 
                  <p>{mall.address}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer className="footer"/>
    </div>
  );
}

export default Home;