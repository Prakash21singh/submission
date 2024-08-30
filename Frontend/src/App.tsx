import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <div className="font-Inter">
        <Outlet />
      </div>
    </>
  );
}

export default App;
