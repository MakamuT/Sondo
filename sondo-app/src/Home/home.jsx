import './home.css';
import Header from './Header';
import Footer from './Footer';
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaTimes } from "react-icons/fa";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMalls, setFilteredMalls] = useState([]);
  const [displayCount, setDisplayCount] = useState(4);
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [error, setError] = useState(null);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate();

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setError("Unable to retrieve your location.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (userLocation) {
      setSearchQuery("");
      fetchPlaces(userLocation);
    }
  }, [userLocation]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchPlaces = useCallback(async (location = null) => {
    if (!debouncedQuery.trim() && !location) {
      setError("Please enter a location to search.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSearchInitiated(true);
      const baseURL = `http://localhost:5000/api/places?`;
      let url = baseURL;

      if (location) {
        url += `location=${location.lat},${location.lng}&radius=5000`;
      } else {
        url += `query=${encodeURIComponent(debouncedQuery)}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const malls = data.results.map((place) => ({
          id: place.place_id,
          name: place.name,
          imgUrl: place.photos
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=AIzaSyD0oaunDJdfbZj-Tv1VZRpIHXnSQTWAMT8`
            : "public/mall.jpg",
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
      setLoading(false);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    if (debouncedQuery) fetchPlaces();
  }, [debouncedQuery, fetchPlaces]);

  const handleMallClick = (mallName, mallImageUrl) => {
    navigate("/booking", { state: { mallName, mallImageUrl } });
  };
  

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setError(null);
  };

  const handleLoadMore = async () => {
    setLoadingMore(true);
    setDisplayCount((prevCount) => prevCount + 4);
    setLoadingMore(false);
  };

  return (
    <div className="container">
      <Header />

      <div className="home">
        <div className="search-container">
          <div className="search-box">
            {/* Geolocation Icon to the Left */}
            <FaMapMarkerAlt
              className="location-icon"
              size={24}
              onClick={getUserLocation}
              style={{
                cursor: "pointer",
                marginRight: "10px",
              }}
              aria-label="Use my location"
              title="Use my location"
            />
            <input
              type="text"
              aria-label="Search for malls or cities"
              placeholder="Search by city or mall name..."
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button aria-label="Search" onClick={() => fetchPlaces()}>
              Search
            </button>
            {/* Clear Icon */}
            {searchQuery && (
              <FaTimes
                className="clear-icon"
                size={20}
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                title="Clear search"
              />
            )}
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading && <div className="load"></div>}

        <div className="results">
          {filteredMalls.length > 0 && (
            <div className="mall-cards">
              {filteredMalls.slice(0, displayCount).map((mall) => (
                <div
                key={mall.id}
                className="mall-card"
                onClick={() => handleMallClick(mall.name, mall.imgUrl)}
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
          )}
          {displayCount < filteredMalls.length && (
            <button
              onClick={handleLoadMore}
              className="load-more"
              disabled={loadingMore}
              aria-label="Load more results"
            >
              {loadingMore ? "Loading..." : "Load More"}
            </button>
          )}
          {filteredMalls.length === 0 && !loading && !error && searchInitiated && (
            <p>No results found. Try a different query.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
