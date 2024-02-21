import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/url";
import { Link } from "react-router-dom";

function Countries() {
  const [countriesArr, setCountriesArr] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectValue, setSelectValue] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/all`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const countries = await response.json();
      setCountriesArr(countries);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let filteredArr = countriesArr;

  switch (selectValue) {
    case "all":
      filteredArr;
      break;
    case "africa":
      filteredArr = countriesArr.filter((country) =>
        country.region.toLowerCase().includes("africa")
      );
      break;
    case "america":
      filteredArr = countriesArr.filter((country) =>
        country.region.toLowerCase().includes("america")
      );
      break;
    case "asia":
      filteredArr = countriesArr.filter((country) =>
        country.region.toLowerCase().includes("asia")
      );
      break;
    case "europe":
      filteredArr = countriesArr.filter((country) =>
        country.region.toLowerCase().includes("europe")
      );
      break;
    case "oceania":
      filteredArr = countriesArr.filter((country) =>
        country.region.toLowerCase().includes("oceania")
      );
      break;
  }

  const handleSearch = function (searchQuery, filteredArr) {
    return filteredArr.filter((country) =>
      country.name.common.toLowerCase().includes(searchQuery)
    );
  };

  filteredArr = handleSearch(searchQuery, filteredArr);

  return (
    <section>
      <div className="flex items-center justify-start sm:justify-between container mx-auto pt-10 pb-4 px-4 sm:px-1 flex-col sm:flex-row">
        <form className="relative bg-white rounded py-2 dark:bg-[#2C3743] shadow dark:text-white  w-full sm:w-[50%] mb-5 sm:mb-0">
          <label
            htmlFor="search"
            className="absolute text-xl left-2 top-[10px]"
          >
            <ion-icon name="search"></ion-icon>
          </label>
          <input
            type="search"
            id="search"
            className="pl-10 outline-none pr-4 bg-transparent text-lg w-full"
            placeholder="Search for a country"
            onChange={(e) =>
              setSearchQuery(e.target.value.toLowerCase().trim())
            }
          />
        </form>

        <div className="bg-white shadow p-2 rounded  dark:bg-[#2C3743] dark:text-white w-[47%] sm:w-[25%] self-start">
          <select
            className="bg-transparent w-full outline-none font-normal"
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <option value="all">Filter By Region</option>
            <option value="africa">Africa</option>
            <option value="america">America</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
          </select>
        </div>
      </div>
      <div className="container mx-auto py-6 grid grid-cols-1 px-5 sm:px-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {loading ? (
          <div>
            <h1 className="dark:text-white text-2xl text-black">Loading...</h1>
          </div>
        ) : filteredArr.length ? (
          filteredArr.map((country, index) => (
            <Link to={`/country/${country.name.common}`} key={index}>
              <div className="bg-white cursor-pointer rounded shadow-md dark:text-white dark:bg-[#2C3743]  hover:scale-105 duration-100">
                <img
                  src={country.flags.png}
                  alt={country.flag.alt}
                  className="h-[200px] w-full"
                />
                <div className="p-5">
                  <h1 className="font-bold text-xl mb-2">
                    {country.name.common}
                  </h1>
                  <p className="mb-1">
                    Population :{" "}
                    <span className="text-[#6F6F6F] dark:opacity-80 dark:text-white">
                      {country.population.toLocaleString(undefined)}
                    </span>
                  </p>
                  <p className="mb-1">
                    Region :{" "}
                    <span className="text-[#6F6F6F] dark:opacity-80 dark:text-white">
                      {country.region}
                    </span>
                  </p>
                  <p>
                    Capital :{" "}
                    <span className="text-[#6F6F6F] dark:opacity-80 dark:text-white">
                      {country.capital}
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div>
            <h1 className="text-red-500 text-2xl">Country not found</h1>
          </div>
        )}
      </div>
    </section>
  );
}

export default Countries;
