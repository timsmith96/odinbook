import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Feed from './pages/feed/Feed';
import './styles.css';
import Controller from './pages/friends/Controller';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/friends" element={<Controller />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
