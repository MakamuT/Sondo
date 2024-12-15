import './App.css';

function App() {
  return (
    <div className="App">
      {/******************* Header ********************/}
      <header className="header">
        <div className="logo">
          <div className="circle"></div>
          <span>Sondo</span>
        </div>
        <nav>
          <a href="#">Booking</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">FAQ</a>
        </nav>
      </header>

      {/********** Search Section ***************/}
      <div className="search-container">
        <div className="search-box">
          <input type="text" placeholder="Location" />
          <input type="date" placeholder="Check-out" />
          <button>Search</button>
        </div>
      </div>

      {/********** Tabs **************/}
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

export default App;
