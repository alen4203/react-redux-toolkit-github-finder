import { useSelector } from 'react-redux';
import { selectRepoById } from './reposSlice';

// Styles
import './Repo.css';
import linkIcon from '../../assets/linkIcon.svg';
import watcherIcon from '../../assets/watcherIcon.svg';
import starIcon from '../../assets/starIcon.svg';
import issueIcon from '../../assets/issueIcon.svg';
import forkIcon from '../../assets/forkIcon.svg';

export default function Repo({ repoId }) {
  const repo = useSelector((state) => selectRepoById(state, repoId));

  return (
    <div className="repo">
      <h3>
        <a href={repo.url}>
          <img src={linkIcon} alt="repo-link-icon" />
        </a>
        {repo.name}
      </h3>
      <p>{repo.description}</p>
      <div className="repo-stats">
        <div className="watchers">
          <img className="stat-icon" src={watcherIcon} alt="watcher-icon" />
          <p>{repo.watchers}</p>
        </div>
        <div className="stargazers">
          <img className="stat-icon" src={starIcon} alt="star-icon" />
          <p>{repo.stargazers}</p>
        </div>
        <div className="issues">
          <img className="stat-icon" src={issueIcon} alt="issue-icon" />
          <p>{repo.issues}</p>
        </div>
        <div className="forks">
          <img className="stat-icon" src={forkIcon} alt="fork-icon" />
          <p>{repo.forks}</p>
        </div>
      </div>
    </div>
  );
}
