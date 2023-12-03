import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';
import { useCityContext } from '../context/CityContext';

const formatDate = date =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

function CityItem({ city }) {
  const { emoji, cityName, date, id, position } = city;

  const { currentCity, deleteCity } = useCityContext();

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles['cityItem--active'] : ''
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button
          className={styles.deleteBtn}
          onClick={e => {
            e.preventDefault();
            deleteCity(id);
          }}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
