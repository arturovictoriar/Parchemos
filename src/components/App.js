// Import Libraries
import React, {useState} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./Register";
import Hall from "./Hall"
import VideoChat from "./VideoChat"

/**
 * Main component, chat and register components
 */
const App = () => {
  const [User, setUser] = useState("");
  const [MyStream, setMyStream] = useState();

  return (
    <Router>
      <Route exact path="/" component={() => <Register setUser={setUser} />} />
      <Route path="/hall" component={() => <Hall User={User} setMyStream={setMyStream} />} />
      <Route path="/parche/:roomId" component={() => <VideoChat User={User} MyStream={MyStream} />} />
    </Router>
  );
}

// export the main component
export default App;
