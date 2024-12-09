import './App.css';
import { Routes, BrowserRouter, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AddEditBlog from './pages/AddEditBlog';
import Blog from './pages/Blog';
import About from './pages/About';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Signin from './components/Signin';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthProvider, useAuth } from './components/AuthContext';
import UserProfile from './pages/UserProfile';
import UpdateProfile from './pages/UpdateProfile';
import ChangePassword from './pages/ChangePassword';
import MyBlog from './pages/Myblog';
import MyFavorite from './pages/MyFavorite';

// PrivateRoute component to handle protected routes
const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth(); // Check if user is logged in
  return isLoggedIn ? children : <Navigate to="/notFound" />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Header />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/login" element={<Login />} />

            {/* Private routes */}
            <Route
              path="/addBlog"
              element={
                <PrivateRoute>
                  <AddEditBlog />
                </PrivateRoute>
              }
            />
            <Route
              path="/editBlog/:id"
              element={
                <PrivateRoute>
                  <AddEditBlog />
                </PrivateRoute>
              }
            />
            <Route path="/  " element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/page/:page" element={<Home />} />
            <Route path="/category/:category" element={<Home />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/notFound" element={<NotFound />} />
            <Route path="/MyBlog/:id" element={<MyBlog />} />
            <Route path="/my-favorites" element={<MyFavorite />} />
            <Route path="/userprofile/:id" element={<UserProfile />} />
            <Route path="/updateprofile/:id" element={<UpdateProfile />} />
            <Route path="/changepassword/:id" element={<ChangePassword />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
