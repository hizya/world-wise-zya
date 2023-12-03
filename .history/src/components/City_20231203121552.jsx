import styles from './City.module.css';
import { useNavigate, useParams } from 'react-router';
import Spinner from './Spinner';
import { useEffect, useState } from 'react';
import Button from './Button';
import { useCityContext } from '../context/CityContext.jsx';
import BackButton from './bACKbUTTON.JSX';

const formatDate = date =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

function City() {
  const { getCity, currentCity, isLoading } = useCityContext();

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(
    function () {
      async function fetchCity() {
        await getCity(id);
      }
      fetchCity();
    },
    [id]
  );
  if (isLoading) return <Spinner />;

  const { cityName, emoji, date, notes } = currentCity;

  console.log('currentCIty', currentCity);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
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
            <BackButton />
          </div>
        </div>
      )}
    </>
  );
}

export default City;
