import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  // console.log(lat, lng);

  function handleForm() {
    navigate(`form`);
  }

  return (
    <div className={styles.mapContainer} onClick={handleForm}>
      lat:{lat}
      lng:{lng}
    </div>
  );
}

export default Map;
