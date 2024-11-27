import './App.css';
import { Routes, BrowserRouter, Route } from 'react-router-dom'
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
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className='App'>
          <Header />
          <ToastContainer />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path="/signin" element={<Signin />} />
            <Route path="/login" element={<Login />} />
            <Route path='/addBlog' element={<AddEditBlog />}></Route>
            <Route path='/editBlog/:id' element={<AddEditBlog />}></Route>
            <Route path='/blog/:id' element={<Blog />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/' element={<NotFound />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
