// Styles
import './Navbar.css';
import githubIcon from '../assets/githubIcon.svg';

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>
        <img src={githubIcon} alt="github-icon" /> Github Finder
      </h2>
    </nav>
  );
}
