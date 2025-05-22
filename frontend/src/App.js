import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";

function App() {
  const home = "home";
  const about = "about";
  const skills = "skills";
  const project = "projects";
  const contact = "contact";
  const experience = "experience";
  return (
    <>
      <Navbar
        home={home}
        about={about}
        skills={skills}
        project={project}
        contact={contact}
        experience={experience}
      />
      <Home
        home={home}
        about={about}
        skills={skills}
        project={project}
        contact={contact}
        experience={experience}
      />
    </>
  );
}

export default App;
