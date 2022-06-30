import { useSelector } from 'react-redux';

// Styles
import './Profile.css';
import followerIcon from '../assets/followerIcon.svg';
import followingIcon from '../assets/followingIcon.svg';
import repoIcon from '../assets/repoIcon.svg';

export default function Profile() {
  const curAccount = useSelector((state) => state.accounts.currentAccount);

  return (
    curAccount && (
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
    )
  );
}
