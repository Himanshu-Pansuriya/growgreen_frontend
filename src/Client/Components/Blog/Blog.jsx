import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import './Blog.css';
import { getCurrenttoken } from "../LoginPage/LoginPage";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = getCurrenttoken();

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5045/api/Blog",{
        method:'GET',
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })
        .then((response) => response.json())
        .then((data) => {
          setBlogs(data.slice(0, 10)); 
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }, 2000); 
  }, []);

  return (
    <div className="blog-container">
      <h1 className="blog-heading">Latest Blogs</h1>
      <div className="blog-list">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="blog-card">
                <Skeleton height={30} width={`80%`} />
                <Skeleton count={3} />
              </div>
            ))
          : blogs.map((blog) => (
              <div key={blog.id} className="blog-card">
                <h2 className="blog-title">{blog.title}</h2>
                <p className="blog-description">{blog.detail}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default BlogPage;
