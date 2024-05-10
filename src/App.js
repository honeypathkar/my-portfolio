import './App.css';
import Contact from './components/Contact';
import Home from './components/Home';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Work from './components/Work';
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
    <Router>
      <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/work' element={<Work/>}/>
          <Route exact path='/contact' element={<Contact/>}/>
        </Routes>
      <Footer/>
    </Router>
    </>
  );
}

export default App;
