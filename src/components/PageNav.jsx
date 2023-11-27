import styles from './PageNav.module.css';
import { Link } from 'react-router-dom';
import Logo from './Logo';

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <Link to="/pricing">pricing</Link>
        </li>
        <li>
          <Link to="/product">product</Link>
        </li>
        <li>
          <Link to="/login" className="cta">
            login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
