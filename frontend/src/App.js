
import './App.css';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from './components/signup/Signup';
import Signin from './components/signin/Signin';
import Todo from './components/todo/Todo';
import { useEffect } from 'react';
import { authActions } from './store';
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const id = sessionStorage.getItem('userId');
    if (id){
      dispatch(authActions.login());
    }
    
  }, []);

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route  path='/signup' element={<Signup/>} />
          <Route path='/signin' element={<Signin/>} />
          <Route path='/todo' element={<Todo/>} />
        </Routes>
      </Router>
      <Footer/>
    </>
  );
}

export default App;
