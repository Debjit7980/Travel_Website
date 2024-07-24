import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import './blog.css'
import Footer from './Footer'
import { LoginContext } from './Context'
import { Link } from 'react-router-dom';


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
    // Fetch all blogs from the server on component mount
    fetch('https://naturesdeck-trekcamp-backend-app.onrender.com/allBlogs')
      .then(response => response.json())
      .then(data => {
        setBlogs(data);
        console.log("Blog data:", data);
      })
      .catch(error => console.error('Error fetching blogs:', error));
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
      try {
        // Send the new blog content to the server
        const response = await fetch(`https://naturesdeck-trekcamp-backend-app.onrender.com/addBlog`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: loginData.validUserOne._id,
            title: newBlogTitle,
            content: newBlogContent,
            username: loginData.validUserOne.username,
            dateTime: getCurrentDateTime(),
          }),
        });

        if (response.ok) {
          console.log("Blog in Mongodb:", response);
          const updatedBlogsResponse = await fetch('https://naturesdeck-trekcamp-backend-app.onrender.com/allBlogs');
          const updatedBlogsData = await updatedBlogsResponse.json();
          setBlogs(updatedBlogsData);
        } else {
          // Handle unsuccessful blog addition
          console.error('Failed to add blog:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding blog:', error);
      }
      setTimeout(() => {
        setShowPopup(false);
      }, 400);
      await new Promise((resolve) => setTimeout(resolve, 8000));
      setLoading(false)
      setShowPostedMessage(true);
      setShowPopup(false);
      setNewBlogTitle('');
      setNewBlogContent('');
      setTimeout(() => {
        setShowPostedMessage(false);
      }, 2000);
      // Save updated blogs to local storage
      //localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
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

  const handleRemoveBlog = async (blogId) => {
    try {
      // Send a DELETE request to remove the blog
      const response = await fetch(`https://naturesdeck-trekcamp-backend-app.onrender.com/removeBlog/${blogId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update the state with the latest blogs after deletion
        const updatedBlogsResponse = await fetch('https://naturesdeck-trekcamp-backend-app.onrender.com/allBlogs');
        const updatedBlogsData = await updatedBlogsResponse.json();
        setBlogs(updatedBlogsData);
      } else {
        // Handle unsuccessful blog deletion
        console.error('Failed to remove blog:', response.statusText);
      }
    } catch (error) {
      console.error('Error removing blog:', error);
    }
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
            <div className='text'>
              <textarea
                rows="18" cols="40"
                placeholder="Write your blog content here..."
                value={newBlogContent}
                required
                onChange={handleBlogContentChange}
                style={{ whiteSpace: 'pre-wrap' }}
                id="blogCont"
              />
              {loading && (
                <div className="loading-container">
                  <div className="loading-bar" style={{ width: `${progress}%` }} />
                </div>
              )}
            </div>
            {showPostedMessage && (
              <div className="popup-message">
                <p>Posted!</p>
              </div>
            )}
            <button onClick={handleButtonClick} id="add">Add Blog</button>
            {showPopup && (
              <div className="popup">
                <div className="popup-content">

                  <p id="msg">{showPopupMessage}</p>
                  {
                    loginData.validUserOne ? <button onClick={handleAddBlog}>Confirm</button>
                      : <Link className="text-primary" to="/login" id="signinButton">Click Here</Link>
                  }

                </div>
                <span className="close" onClick={handleClosePopup}>
                  &times;
                </span>
              </div>
            )}

          </div>
        </div>

        <div className='posts'>
          <h2 id="blogPost">The Blog Posts</h2>
          <ul>
            {blogs.map((blog) => (
              <li key={blog._id} id="list">
                <label id="blogtitle"><p id="date"><label id="posted">Blog Posted. </label><small>{blog.dateTime}</small></p><b id="blogtitle-two">{blog.title}</b><i id="name">By {blog.username}</i></label><br />{blog.content.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
                {loginData.validUserOne && loginData.validUserOne._id === blog.id ? <button onClick={() => handleRemoveBlog(blog._id)} id="remove">Remove</button> : null}
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
