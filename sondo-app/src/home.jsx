import './home.css';
import Header from './header';
import { useState } from "react";
import MobilityDevices from "./MobilityDevices";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMallId, setSelectedMallId] = useState("");

  const handleSearch = () => {
    // Mock data for now, replace with DB later
    const mockMalls = {
      "Downtown Mall": "mall1",
      "Riverside Center": "mall2",
    };

    const mallId = mockMalls[searchQuery];
    if (mallId) {
      setSelectedMallId(mallId);
    } else {
      alert("Mall not found. Try another search.");
    }
  };

  return (
    <div className='container'>
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
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        </div>
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
          <MallCard imgUrl="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/12/a0/b1/mall-of-africa.jpg?w=900&h=500&s=1" name="Mall at Reds" />
          <MallCard imgUrl="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/12/a0/b1/mall-of-africa.jpg?w=900&h=500&s=1" name="Fourways Mall" />
          <MallCard imgUrl="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/12/a0/b1/mall-of-africa.jpg?w=900&h=500&s=1" name="Mall of Africa" />
        </div>
        <div className='results'>
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
