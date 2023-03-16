import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Rooters from "./rooters/Rooters";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Rooters />
      </BrowserRouter>
    </div>
  );
}

export default App;
