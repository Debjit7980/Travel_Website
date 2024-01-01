import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import './blog.css'
import Footer from './Footer'
import { LoginContext } from './Context'
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useRef } from 'react';

/*{function CreateBlogs() {
  return (
    <div className='blogContainer'>
      <h1>Write Blogs over here</h1>
      <input type="text" name="title" placeholder='title'/>
      <textarea/>
      <button type="submit">Publish</button>
    </div>
  )
}

export default CreateBlogs}*/

const CreateBlogs = () => {
  const { loginData } = useContext(LoginContext);
  console.log("Blogs:", loginData.validUserOne);
  const [blogs, setBlogs] = useState([]);
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupMessage, setShowPopupMessage] = useState("Are You Sure You want to Post?")
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPostedMessage, setShowPostedMessage] = useState(false);

  //console.log(result);
  useEffect(() => {
    // Load blogs from local storage on component mount
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(storedBlogs);

  }, []);


  const handleBlogTitleChange = (event) => {
    setNewBlogTitle(event.target.value);
  };

  const handleBlogContentChange = (event) => {
    setNewBlogContent(event.target.value);
  };



  const getCurrentDateTime = () => {
    const currentDateTime = new Date();
    const options = { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric' };
    return currentDateTime.toLocaleString('en-US', options);
  };

  const handleAddBlog = async () => {
    if (newBlogTitle.trim() !== '' && newBlogContent.trim() !== '') {
      setLoading(true);
      const newBlog = {
        id: loginData.validUserOne._id,
        Del_id: Date.now(),
        title: newBlogTitle,
        content: newBlogContent,
        userName: loginData.validUserOne.name,
        dateTime: getCurrentDateTime(),
      };
      setTimeout(() => {
        setShowPopup(false);
      }, 400);
      await new Promise((resolve) => setTimeout(resolve, 8000));
      setLoading(false)
      setShowPostedMessage(true);
      setShowPopup(false);
      const updatedBlogs = [...blogs, newBlog];
      setBlogs(updatedBlogs);
      setNewBlogTitle('');
      setNewBlogContent('');
      setTimeout(() => {
        setShowPostedMessage(false);
      }, 2000);
      // Save updated blogs to local storage
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    }

  }
  useEffect(() => {
    let interval;

    if (loading) {
      interval = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
      }, 1200);
    }

    return () => {
      clearInterval(interval);
    };
  }, [loading]);

  const handleButtonClick = (event) => {
    event.preventDefault();
    if (!loginData.validUserOne) {
      setShowPopup(true);
      setShowPopupMessage("Please SignIn Yourself to Write Blogs");
    }
    else {
      if (newBlogTitle.trim() !== '' && newBlogContent.trim() !== '') {
        setShowPopup(true);
        setShowPopupMessage("Are You Sure You want to Post?");
      }
      else {
        setShowPopup(true);
        setShowPopupMessage("Please Write Your Blog to Post");
      }
    }
  }
  const handleClosePopup = () => {
    setShowPopup(false);
  }

  const handleRemoveBlog = (blogId) => {
    const updatedBlogs = blogs.filter((blog) => blog.Del_id !== blogId);
    setBlogs(updatedBlogs);

    // Save updated blogs to local storage
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
  };



  //console.log(matchedIds);
  return (
    <>
      <div className="containerblog">

        <div class="blogHead"><h1 id="abc">Write Your Blogs Here</h1></div>


        <div className="writeBlog">

          <div className='fadeBlog'></div>
          <div className='fadeBlogTwo'></div>
          <div className='banner'>
            <img src={require("../components/images/banner.jpg")} alt="banner" />
          </div>
          <div className='blogData'>
            <input
              type="text"
              required
              placeholder="Enter blog title..."
              value={newBlogTitle}
              onChange={handleBlogTitleChange}
              id="blog"
            />
            <textarea
              rows="18" cols="40"
              placeholder="Write your blog content here..."
              value={newBlogContent}
              required
              onChange={handleBlogContentChange}
              style={{ whiteSpace: 'pre-wrap' }}
              id="blogCont"
            />
            {showPostedMessage && (
              <div className="popup-message">
                <p>Posted!</p>
              </div>
            )}
            <button onClick={handleButtonClick} id="add">Add Blog</button>
            {showPopup && (
              <div className="popup">
                <div className="popup-content">
                  <span className="close" onClick={handleClosePopup}>
                    &times;
                  </span>

                  <p id="msg">{showPopupMessage}</p>
                  {
                    loginData.validUserOne ? <button onClick={handleAddBlog}>Confirm</button>
                      : <Link className="text-primary" to="/login" id="signinButton">Click Here</Link>
                  }

                </div>
              </div>
            )}
           
          </div>
          
          {loading && (
              <div className="loading-container">
                <div className="loading-bar" style={{ width: `${progress}%` }} />
              </div>
            )}
        </div>

        <div className='posts'>
          <h2 id="blogPost">The Blog Posts</h2>
          <ul>
            {blogs.map((blog) => (
              <li key={blog.id} id="list">
                <label id="blogtitle"><p id="date"><label id="posted">Blog Posted. </label><small>{blog.dateTime}</small></p><b id="blogtitle-two">{blog.title}</b><i id="name">By {blog.userName}</i></label><br />{blog.content.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
                {loginData.validUserOne && loginData.validUserOne._id === blog.id ? <button onClick={() => handleRemoveBlog(blog.Del_id)} id="remove">Remove</button> : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  )
}


export default CreateBlogs;
