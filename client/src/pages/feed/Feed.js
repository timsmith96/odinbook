import Navbar from '../../components/Navbar';
import Newpost from './Newpost';
import CreatePost from './CreatePost';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from './Post';
import styles from './Feed.module.css';

export default function Feed() {
  const [showModal, setShowModal] = useState(false);
  const [post, setPost] = useState();
  const [textEntered, setTextEntered] = useState(false);
  const [image, setImage] = useState();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  document.title = 'Odinbook';

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const res = await fetch('http://localhost:3000/userplease', {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();
    const user = json.user;
    setUser(user);
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    e.target.value ? setTextEntered(true) : setTextEntered(false);
    setPost(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    console.log(image);
  };

  const handleModalChange = () => {
    setShowModal(!showModal);
  };

  const handleCloseClick = () => {
    setShowModal(!showModal);
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

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <h1>You have been logged out - please log in to continue</h1>;
  }

  return (
    <div className={styles.feed}>
      <div className={`${showModal ? styles.opacity : ''}`}>
        <Navbar />
        <Newpost onModalClick={handleModalChange} user={user} />
        <Post />
      </div>
      <CreatePost
        onSubmit={handleSubmit}
        textEntered={textEntered}
        onInputChange={handleInputChange}
        onImageChange={handleImageChange}
        display={showModal}
        onCloseClick={handleCloseClick}
      />
    </div>
  );
}
