import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/pages/HomePage";

function App() {
  const home = "home";
  const about = "about";
  const skills = "skills";
  const project = "projects";
  const contact = "contact";
  return (
    <>
      <Navbar
        home={home}
        about={about}
        skills={skills}
        project={project}
        contact={contact}
      />
      <Home
        home={home}
        about={about}
        skills={skills}
        project={project}
        contact={contact}
      />
    </>
  );
}

export default App;
