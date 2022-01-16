import axios from "axios";

const Url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changeAbleUrl = Url;
  if (country && country !== "Global") {
    changeAbleUrl = `${Url}/countries/${country}`;
  }
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeAbleUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    return error;
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${Url}/daily`);

    const modifiedData = await data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return modifiedData;
  } catch (error) {
    return error;
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${Url}/countries`);
    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};
