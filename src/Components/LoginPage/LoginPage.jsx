import React, { useState } from "react";
import "../LoginPage/LoginPage.css";
import { useNavigate } from "react-router-dom";
let isLoggedin = false;

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
      const response = await fetch("http://localhost:5045/api/User/auth", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: 1,
          userName: "default",
          email: loginData.email,
          password: loginData.password,
          role: loginData.role,
          createdAt:"0001-01-01T00:00:00",
          modifiedAt: "2025-01-15T06:44:51.904Z"
        }),
      });
      // console.log(response);
      // console.log(loginData);

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Invalid credentials"}`);
        return;
      }

      const user = await response.json();
      if (loginData.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
      localStorage.setItem("user", JSON.stringify(user));
       

    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to fetch. Check API connectivity.");
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const { username, email, password, role } = signUpData;

    const response = await fetch("http://localhost:5045/api/User", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password, role }),
    });

    const data = await response.json();
    if (response.ok) {
      navigate("/home");
    } else {
      alert(`Error: ${data.message}`);
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
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3 text-white">
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    {/* Log In Section */}
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Log In</h4>
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
                          <p className="mb-0 mt-4 text-center">
                            <a href="#0" className="link">
                              Forgot your password?
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Sign Up Section */}
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Sign Up</h4>
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

export default LoginPage;