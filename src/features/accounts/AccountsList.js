import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAccountById, selectAllAccounts } from './accountsSlice';

// Styles
import './AccountsList.css';

const ProfileCard = ({ accountId }) => {
  const account = useSelector((state) => selectAccountById(state, accountId));
  const navigate = useNavigate();

  const handleClick = function () {
    navigate(`/accounts/${account.username}`);
  };

  return (
    <div className="card">
      <img src={account.avatar} alt="user-avatar" />
      <p>{account.username}</p>
      <button onClick={handleClick}>View Details</button>
    </div>
  );
};

export default function AccountsList() {
  const accounts = useSelector(selectAllAccounts);

  return (
    <section className="accounts-list">
      {accounts.length > 0 &&
        accounts.map((acc) => <ProfileCard key={acc.id} accountId={acc.id} />)}
    </section>
  );
}
