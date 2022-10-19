import Newpost from './Newpost';
import CreatePost from './CreatePost';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from './Post';
import styles from '../styles/Feed.module.css';
import { UserContext } from '../../../context/UserContext';

export default function Feed() {
  const [showModal, setShowModal] = useState(false);
  const [post, setPost] = useState();
  const [textEntered, setTextEntered] = useState(false);
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState();
  const navigate = useNavigate();
  const user = useContext(UserContext);

  document.title = 'Odinbook';

  console.log(user);

  useEffect(() => {
    // getPosts();
  }, []);

  // making GET request to /posts to get all the posts
  // const getPosts = async () => {
  //   const res = await fetch('http://localhost:3000/posts', {
  //     method: 'GET',
  //     mode: 'cors',
  //     credentials: 'include',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   const json = await res.json();
  //   setPosts(json);
  //   setIsLoading(false);
  // };

  const handleInputChange = (e) => {
    e.target.value ? setTextEntered(true) : setTextEntered(false);
    setPost(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleModalChange = () => {
    setShowModal(!showModal);
  };

  const handleCloseClick = () => {
    setShowModal(!showModal);
  };

  const handleRemoveImage = () => {
    setImage();
  };

  // making POST request to /posts to create a new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', post);
    formData.append('image', image);
    const res = await fetch('http://localhost:3000/posts', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: formData,
    });
    const json = await res.json();
    if (res.status === 403) {
      navigate('/');
    } else {
      window.location.reload();
    }
  };

  if (isLoading) {
    return <h1 className={styles.loading}>Loading...</h1>;
  }

  return (
    <div className={styles.feed}>
      <div className={`${showModal ? styles.opacity : ''}`}>
        <Newpost onModalClick={handleModalChange} user={user} />
        {/* creating our posts */}
        {posts.map((post) => (
          <Post
            key={post._id}
            imageUrl={post.imageUrl}
            firstName={post.user.firstName}
            surname={post.user.surname}
            text={post.text}
            dateCreated={post.createdAt}
            likes={post.likes}
            id={post._id}
            avatarUrl={post.user.imageUrl}
            user={user}
            comments={post.comments}
          />
        ))}
        {/* <Post /> */}
      </div>
      <CreatePost
        user={user}
        onSubmit={handleSubmit}
        textEntered={textEntered}
        onInputChange={handleInputChange}
        onImageChange={handleImageChange}
        display={showModal}
        onCloseClick={handleCloseClick}
        image={image}
        onRemoveImage={handleRemoveImage}
      />
    </div>
  );
}
