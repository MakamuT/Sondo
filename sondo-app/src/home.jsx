import './home.css';
import Header from './header';
function Home() {
  return (

    <div className='container'>
        {/******************* Header ********************/}
        <Header />
      <div className="home">
      {/********** Search Section ***************/}
      <div className="search-container">
        <div className="search-box">
          <input type="text" placeholder="Location" />
          <input type="date" placeholder="Check-out" />
          <button>Search</button>
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
