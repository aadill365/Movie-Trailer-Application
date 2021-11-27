import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./screens/Homepage";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <PrivateRoute exact path="/">
            <Homepage />
          </PrivateRoute>
          <Route exact path="/login">
            <LoginScreen />
          </Route>
          <PrivateRoute exact path="/profile">
            <ProfileScreen />
          </PrivateRoute>
          <Route path="/register">
            <SignUpScreen />
          </Route>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
