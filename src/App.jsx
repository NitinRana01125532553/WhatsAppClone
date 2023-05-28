import "./App.css";
import Sidebar from "./Components/Sidebar";
import Chat from "./Components/Chat";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <div className="app-body">
        {
          // sidebar
          //chat
        }
        <Routes>
          <Route path="/" element={<Sidebar />} />
          <Route
            path="/rooms/:roomId"
            element={
              <>
                <Sidebar />
                <Chat />
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
