import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { LoginContext } from './Context'
import './profile.css';

function Profile() {
    const [blogs, setBlogs] = useState([]);
    const [newBlogTitle, setNewBlogTitle] = useState('');
    const [newBlogContent, setNewBlogContent] = useState('')
    const [profilePicture, setProfilePicture] = useState(null);
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
                    const res = await fetch("https://naturesdeck-trekcamp-backend-app.onrender.com/validateuser", {
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

        fetch('https://naturesdeck-trekcamp-backend-app.onrender.com/allBlogs')
            .then(response => response.json())
            .then(data => {
                setBlogs(data);
                console.log("Blog data:", data);
                window.scrollTo(0, 0);
            })
            .catch(error => console.error('Error fetching blogs:', error));
    }, [navigate,setLoginData]);

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
            const formData = new FormData();
            formData.append('profilePicture', profilePicture);
            formData.append('userId', loginData.validUserOne._id); // Add user ID to FormData

            // Upload the profile picture
            const response = await fetch(`https://naturesdeck-trekcamp-backend-app.onrender.com/uploadProfilePicture`, {
                method: 'POST',
                body: formData,
            });
            console.log("Response:", response);
            if (response.ok) {
                console.log('Profile picture uploaded successfully');
            } else {
                //const errorDetails=response.json();
                console.error('Failed to upload profile picture:', response.statusText,response);
            }
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    };
   
   
    const username = loginData.validUserOne ? loginData.validUserOne.username : '';
    const email = loginData.validUserOne ? loginData.validUserOne.email : '';
    const pp = loginData.validUserOne ? loginData.validUserOne.profilePicture : '';
    const _id = loginData.validUserOne ? loginData.validUserOne._id : ' ';
    const trimmedPath = pp?pp.replace(/\//g, '\\').replace(/.*travel-app(\\|\/)public(\\|\/)/, '/'): ' ';
    console.log(trimmedPath);

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
                                            <img src={trimmedPath} alt="profileImage" />
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
                            <button onClick={handleUploadProfilePicture}><i class="fa-solid fa-add"></i></button>
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
                            <textarea
                                rows="18" cols="40"
                                placeholder="Write your blog content here..."
                                value={newBlogContent}
                                required
                                onChange={handleBlogContentChange}
                                style={{ whiteSpace: 'pre-wrap' }}
                                id="profile-blogCont"
                            />
                            <button id="profile-add">Add Blog</button>
                        </div>
                        <h2 id="your-blogs">Your Blogs</h2>
                        <br /><br /><br />
                        {blogs.filter(blog => blog.id ===_id).length>0 ?
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
