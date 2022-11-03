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
  const [selected, setSelected] = useState();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [signInError, setSignInError] = useState();
  const [loggingIn, setLoggingIn] = useState(false);
  const [loggingDemoIn, setLoggingDemoIn] = useState(false);
  const navigate = useNavigate();

  // runs only on inital render, and gets the current user (from session storage in the browser) and sets this as state. Once we have done this the inital time, any further changes to user (like changing profile pic) are done through setState of the user, using the json response from the server
  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    } else {
      console.log(
        'no user signed in - reloading and navigating to log in screen'
      );
      navigate('/');
    }
  }, []);

  // calling this when we add a profile image from the profile controller component
  const onSetUser = (user) => {
    sessionStorage.setItem('user', JSON.stringify(user));
    setUser(user);
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
    // delete existing storage
    sessionStorage.clear();
    localStorage.clear();
    setLoggingIn(true);
    const res = await fetch('https://cryptic-wave-65159.herokuapp.com/login', {
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
      setLoggingIn(false);
    } else {
      sessionStorage.setItem('user', JSON.stringify(json.user));
      localStorage.setItem('token', json.token);
      setUser(json.user);
      navigate('/feed');
    }
  };

  const handleClick = (e) => {
    setSelected(e.currentTarget.dataset.name);
  };

  const onDemoClick = (e) => {
    setLoggingDemoIn(true);
    setUsername('testuser');
    setPassword('password');
    handleSubmit(e);
  };

  if (isLoading) {
    return <h1>loading</h1>;
  }

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
              setSignInError={setSignInError}
              loggingIn={loggingIn}
              loggingDemoIn={loggingDemoIn}
              onDemoClick={onDemoClick}
            />
          }
        />
        <Route
          element={
            <>
              <Navbar
                selected={selected}
                setSelected={setSelected}
                onClick={handleClick}
              />
              <Outlet />
            </>
          }
        >
          <Route path="/feed" element={<Feed />} />
          <Route
            path="/friends"
            element={<Controller onSetUser={onSetUser} />}
          />
          <Route
            path="/profile"
            element={<ProfileController onUserChange={onSetUser} />}
          />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
