import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  let registerUser = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:8000/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password1.value,
        password2: e.target.password2.value,
      }),
    });
    let data = await response.json();
    console.log(response);
    const username = data.username;
    if (response.ok === true) {
      alert("Account Created!");
      history.push("/login");
    } else {
      alert("Something went wrong");
    }
  };

  let loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      setLoading(true);
      history.push("/");
    } else {
      alert("something went wrong");
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    history.push("/");
  };

  let updateTokens = async () => {
    // console.log("updating");
    let response = await fetch("http://localhost:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }
    if (loading) {
      setLoading(false);
    }
  };

  let contextData = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
    registerUser: registerUser,
  };

  useEffect(() => {
    if (loading) {
      updateTokens();
    }
    const fourMinutes = 1000 * 60 * 4;
    let interval = setInterval(() => {
      if (authTokens) {
        updateTokens();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authTokens, loading]);
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
