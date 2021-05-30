import React, { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [items, setItems] = useState([]);
  const [search, setsearch] = useState("");
  const handleClick = () => {
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${search}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "2e3ba36e00msh70efad010843a66p1766d6jsn8f2905a0c72d",
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        // console.log(res.data);
        setItems(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    setsearch("");
  };
  const renderApp = (item, index) => {
    return (
      <div class="card my-5" style={{ width: "18rem" }}>
        <img
          class="card-img-top"
          src={item.album.cover_medium}
          alt="Card image cap"
        />
        <div class="card-body">
          <h5 class="card-title">{item.title}</h5>
          <p class="card-text bold">
            {`Singer: ${item.artist.name}`}
            <br />
            {`Album Title: ${item.album.title}`}
          </p>
          <a href={item.preview} target="blank" class="btn btn-primary">
            Play Preview
          </a>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div
        class="input-group rounded"
        style={{ width: "50%", margin: "10px auto" }}
      >
        <input
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          type="search"
          class="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
        />
        <span
          onClick={handleClick}
          class="input-group-text border-0"
          id="search-addon"
        >
          <i class="fas fa-search"></i>
        </span>
      </div>
      <div
        class="container"
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
        }}
      >
        {items.map(renderApp)}
      </div>
    </div>
  );
}

export default App;
