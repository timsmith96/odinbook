import Navbar from '../../components/Navbar';
import Newpost from './Newpost';
import CreatePost from './CreatePost';
import { useState, useEffect } from 'react';

export default function Feed() {
  const [post, setPost] = useState();
  const [textEntered, setTextEntered] = useState(false);
  const handleInputChange = (e) => {
    e.target.value ? setTextEntered(true) : setTextEntered(false);
    setPost(e.target.value);
  };
  useEffect(() => {}, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/posts', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: post }),
    });
  };
  return (
    <div>
      <Navbar />
      <Newpost />
      <CreatePost
        onSubmit={handleSubmit}
        textEntered={textEntered}
        onInputChange={handleInputChange}
      />
    </div>
  );
}
