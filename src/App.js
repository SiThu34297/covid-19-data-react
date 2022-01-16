import React from "react";
import Cards from "./components/Cards/Cards.jsx";
import Chart from "./components/Chart/Chart.jsx";
import CountryPicker from "./components/CountryPicker/CountryPicker.jsx";
import { fetchData } from "./api";
import style from "./App.module.css";
import CoronaImage from "./images/image.png";

function App() {
  const [data, setData] = React.useState({ data: {} });

  React.useEffect(async () => {
    const data = await fetchData();
    setData({ data: data });
  }, []);

  const handleCountryChange = async (country) => {
    console.log(country);
    const data = await fetchData(country);
    setData({ data: data, country: country });
  };

  return (
    <div className={style.container}>
      <img src={CoronaImage} alt="Covid-19" className={style.image} />
      <Cards data={data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart data={data} country={data.country} />
    </div>
  );
}

export default App;
