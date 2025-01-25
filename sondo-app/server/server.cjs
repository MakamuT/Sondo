const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    methods: "GET", // Restrict to GET requests
  })
);

const API_KEY = "api-key";


app.get("/api/places", async (req, res) => {
  const { query, latitude, longitude } = req.query;
  let googleApiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${API_KEY}`;

  if (latitude && longitude) {
    googleApiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=10000&keyword=${query}&key=${API_KEY}`;
  }

  try {
    const response = await axios.get(googleApiUrl);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Google Places data:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
