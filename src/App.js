import GetStartedButton from "./components/Home/GetStartedButton";
import NavbarComponent from "./components/Home/NavbarComponent";

function App() {
  return (
    <div className="app background-primary" style={{ height: '100vh' }}>
      <NavbarComponent/>
      <div className="container text-center mt-5">
        <div className="row align-items-center"> 
          <div className="col-6 hero-left text-start">
            <h1 className="welcome mb-3">Welcome to <br/>Life RPG World</h1>
            <p className="intro mb-3">Greetings, brave adventurer! Step into a world where your life becomes an epic quest. In this RPG, you are the hero  and your daily tasks are the missions that await.</p>
            <GetStartedButton/>
          </div>
          <div className="col-6 hero-right" >
            <img src="./images/hero.jpg" alt="hero" width="600" height="auto" className="img-fluid"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
