import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneAccount, clearCurAccount } from './accountsSlice';
import { fetchUserRepos, selectRepoIds } from '../repos/reposSlice';

// Component
import { Spinner } from '../../components/Spinner';
import Repo from '../repos/Repo';
// Styles
import './SingleAccountPage.css';
import followerIcon from '../../assets/followerIcon.svg';
import followingIcon from '../../assets/followingIcon.svg';
import repoIcon from '../../assets/repoIcon.svg';

export default function SingleAccountPage() {
  const { accountUserName: username } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const curAccount = useSelector((state) => state.accounts.currentAccount);
  const repoIds = useSelector(selectRepoIds);

  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setStatus('loading');
        await Promise.all([
          dispatch(fetchOneAccount(username)).unwrap(),
          dispatch(fetchUserRepos(username)).unwrap(),
        ]);
      } catch (err) {
        setStatus('failed');
        setError(err.message);
      } finally {
        setStatus('idle');
      }
    })();
  }, [dispatch, username]);

  const handleBack = function () {
    dispatch(clearCurAccount());
    navigate('/');
  };

  const renderProfile = function () {
    return !curAccount ? (
      ''
    ) : (
      <div className="profile">
        <div className="personal-details">
          <img src={curAccount.avatar} alt="user-avatar" />

          <div>
            <h2>
              {curAccount.username}{' '}
              <span className="type">{curAccount.type}</span>
            </h2>
            {curAccount.name && <p className="name">( {curAccount.name} )</p>}
            {curAccount.bio && <p className="bio">{curAccount.bio}</p>}
            <a href={curAccount.url} className="github-link">
              View Profile
            </a>
            <div className="other-content">
              {curAccount.company && (
                <div>
                  <h3>Company</h3>
                  <p>{curAccount.company}</p>
                </div>
              )}
              {curAccount.location && (
                <div>
                  <h3>Location</h3>
                  <p>{curAccount.location}</p>
                </div>
              )}
              {curAccount.email && (
                <div>
                  <h3>Email</h3>
                  <p>{curAccount.email}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="statistics">
          <div>
            <div>
              <h3 className="stats-title">Public Repos</h3>
              <p>{curAccount.publicRepos}</p>
            </div>
            <img className="stats-icons" src={repoIcon} alt="repoIcon" />
          </div>
          <div>
            <div>
              <h3 className="stats-title">Followers</h3>
              <p>{curAccount.followers}</p>
            </div>
            <img
              className="stats-icons"
              src={followerIcon}
              alt="followerIcon"
            />
          </div>
          <div>
            <div>
              <h3 className="stats-title">Following</h3>
              <p>{curAccount.following}</p>
            </div>
            <img
              className="stats-icons"
              src={followingIcon}
              alt="followingIcon"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="single-account-page">
      <button onClick={handleBack}>Back</button>
      {error && <p className="error">{error}</p>}
      {status === 'loading' && <Spinner text="loading..." />}
      {renderProfile()}
      <h3>10 Latest Repositories</h3>
      {repoIds.length > 0 &&
        repoIds
          .filter((_, i) => i < 10)
          .map((id) => <Repo key={id} repoId={id} />)}
    </section>
  );
}
