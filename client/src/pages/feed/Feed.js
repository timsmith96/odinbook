import Navbar from '../../components/Navbar';
import Newpost from './Newpost';
import CreatePost from './CreatePost';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Feed() {
  const [post, setPost] = useState();
  const [textEntered, setTextEntered] = useState(false);
  const [image, setImage] = useState();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    e.target.value ? setTextEntered(true) : setTextEntered(false);
    setPost(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    console.log(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', post);
    formData.append('image', image);
    const res = await fetch('http://localhost:3000/posts', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        // 'Content-Type': 'application/json',
      },
      body: formData,
    });
    // const json = await res.json();
    if (res.status === 403) {
      navigate('/');
    }
  };
  return (
    <div>
      <Navbar />
      <Newpost />
      <CreatePost
        onSubmit={handleSubmit}
        textEntered={textEntered}
        onInputChange={handleInputChange}
        onImageChange={handleImageChange}
      />
    </div>
  );
}
