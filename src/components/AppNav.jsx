import { NavLink } from 'react-router-dom';
import styles from './AppNav.module.css';

function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="/app/cities">cites</NavLink>
        </li>
        <li>
          <NavLink to="/app/countries">countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
