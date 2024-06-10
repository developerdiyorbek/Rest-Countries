import { useState } from "react";
import { BASE_URL } from "../constants/url";
import CountriesItem from "../components/CountriesItem";
import { useFetch } from "../hooks/useFetch";

function Countries() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectValue, setSelectValue] = useState("all");

  const { data, loading } = useFetch(`${BASE_URL}/all`);

  let filteredArr = data;

  switch (selectValue) {
    case "all":
      filteredArr;
      break;
    case "africa":
      filteredArr = data?.filter((country) =>
        country.region.toLowerCase().includes("africa")
      );
      break;
    case "america":
      filteredArr = data?.filter((country) =>
        country.region.toLowerCase().includes("america")
      );
      break;
    case "asia":
      filteredArr = data?.filter((country) =>
        country.region.toLowerCase().includes("asia")
      );
      break;
    case "europe":
      filteredArr = data?.filter((country) =>
        country.region.toLowerCase().includes("europe")
      );
      break;
    case "oceania":
      filteredArr = data?.filter((country) =>
        country.region.toLowerCase().includes("oceania")
      );
      break;
  }

  const handleSearch = function (searchQuery, filteredArr) {
    return filteredArr?.filter((country) =>
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
            className="bg-transparent w-full cursor-pointer outline-none font-normal"
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
        ) : filteredArr?.length ? (
          filteredArr?.map((country, index) => (
            <CountriesItem country={country} key={index} />
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
