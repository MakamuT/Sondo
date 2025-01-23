import './home.css';
import Header from './header';
import Footer from './Footer';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMalls, setFilteredMalls] = useState([]);
  const [displayCount, setDisplayCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch places from the API
  const fetchPlaces = async () => {
    if (!searchQuery.trim()) {
      alert("Please enter a location to search.");
      return;
    }

    try {
      setLoading(true); // Start loading spinner
      const response = await fetch(
        `http://localhost:5000/api/places?query=${encodeURIComponent(searchQuery)}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        // Set all fetched malls to state
        const malls = data.results.map((place) => ({
          id: place.place_id,
          name: place.name,
          imgUrl: place.photos
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=API_KEY`
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
    } finally {
      setLoading(false); // Stop loader
    }
  };

  // Navigate to booking page for the selected mall
  const handleMallClick = (mallId) => {
    navigate(`/booking/${mallId}`);
  };

  // Handle input changes for the search bar
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle "Load More" functionality
  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 5);
  };

  return (
    <div className="container">
      <Header />

      <div className="home">

        {/********** Search Section ***************/}
        
        <div className="search-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by city or mall name..."
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button onClick={fetchPlaces}>Search</button>
          </div>
        </div>

        {/***************** Loading Indicator *****************/}

        {loading && <div className="load"></div>}

        {/***************** Search Results ***************/}

        {filteredMalls.length > 0 && (
          <div className="results">
            <h2>Search Results</h2>
            <div className="mall-cards">

              {/* Render only up to displayCount number of results */}

              {filteredMalls.slice(0, displayCount).map((mall) => (
                <div
                  key={mall.id}
                  className="mall-card"
                  onClick={() => handleMallClick(mall.id)}
                >
                  <img
                    src={mall.imgUrl}
                    alt={mall.name}
                    onError={(e) => (e.target.src = "fallback-image.jpg")}
                  />
                  <h3>{mall.name}</h3>
                  <p>{mall.address}</p>
                </div>
              ))}
            </div>

            {/************** "Load More" Button **************/}

            {displayCount < filteredMalls.length && (
              <button onClick={handleLoadMore} className="load-more">
                Load More
              </button>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
