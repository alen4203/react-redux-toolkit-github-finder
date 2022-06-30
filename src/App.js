import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import './App.css';
import SearchAccountsForm from './features/accounts/SearchAccountsForm';
import AccountsList from './features/accounts/AccountsList';
import SingleAccountPage from './features/accounts/SingleAccountPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <section>
          <Navbar />
        </section>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchAccountsForm />
                <AccountsList />
              </>
            }
          />
          <Route
            path="accounts/:accountUserName"
            element={<SingleAccountPage />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
