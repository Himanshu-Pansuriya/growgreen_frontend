import React, { useState, useEffect } from "react";
import "../LoginPage/LoginPage.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function LoginPage() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5045/api/Auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCurrenttoken()}`,
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
          role: loginData.role,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorData.message || "Invalid credentials",
        });
        return;
      }
  
      // Parse JSON response
      const data = await response.json();
  
      // Destructure token and user from the response
      const { token, user } = data;
  
      // Store token and user in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userID",user.userID);
      localStorage.setItem("userName",user.userName);
      localStorage.setItem("role",user.role);

      if (loginData.role.toLowerCase() === user.role.toLowerCase()) {
        navigate(user.role === "Admin" ? "/admin" : "/home");
      } else {
        Swal.fire({
          icon: "error",
          title: "Role Mismatch",
          text: "Your role does not match the expected role.",
        });
        return;
      }
  
      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: `Hello ${user.userName}, you've successfully logged in.`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to fetch. Check API connectivity.",
      });
    }
  };
  
  // const fetchAndStoreUserDetails = async (userID) => {
  //   try {
  //     const response = await fetch(`http://localhost:5045/api/User/${userID}`);
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch user details");
  //     }
  //     console.log("Hello");
  //     console.log(userID);
      
  //     const userData = await response.json();
  //     localStorage.setItem("userName", userData.userName);
  //     localStorage.setItem("userID", userData.userID);
  //     localStorage.setItem("role", userData.role);

  //     console.log("User details stored successfully in localStorage");
  //   } catch (error) {
  //     console.error("Error fetching user details:", error);
  //   }
  // };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const { username, email, password, role } = signUpData;

    try {
      const response = await fetch("http://localhost:5045/api/User", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCurrenttoken()}`,
        },
        body: JSON.stringify({ username, email, password, role }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Sign Up Failed!",
          text: errorData.message,
        });
        return;
      }

      const data = await response.json();
      localStorage.setItem("userName", data.userName);
      localStorage.setItem("userID", data.userID);
      localStorage.setItem("role", data.role);

      navigate("/home");
      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: `Welcome ${data.userName}, your account has been created successfully.`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to fetch. Check API connectivity.",
      });
    }
  };

  const handleInputChange = (event, type) => {
    const { name, value } = event.target;
    if (type === "login") {
      setLoginData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (type === "signup") {
      setSignUpData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <div className="section-login">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div>
                <h1 className="heading-login">Welcome to GrowGreen!</h1>
              </div>
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3 text-login">
                  <span style={{ fontSize: "20px" }}>Log In </span>
                  <span style={{ fontSize: "20px" }}>Sign Up</span>
                </h6>
                <input
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    {/* Log In Section */}
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3 text-light">Log In</h4>
                          <form onSubmit={handleLogin}>
                            <div className="form-group">
                              <input
                                type="email"
                                name="email"
                                className="form-style"
                                placeholder="Your Email"
                                value={loginData.email}
                                onChange={(e) => handleInputChange(e, "login")}
                                autoComplete="off"
                              />
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                name="password"
                                className="form-style"
                                placeholder="Your Password"
                                value={loginData.password}
                                onChange={(e) => handleInputChange(e, "login")}
                                autoComplete="off"
                              />
                            </div>
                            <div className="form-group mt-2">
                              <select
                                name="role"
                                className="form-style"
                                value={loginData.role}
                                onChange={(e) => handleInputChange(e, "login")}
                              >
                                <option value="" disabled>
                                  Select Role
                                </option>
                                <option value="Farmer">Farmer</option>
                                <option value="Admin">Admin</option>
                                <option value="Salesman">Salesman</option>
                              </select>
                            </div>
                            <button type="submit" className="btn mt-4">
                              Log In
                            </button>
                          </form>
                          {/* <p className="mb-0 mt-4 text-center">
                            <a href="#0" className="link">
                              Forgot your password?
                            </a>
                          </p> */}
                        </div>
                      </div>
                    </div>

                    {/* Sign Up Section */}
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3 text-light">Sign Up</h4>
                          <form onSubmit={handleSignUp}>
                            <div className="form-group">
                              <input
                                type="text"
                                name="username"
                                className="form-style"
                                placeholder="Your Full Name"
                                value={signUpData.username}
                                onChange={(e) => handleInputChange(e, "signup")}
                                autoComplete="off"
                              />
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="email"
                                name="email"
                                className="form-style"
                                placeholder="Your Email"
                                value={signUpData.email}
                                onChange={(e) => handleInputChange(e, "signup")}
                                autoComplete="off"
                              />
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                name="password"
                                className="form-style"
                                placeholder="Your Password"
                                value={signUpData.password}
                                onChange={(e) => handleInputChange(e, "signup")}
                                autoComplete="off"
                              />
                            </div>
                            <div className="form-group mt-2">
                              <select
                                name="role"
                                className="form-style"
                                value={signUpData.role}
                                onChange={(e) => handleInputChange(e, "signup")}
                              >
                                <option value="" disabled>
                                  Select Role
                                </option>
                                <option value="Farmer">Farmer</option>
                                <option value="Salesman">Salesman</option>
                              </select>
                            </div>
                            <button type="submit" className="btn mt-4">
                              Sign Up
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getCurrentUsername = () => {
  return localStorage.getItem("userName");
};
export const getCurrentUserID = () => {
  return localStorage.getItem("userID");
};
export const getCurrenttoken = () => {
  return localStorage.getItem("token");
};
export default LoginPage;
