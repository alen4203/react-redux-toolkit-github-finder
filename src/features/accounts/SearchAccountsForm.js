import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGithubAccounts } from './accountsSlice';

// Styles
import './SearchAccountsForm.css';

export default function SearchAccountsForm() {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');

  const handleSubmit = function (e) {
    e.preventDefault();
    dispatch(fetchGithubAccounts(userName));
  };

  return (
    <section className="search-accounts">
      <form onSubmit={handleSubmit}>
        <label>
          <span>UserName: </span>
          <input
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            placeholder="username"
            required
          />
        </label>
        <button>Search</button>
      </form>
    </section>
  );
}
