import './home.css';
import Header from './header';
import { useState } from "react";
import MobilityDevices from "./MobilityDevices";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMallId, setSelectedMallId] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const mockMalls = {
    "Downtown Mall": "mall1",
    "Riverside Center": "mall2",
    "Mall of the North": "mall3",
    "Gateway Mall": "mall4",
    "Sandton City": "mall5",
    "Cresta Shopping Centre": "mall6",
    "Eastgate Mall": "mall7",
    "Greenstone Mall": "mall8",
    "Rosebank Mall": "mall9",
    "Woodmead Value Mart": "mall10",
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert("Please enter a mall name.");
      return;
    }

    const mallId = mockMalls[searchQuery];
    if (mallId) {
      setSelectedMallId(mallId);
      setSuggestions([]);
    } else {
      alert("Mall not found. Try another search.");
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const matches = Object.keys(mockMalls).filter((mall) =>
      mall.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(matches);
  };

  const handleSuggestionClick = (mall) => {
    setSearchQuery(mall); // Update the search query
    const mallId = mockMalls[mall]; // Get the mall ID directly
    setSelectedMallId(mallId); // Update the selected mall ID
    setSuggestions([]); // Clear suggestions after selection
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
              placeholder="Enter mall name..."
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

        {/********** Filter Tabs **************/}
        <div className="tabs">
          <button>All</button>
          <button>Wheelchair</button>
          <button>Crutches</button>
        </div>

        {/***************** Favorites ***************/}
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
          <div className="results">
            {selectedMallId && <MobilityDevices mallId={selectedMallId} />}
          </div>
        </div>
        
      </div>
    </div>
  );
}

function MallCard({ imgUrl, name }) {
  return (
    <div className="mall-card">
      <img src={imgUrl} alt={name} />
      <p>{name}</p>
    </div>
  );
}

export default Home;
