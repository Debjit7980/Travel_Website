import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { LoginContext } from './Context'
import './profile.css';
import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Profile() {
    const [blogs, setBlogs] = useState([]);
    const [newBlogTitle, setNewBlogTitle] = useState('');
    const [newBlogContent, setNewBlogContent] = useState('')
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupMessage, setShowPopupMessage] = useState("Are You Sure You want to Post?")
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showPostedMessage, setShowPostedMessage] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();
    const { loginData, setLoginData } = useContext(LoginContext);
    console.log("Hello:", loginData.validUserOne);
    useEffect(() => {
        // validate user and Fetch all blogs from the server on component mount
        const validateUser = async () => {
            try {
                let token = localStorage.getItem("userDataToken");
                if (!token) {
                    navigate("/");
                }
                else {
                    const res = await fetch("https://naturesdeck-backend-app.onrender.com/validateuser", {
                        method: "GET",
                        //credentials:"include",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": token
                        }
                    })
                    const data = await res.json();
                    console.log("Valid User:", data);
                    if (data.status === 401 || !data) {
                        console.log("Error Page redirect");
                        navigate("/")
                    }
                    else if (data) {
                        console.log("User Verified");
                        setLoginData(data);
                        navigate("/profile");
                    }
                }

            }
            catch (e) {
                console.log("Error is: ", e);
            }

        }
        validateUser();

        fetch('https://naturesdeck-backend-app.onrender.com/allBlogs')
            .then(response => response.json())
            .then(data => {
                setBlogs(data);
                console.log("Blog data:", data);
                window.scrollTo(0, 0);
            })
            .catch(error => console.error('Error fetching blogs:', error));
    }, [navigate, setLoginData]);

    const getCurrentDateTime = () => {
        const currentDateTime = new Date();
        const options = { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric' };
        return currentDateTime.toLocaleString('en-US', options);
    };

    //Adding Blog
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

    //Handle Remove Blog
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
    const handleBlogTitleChange = (event) => {
        setNewBlogTitle(event.target.value);
    };

    const handleBlogContentChange = (event) => {
        setNewBlogContent(event.target.value);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log("File:", file);
        setProfilePicture(file);
    };

    const handleUploadProfilePicture = async () => {
        try {
            if (profilePicture === null) {
                alert("Select an image first");
                return;
            }
            setUploading(true);
            const imageRef = ref(storage, `images/${profilePicture.name}`);
            const snapshot = await uploadBytes(imageRef, profilePicture)
            const imageUrl = await getDownloadURL(snapshot.ref);
            console.log("The Image Url:", imageUrl);
            const userId = loginData.validUserOne._id;
            const response = await fetch(`https://naturesdeck-trekcamp-backend-app.onrender.com/uploadProfilePicture`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageUrl, userId })
            });
            if (response.ok) {
                console.log('Profile picture uploaded successfully');
            } else {
                console.error('Failed to upload profile picture:', response.statusText);
            }
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setUploading(false); // Set loading to false when upload completes (success or failure)
        }
    };


    const username = loginData.validUserOne ? loginData.validUserOne.username : '';
    const email = loginData.validUserOne ? loginData.validUserOne.email : '';
    const pp = loginData.validUserOne ? loginData.validUserOne.profilePicture : '';
    const _id = loginData.validUserOne ? loginData.validUserOne._id : ' ';
    console.log("The image path is:", pp);

    return (
        <div>
            <Navbar />
            <div className="profile-container">
                <div className='profile'>
                    <img src={require("../components/images/banner_profile.jpg")} alt="banner" />
                </div>
                <div className='profile-name'>
                    <p>Hey, {username}</p><span>How are you doing?</span>
                </div>
                <div className='profile-body'>
                    <div className='profile-content'>
                        <label className="custom-file-upload">
                            {pp ? (
                                <>
                                    <input type="file" accept="image/*" onChange={handleFileChange} />
                                    {profilePicture ? (
                                        <img src={URL.createObjectURL(profilePicture)} alt="preview" />
                                    ) : (
                                        <div className='profile-image'>
                                            <img src={pp} alt="profileImage" />
                                        </div>
                                    )}
                                </>

                            ) : (
                                <>
                                    <input type="file" accept="image/*" onChange={handleFileChange} />
                                    {profilePicture ? (
                                        <img src={URL.createObjectURL(profilePicture)} alt="preview" />
                                    ) : (
                                        <span id="tap">Tap to select a photo</span>
                                    )}
                                </>
                            )}
                            <button onClick={handleUploadProfilePicture}> <i className={`fa-solid ${uploading ? 'fa-spinner fa-spin spinner-blue' : 'fa-add'}`}></i></button>
                        </label>
                        <p><span><i class="fa-solid fa-user"></i></span> {username}</p>
                        <p><span><i class="fa-solid fa-envelope"></i></span> {email}</p>
                    </div>
                    <div className='profile-posts'>
                        <h2 id="blogPost">The Blog Posts</h2>
                        
                        <div className="blog-form">
                            <input
                                type="text"
                                required
                                placeholder="Enter blog title..."
                                value={newBlogTitle}
                                onChange={handleBlogTitleChange}
                                id="profile-blog"
                            />
                            <div className='text-area'>
                                <textarea
                                    rows="18" cols="40"
                                    placeholder="Write your blog content here..."
                                    value={newBlogContent}
                                    required
                                    onChange={handleBlogContentChange}
                                    style={{ whiteSpace: 'pre-wrap' }}
                                    id="profile-blogCont"
                                />
                                {loading && (
                                    <div className="loading-container loading-profile">
                                        <div className="loading-bar" style={{ width: `${progress}%` }} />
                                    </div>
                                )}
                            </div>
                            
                            {showPostedMessage && (
                                <div className="popup-message">
                                    <p>Posted!</p>
                                </div>
                            )}
                            <button id="profile-add" onClick={handleButtonClick}>Add Blog</button>
                            {showPopup && (
                                <div className="popup">
                                    <div className="popup-content">
                                        <span className="close" onClick={handleClosePopup}>
                                            &times;
                                        </span>

                                        <p id="msg">{showPopupMessage}
                                           <button onClick={handleAddBlog} id="confirm">Confirm</button>
                                        </p>

                                    </div>
                                </div>
                            )}
                           
                        </div>
                        <h2 id="your-blogs">Your Blogs</h2>
                        <br /><br /><br />
                        {blogs.filter(blog => blog.id === _id).length > 0 ?
                            (
                                <ul>
                                    {blogs.filter(blog => blog.id === _id).map((blog) => (
                                        <li key={blog._id} id="profile-list">
                                            <label id="blogtitle"><p id="date"><label id="posted">Blog Posted. </label><small>{blog.dateTime}</small></p><b id="blogtitle-two">{blog.title}</b><i id="name">By {blog.username}</i></label><br />{blog.content.split('\n').map((line, index) => (
                                                <React.Fragment key={index}>
                                                    {line}
                                                    <br />
                                                </React.Fragment>
                                            ))}
                                            {loginData.validUserOne && _id === blog.id ? <button onClick={() => handleRemoveBlog(blog._id)} id="profile-remove">Remove</button> : null}
                                        </li>
                                    ))}
                                </ul>
                            ) : (<p id="profile-msg">Write Your First Blog</p>)
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
