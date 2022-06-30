import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneAccount } from './accountsSlice';
import { fetchUserRepos, selectRepoIds } from '../repos/reposSlice';

// Component
import { Spinner } from '../../components/Spinner';
import Profile from '../../components/Profile';
import Repo from '../../components/Repo';
// Styles
import './SingleAccountPage.css';

export default function SingleAccountPage() {
  const { accountUserName: username } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        setStatus('completed');
      } catch (err) {
        setStatus('failed');
        setError(err.message);
      }
    })();
  }, [dispatch, username]);

  return (
    <section className="single-account-page">
      <button onClick={() => navigate('/')}>Back</button>
      {error && <p className="error">{error}</p>}
      {status === 'loading' && <Spinner text="loading..." />}
      {status === 'completed' && <Profile />}
      {status === 'completed' && repoIds.length > 0 && (
        <>
          <h3>10 Latest Repositories</h3>
          {repoIds
            .filter((_, i) => i < 10)
            .map((id) => (
              <Repo key={id} repoId={id} />
            ))}
        </>
      )}
    </section>
  );
}
