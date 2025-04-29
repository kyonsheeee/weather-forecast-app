export const fetchWeatherData = async (lat: number, lng: number) => {
  const res = await fetch(
    `http://localhost:3001/api/weather?lat=${lat}&lng=${lng}`
  );
  const data = await res.json();
  return data;
};
