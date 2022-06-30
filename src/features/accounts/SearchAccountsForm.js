import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGithubAccounts } from './accountsSlice';

// Styles
import './SearchAccountsForm.css';
import searchIcon from '../../assets/searchIcon.svg';

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
          <div className="search-icon-container">
            <img src={searchIcon} alt="search-icon" />
          </div>
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
