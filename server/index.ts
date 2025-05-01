import express, { Request, Response } from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());

app.get("/weather", async (req: Request, res: Response) => {
  const lat = req.query.lat;
  const lon = req.query.lon;

  if (!lat || !lon) {
    return res.status(400).json({ error: "緯度・経度が必要です" });
  }

  console.log("Yahoo App ID:", process.env.YAHOO_APP_ID);

  try {
    const url = `https://map.yahooapis.jp/weather/V1/place?coordinates=${lon},${lat}&output=json`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "my-weather-app",
        "X-Yahoo-App-Id": process.env.YAHOO_APP_ID!,
        Accept: "application/json",
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "天気情報の取得に失敗しました" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ サーバー起動中: http://localhost:${PORT}`);
});
