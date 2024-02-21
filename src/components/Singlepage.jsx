import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/url";

function Singlepage() {
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(true);

  const { countryName } = useParams();

  const getCountry = async () => {
    try {
      const responce = await fetch(`${BASE_URL}/name/${countryName}`);
      if (!responce.ok) throw new Error("Could not found country");
      const data = await responce.json();
      setCountry(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCountry();
  }, []);

  return (
    <div className="container mx-auto">
      {loading ? (
        <div>
          <h1 className="dark:text-white text-black duration-100 mt-10">
            Loading...
          </h1>
        </div>
      ) : (
        country.map((country, index) => {
          const languages = Object.values(country?.languages);
          const currencies = Object.values(country?.currencies);
          const borders = country.borders
            ? Object.values(country?.borders)
            : ["no borders"];

          return (
            <div className="px-3 sm:px-1" key={index}>
              <Link to="/">
                <button className="flex items-center  my-10 bg-white shadow-md px-4 py-1 gap-2 border rounded dark:bg-slate-500 dark:text-white dark:border-slate-500">
                  <ion-icon name="arrow-back-outline"></ion-icon>
                  <span>Back</span>
                </button>
              </Link>

              <div className="flex-col sm:flex-row flex gap-5 sm:gap-10 sm:items-center dark:text-white">
                <img
                  src={country.flags.png}
                  alt={country.flags.alt}
                  className="sm:w-[50%] w-full h-[300px]"
                />
                <div>
                  <h2 className="font-bold text-xl my-5">
                    {country.name.common}
                  </h2>
                  <div className="mb-5">
                    <p>
                      Native Name :
                      <span className="opacity-70">
                        {country.name?.official}
                      </span>
                    </p>
                    <p>
                      Population :{" "}
                      <span className="opacity-70">
                        {country.population.toLocaleString(undefined)}
                      </span>
                    </p>
                    <p>
                      Region :{" "}
                      <span className="opacity-70">{country.region}</span>
                    </p>
                    <p>
                      Sub Region :{" "}
                      <span className="opacity-70">{country.subregion}</span>
                    </p>
                    <p>
                      Capital :{" "}
                      <span className="opacity-70">{country.capital}</span>
                    </p>
                  </div>

                  <div className="mb-2">
                    <p>
                      Top Level Domain :{" "}
                      <span className="opacity-70">{country?.tld}</span>
                    </p>
                    <p>
                      Currencies :{" "}
                      <span className="opacity-70">
                        {currencies.map((currency, index) => {
                          return <span key={index}>{currency.name}</span>;
                        })}
                      </span>
                    </p>
                    <p className="flex item-center gap-2">
                      Languages :{" "}
                      <span className="opacity-70 flex items-center gap-2">
                        {languages.map((lang, index) => {
                          return <span key={index}>{lang}</span>;
                        })}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-[1px]">
                    <h1>Borders :</h1>
                    <div className="flex items-center gap-[2px] md:gap-1">
                      {borders?.map((border, index) => {
                        return (
                          <span
                            className="border rounded py-[1px] px-[2px] shadow text-[#64748b] dark:text-white dark:border-slate-600 dark:bg-slate-500 bg-white md:px-1"
                            key={index}
                          >
                            {border}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Singlepage;
