import { useEffect, useState } from "react";
import { fetchWeatherData } from "./api/weather";
import "./App.css";

type WeatherData = {
  // TODO: fix type
  Feature: any[];
};

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const data = await fetchWeatherData({ lat: 35.6812, lon: 139.7671 });
        setWeather(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getWeather();
  }, []);

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (!weather) {
    return <div>天気情報が取得できませんでした。</div>;
  }

  return (
    <div>
      <h1>天気情報（東京駅）</h1>
      <pre>{JSON.stringify(weather, null, 2)}</pre>
    </div>
  );
}

export default App;
