// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';

import styles from './Form.module.css';

import Button from './Button';
import { useNavigate } from 'react-router';
import BackButton from './bACKbUTTON.JSX';
import Spinner from './Spinner';
import { useCityContext } from '../context/CityContext';

import { useUrlPosition } from '../hooks/useUrlPosition';
import Message from './Message';
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const { addCity } = useCityContext();
  const [emoji, setEmoji] = useState(null);
  const navigate = useNavigate();
  const [mapLat, mapLng] = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const [error, setError] = useState('');

  const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

  useEffect(
    function () {
      if (!mapLat && !mapLng) return;
      async function cityName() {
        try {
          setIsLoadingGeocoding(true);
          setError('');
          const res = await fetch(
            `${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`
          );
          const data = await res.json();

          if (!data.countryCode) {
            throw new Error(
              `That doesn't seem to be a city. Click somewhere else 😉`
            );
          }
          setCityName(data.city || data.locality || '');
          setDate(date => {
            const year = new Date().getFullYear();
            const month = `${new Date().getMonth()}`.padStart(2, 0);
            const day = `${new Date().getDay()}`.padStart(2, 0);
            return `${day}/${month}/${year}`;
          });
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      cityName();
    },
    [mapLat, mapLng]
  );

  if (isLoadingGeocoding) return <Spinner />;

  if (!mapLat && !mapLng)
    return <Message message="Start by clicking somewhere on the map" />;

  if (error) return <Message message={error} />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={e => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input id="date" onChange={e => setDate(e.target.value)} value={date} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={e => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button
          type="primary"
          onClick={e => {
            e.preventDefault();
            addCity({
              cityName,
              country,
              date,
              emoji,
              id: +new Date(),
              position: { lat: mapLat, lng: mapLng },
            });
            navigate('/app/cities');
          }}
        >
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
