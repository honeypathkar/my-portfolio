import './App.css';
import Contact from './components/Contact';
import Details from './components/Details';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Work from './components/Work';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
    <Router>
      <Navbar/>
        <Routes>
          <Route exact path='/' element={<Details/>}/>
          <Route exact path='/work' element={<Work/>}/>
          <Route exact path='/contact' element={<Contact/>}/>
        </Routes>
      <Footer/>
    </Router>
    </>
  );
}

export default App;
