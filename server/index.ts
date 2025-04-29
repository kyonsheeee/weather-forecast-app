import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const PORT = 3001;

app.get("/api/weather", async (req, res) => {
  const { lat, lng } = req.query;
  try {
    const response = await axios.get(
      "https://map.yahooapis.jp/weather/V1/place",
      {
        params: {
          coordinates: `${lng}, ${lat}`,
          output: "json",
        },
        headers: {
          "User-Agent": "weather-forecast-app",
          "X-Yahoo-App-Id": process.env.YAHOO_APP_ID,
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch from Yahoo API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
