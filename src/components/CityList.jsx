import styles from './CityList.module.css';
import Spinner from './Spinner.jsx';
import CityItem from './CityItem.jsx';
import Message from './Message.jsx';
import { useCityContext } from '../context/CityContext.jsx';

function CityList() {
  const { isLoading, cities } = useCityContext();

  console.log(cities);
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message
        message={'Add your first city by clicking on a city on the map'}
      />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map(city => {
        return <CityItem city={city} key={city.id} />;
      })}
    </ul>
  );
}

export default CityList;
