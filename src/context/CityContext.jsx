import { createContext, useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

const CityContext = new createContext();

const BASE_URL = 'http://localhost:8000';

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCity, setCurrentCity] = useState({});
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (e) {
        alert('hi! you forget to run the server in your localhost');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      alert('something went long');
    } finally {
      setIsLoading(false);
    }
  }

  function addCity(newCity) {
    console.log(cities);
    setCities([...cities, newCity]);
    setCurrentCity(newCity);
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        addCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCityContext() {
  const context = useContext(CityContext);
  if (context === undefined)
    throw new Error('CityContext was used outside of the CityPrivider');
  return context;
}

export { CityProvider, useCityContext };
