import { useParams } from "react-router-dom";
import { BASE_URL } from "../constants/url";
import { useFetch } from "../hooks/useFetch";
import SingleCountryItem from "../components/SingleCountryItem";

function Singlepage() {
  const { countryName } = useParams();

  const { data, loading } = useFetch(`${BASE_URL}/name/${countryName}`);
  console.log(data);

  return (
    <div className="container mx-auto">
      {loading ? (
        <div>
          <h1 className="dark:text-white text-black duration-100 mt-10">
            Loading...
          </h1>
        </div>
      ) : (
        data?.map((country, index) => {
          const languages = Object.values(country?.languages);
          const currencies = Object.values(country?.currencies);
          const borders = country.borders
            ? Object.values(country?.borders)
            : ["no borders"];

          return (
            <SingleCountryItem
              key={index}
              country={country}
              languages={languages}
              borders={borders}
              currencies={currencies}
            />
          );
        })
      )}
    </div>
  );
}

export default Singlepage;
