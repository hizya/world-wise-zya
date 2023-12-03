import { createContext, useState, useEffect, useContext } from 'react';

const CityContext = new createContext();

const BASE_URL = 'http://localhost:8000';

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  async function addCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCity),
      });
      const data = await res.json();
      setCurrentCity(data);
      setCities([...cities, data]);
    } catch (err) {
      alert('something went long');
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      setCities(cities => cities.filter(city => city.id !== id));
    } catch (err) {
      alert('something went long');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        addCity,
        deleteCity,
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
