import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import Home from './pages/home/components/Home';
import Feed from './pages/feed/components/Feed';
import './styles.css';
import Controller from './pages/friends/components/Controller';
import Navbar from './components/Navbar';
import ProfileController from './pages/profile/components/ProfileController';

function App() {
  const [selected, setSelected] = useState('home');
  const [user, setUser] = useState('');
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [signInError, setSignInError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  // get user
  const getUser = async () => {
    const res = await fetch('http://localhost:3000/userplease', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const json = await res.json();
    if (res.status === 401) {
      setSignInError(json);
      // if the log in is successful, the server gives us the user object which we are then storing in state here, (top level component) and then we use context to make it available to the components which need it
    } else {
      console.log('i have the user, will set it now');
      setUser(json);
    }
  };

  // // username input change
  const handleUserInputChange = (e) => {
    setUsername(e.target.value);
  };

  // // password input change
  const handlePasswordInputChange = (e) => {
    setPassword(e.target.value);
  };

  // // log in form being submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
      credentials: 'include',
    });
    const json = await res.json();
    if (res.status === 401) {
      setSignInError(json);
      // if the log in is successful, the server gives us the user object which we are then storing in state here, (top level component) and then we use context to make it available to the components which need it
    } else {
      console.log('log in successful, setting user');
      setUser(json);
      navigate('/feed');
    }
  };

  const handleClick = (e) => {
    setSelected(e.currentTarget.dataset.name);
  };

  return (
    <UserContext.Provider value={user}>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              onSubmit={handleSubmit}
              onPasswordInputChange={handlePasswordInputChange}
              onUserInputChange={handleUserInputChange}
              signInError={signInError}
            />
          }
        />
        <Route
          element={
            <>
              <Navbar selected={selected} onClick={handleClick} />
              <Outlet />
            </>
          }
        >
          <Route path="/feed" element={<Feed />} />
          <Route path="/friends" element={<Controller />} />
          <Route
            path="/profile"
            element={<ProfileController onUserChange={setUser} />}
          />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
