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
        const data = await fetchWeatherData({ lat: 35, lng: 139 });
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
    return <div>Loading...</div>;
  }

  if (!weather) {
    return <div>Weather information could not be retrieved.</div>;
  }

  return (
    <div>
      <h1>天気情報</h1>
      <pre>{JSON.stringify(weather, null, 2)}</pre>
    </div>
  );
}

export default App;
