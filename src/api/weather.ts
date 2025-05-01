export const fetchWeatherData = async (coordinates: {
  lat: number;
  lon: number;
}) => {
  const url = `http://localhost:3001/weather?lat=${coordinates.lat}&lon=${coordinates.lon}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("天気データの取得に失敗しました。");
  }

  const data = await response.json();
  return data;
};
