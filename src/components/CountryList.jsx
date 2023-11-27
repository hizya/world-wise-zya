import styles from './CountryList.module.css';
import CountryItem from './CountryItem';
import Spinner from './Spinner.jsx';
import Message from './Message.jsx';
import { useCityContext } from '../context/CityContext.jsx';

function CountryList() {
  const { cities, isLoading } = useCityContext();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message
        message={'Add your first city by clicking on a city on the map'}
      />
    );

  const countries = cities.reduce((acc, cur) => {
    if (!acc.map(value => value.country).includes(cur.country)) {
      return [...acc, { country: cur.country, emoji: cur.emoji }];
    } else {
      return acc;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map(country => {
        return <CountryItem country={country} key={country.country} />;
      })}
    </ul>
  );
}

export default CountryList;
