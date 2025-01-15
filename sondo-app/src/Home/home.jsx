import './home.css';
import Header from './header';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filteredMalls, setFilteredMalls] = useState([]);
  const navigate = useNavigate();

  const handleMallClick = (mallId) => {
    navigate(`/booking/${mallId}`);
  };
  const mockMalls = {
    "Johannesburg": [
      {
        id: "mall1",
        name: "Sandton City",
        imgUrl: "https://images.unsplash.com/photo-1549479732-ee0adb0f5d32?q=80&w=1626&auto=format&fit=crop",
        devices: ["Wheelchair", "Scooter"],
      },
      {
        id: "mall2",
        name: "Rosebank Mall",
        imgUrl: "https://images.unsplash.com/photo-1506015391300-4802dc85da6e?q=80&w=1626&auto=format&fit=crop",
        devices: ["Scooter"],
      },
    ],
    "Cape Town": [
      {
        id: "mall3",
        name: "Canal Walk Shopping Centre",
        imgUrl: "https://images.unsplash.com/photo-1575659729240-77f497f4807d?q=80&w=1626&auto=format&fit=crop",
        devices: ["Wheelchair", "Walker"],
      },
      {
        id: "mall4",
        name: "V&A Waterfront",
        imgUrl: "https://images.unsplash.com/photo-1506015391300-4802dc85da6e?q=80&w=1626&auto=format&fit=crop",
        devices: ["Cane", "Scooter"],
      },
    ],
    "Durban": [
      {
        id: "mall5",
        name: "Gateway Theatre of Shopping",
        imgUrl: "https://images.unsplash.com/photo-1727950693413-2068d59ea433?w=500&auto=format&fit=crop&q=60",
        devices: ["Wheelchair", "Scooter"],
      },
      {
        id: "mall6",
        name: "The Pavilion Shopping Centre",
        imgUrl: "https://images.unsplash.com/photo-1516274626895-055a99214f08?q=80&w=1470&auto=format&fit=crop",
        devices: ["Walker", "Scooter"],
      },
    ],
    "Pretoria": [
      {
        id: "mall7",
        name: "Menlyn Park Shopping Centre",
        imgUrl: "https://images.unsplash.com/photo-1549479732-ee0adb0f5d32?q=80&w=1626&auto=format&fit=crop",
        devices: ["Wheelchair", "Cane"],
      },
      {
        id: "mall8",
        name: "Brooklyn Mall",
        imgUrl: "https://images.unsplash.com/photo-1506015391300-4802dc85da6e?q=80&w=1626&auto=format&fit=crop",
        devices: ["Wheelchair", "Scooter"],
      },
    ],
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert("Please enter a city or mall name.");
      return;
    }

    // Check if query matches a city
    const cityMalls = mockMalls[searchQuery];
    if (cityMalls) {
      setFilteredMalls(cityMalls);
      return;
    }

    // Check if query matches a mall name in any city
    const mallResults = Object.values(mockMalls).flatMap((malls) =>
      malls.filter((mall) =>
        mall.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    if (mallResults.length > 0) {
      setFilteredMalls(mallResults);
    } else {
      alert("No matching malls or cities found. Try another search.");
      setFilteredMalls([]);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  useEffect(() => {
    const citySuggestions = Object.keys(mockMalls).filter((city) =>
      city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const mallSuggestions = Object.values(mockMalls)
      .flatMap((malls) => malls)
      .filter((mall) =>
        mall.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((mall) => mall.name);

    setSuggestions([...citySuggestions, ...mallSuggestions]);
  }, [searchQuery]);

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);

    // Directly check if the suggestion is a city or mall
    const cityMalls = mockMalls[suggestion];
    if (cityMalls) {
      setFilteredMalls(cityMalls);
    } else {
      // If not a city, check for a mall match
      const mallResults = Object.values(mockMalls)
        .flatMap((malls) => malls)
        .filter((mall) => mall.name === suggestion);
      setFilteredMalls(mallResults);
    }
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
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          {/* Suggestions List */}
          {searchQuery && suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((mall) => (
                <li key={mall} onClick={() => handleSuggestionClick(mall)}>
                  {mall}
                </li>
              ))}
            </ul>
          )}
        </div>
        </div>

                {/********** Favorites Section **************/}
                <div className="favorites">
          <h2>Favorites</h2>
          <div className="favorites-container">
            <MallCard
              imgUrl="https://images.unsplash.com/photo-1727950693413-2068d59ea433?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fG1hbGx8ZW58MHx8MHx8fDA%3D"
              name="Mall at Reds"
            />
            <MallCard
              imgUrl="https://images.unsplash.com/photo-1516274626895-055a99214f08?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              name="Fourways Mall"
            />
            <MallCard
              imgUrl="https://images.unsplash.com/photo-1549479732-ee0adb0f5d32?q=80&w=1626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              name="Mall of Africa"
            />
          </div>
        </div>

        {/***************** Search Results ***************/}
        {filteredMalls.length > 0 && (
          <div className="results">
          <h2>Search Results</h2>
          <div className="mall-cards">
            {filteredMalls.map((mall) => (
              <div
                key={mall.id}
                className="mall-card"
                onClick={() => handleMallClick(mall.id)}
                style={{ cursor: "pointer" }}
              >
                <img src={mall.imgUrl} alt={mall.name} />
                <h3>{mall.name}</h3>
                <p>Available Devices: {mall.devices.join(", ")}</p>
              </div>
            ))}
          </div>
          </div>
        )}
      </div>
  );
}

import PropTypes from 'prop-types';

function MallCard({ imgUrl, name }) {
  return (
    <div className="mall-card">
      <img src={imgUrl} alt={name} />
      <h3>{name}</h3>
  </div>
  );
}

MallCard.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Home;
