import styles from './City.module.css';
import { useNavigate, useParams } from 'react-router';
import Spinner from './Spinner';
import Message from './Message';
import { useCityContext } from '../context/CityContext';
import Button from './Button';
const formatDate = date =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

function City() {
  const { isLoading, cities } = useCityContext();
  const navigate = useNavigate();

  const { id } = useParams();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message
        message={'Add your first city by clicking on a city on the map'}
      />
    );

  const currentCity = cities.find(city => city.id === +id);

  const { cityName, emoji, date, notes } = currentCity;

  // return <h1>City</h1>;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button type={'back'} onClick={() => navigate(-1)}>
          &larr; back
        </Button>
      </div>
    </div>
  );
}

export default City;
