import "./App.css";
import { ClientLanding } from "./views/ClientLanding/ClientLanding";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserLanding } from "./views/UserLanding/UserLanding";
import { TurnUser } from "./components/TurnUserLanding/TurnUser";
import { PlansClient } from "./components/PlansClientLanding/PlansClient";
import { HeroClient } from "./components/HeroClientLanding/HeroClient";
import { Plans } from "./views/PlansClient/Plans";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/client" element={<ClientLanding />} />
        <Route path="/" element={<UserLanding />} />
        <Route path="/search" element={<TurnUser />} />
        <Route path="/plans" element={<Plans />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
