import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const CountriesItem = ({ country }) => {
  return (
    <Link to={`/country/${country?.name.common}`}>
      <div className="bg-white cursor-pointer rounded shadow-md dark:text-white dark:bg-[#2C3743]  hover:scale-105 duration-100">
        <LazyLoadImage
          src={country?.flags.png}
          alt={country?.flag.alt}
          className="h-[200px] w-full"
          height={200}
        />
        <div className="p-5">
          <h3
            className="font-bold text-xl mb-2 h-7  truncate"
            title={country?.name.common}
          >
            {country?.name.common}
          </h3>
          <p className="mb-1">
            Population :{" "}
            <span className="text-[#6F6F6F] dark:opacity-80 dark:text-white">
              {country?.population.toLocaleString(undefined)}
            </span>
          </p>
          <p className="mb-1">
            Region :{" "}
            <span className="text-[#6F6F6F] dark:opacity-80 dark:text-white">
              {country?.region}
            </span>
          </p>
          <p>
            Capital :{" "}
            <span className="text-[#6F6F6F] dark:opacity-80 dark:text-white">
              {country?.capital}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CountriesItem;
