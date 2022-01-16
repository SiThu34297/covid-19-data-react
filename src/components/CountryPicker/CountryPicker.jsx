import React from "react";
import { FormControl, NativeSelect } from "@mui/material";
import styles from "./CountryPicker.module.css";
import { fetchCountries } from "../../api";

const CountryPicker = ({ handleCountryChange }) => {
  const [countries, setCountries] = React.useState([]);

  React.useEffect(() => {
    let apiCall = true;
    if (apiCall) {
      const fetchAPI = async () => {
        const response = await fetchCountries();
        setCountries(response);
      };
      fetchAPI();
    }
    return () => {
      return (apiCall = false);
    };
  }, [setCountries]);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="Global">Global</option>
        {countries.map((country, i) => {
          return (
            <option value={country} key={i}>
              {country}
            </option>
          );
        })}
      </NativeSelect>
    </FormControl>
  );
};
export default CountryPicker;
