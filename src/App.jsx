import "./App.css";
import Sidebar from "./Components/Sidebar";
import Chat from "./Components/Chat";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./Components/Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
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
      )}
    </div>
  );
}

export default App;
