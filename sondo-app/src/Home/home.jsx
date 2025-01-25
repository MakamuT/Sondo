import './home.css';
import Header from './Header';
import Footer from './Footer';
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMalls, setFilteredMalls] = useState([]);
  const [displayCount, setDisplayCount] = useState(4);
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Debouncing the search query to avoid excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // Adjust delay as needed
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetching places from the API
  const fetchPlaces = useCallback(async () => {
    if (!debouncedQuery.trim()) {
      setError("Please enter a location to search.");
      return;
    }

    try {
      setLoading(true);
      setError(null); 
      const response = await fetch(
        `http://localhost:5000/api/places?query=${encodeURIComponent(debouncedQuery)}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        // Set state to the fetched mall results
        const malls = data.results.map((place) => ({
          id: place.place_id,
          name: place.name,
          imgUrl: place.photos
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=AIzaSyD0oaunDJdfbZj-Tv1VZRpIHXnSQTWAMT8`
            : "public/mall.jpg", // Fallback image in case of missing photo
          address: place.formatted_address,
        }));
        setFilteredMalls(malls);
      } else {
        setError("No results found. Try a different query.");
        setFilteredMalls([]);
      }
    } catch (error) {
      console.error("Error fetching places:", error);
      setError(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false); // Stop loader
    }
  }, [debouncedQuery]);

  // Trigger a fetch when debouncedQuery changes
  useEffect(() => {
    if (debouncedQuery) fetchPlaces();
  }, [debouncedQuery, fetchPlaces]);

  // Navigate to booking page for the selected mall
  const handleMallClick = (mallName) => {
    navigate("/booking", { state: { mallName } });
  };

  // Handle input changes for the search bar
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle "Load More" functionality
  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 4);
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
              aria-label="Search for malls or cities"
              placeholder="Search by city or mall name..."
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button aria-label="Search" onClick={() => fetchPlaces()}>Search</button>
            <button aria-label="Clear search" onClick={() => setSearchQuery("")}>Clear</button>
          </div>
        </div>

        {/***************** Error Handling ****************/}

        {error && <div className="error-message">{error}</div>}

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
                  onClick={() => handleMallClick(mall.name)}
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
            <div>
              {displayCount < filteredMalls.length && (
              <button onClick={handleLoadMore} className="load-more">
                Load More
              </button>
            )}</div>

          </div>
        )}

        {/***************** No Results Message **************/}

        {filteredMalls.length === 0 && !loading && !error && (
          <p>No results found. Try a different query.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Home;