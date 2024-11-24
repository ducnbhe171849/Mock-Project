import './App.css';
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import Home from './pages/Home';
import AddEditBlog from './pages/AddEditBlog';
import Blog from './pages/Blog';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/addBlog' element={<AddEditBlog />}></Route>
          <Route path='/editBlog/:id' element={<AddEditBlog />}></Route>
          <Route path='/blod/:id' element={<Blog />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/' element={<NotFound />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
