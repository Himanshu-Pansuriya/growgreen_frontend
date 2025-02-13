import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Blog.css"; // Make sure your Blog.css is correctly imported
import { getCurrenttoken } from "../LoginPage/LoginPage";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]); // Stores fetched blog data
  const [loading, setLoading] = useState(true); // Controls skeleton loader display
  const token = getCurrenttoken(); // Get the current user token

  useEffect(() => {
    let isMounted = true;  // Add mounted flag
    
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5045/api/Blog", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();
        if (isMounted) {  // Only update state if component is mounted
          setBlogs(data.slice(0, 10));
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (isMounted) {  // Only update state if component is mounted
          setLoading(false);
        }
      }
    };

    fetchBlogs();

    return () => {
      isMounted = false;  // Cleanup function
    };
  }, [token]);

  return (
    <div className="blog-container">
      <h1 className="blog-heading">Latest Blogs</h1>
      <div className="blog-list">
        {loading
          ? // Show skeleton loader while loading is true
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="blog-card">
                <Skeleton height={30} width={`80%`} />
                <Skeleton count={3} />
              </div>
            ))
          : 
            blogs.map((blog) => (
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
