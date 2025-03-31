import "./App.css";
import { ClientLanding } from "./views/ClientLanding/ClientLanding";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserLanding } from "./views/UserLanding/UserLanding";
import { Plans } from "./views/PlansClient/Plans";
import { About } from "./views/AboutClient/About";
import { RegistersBusiness } from "./components/RegisterBusiness/RegistersBusiness";
import { PersonalView } from "./components/CreatePersonal/PersonalView";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { HomeClient } from "./components/HomeClient/HomeClient";
import { BusinessSearch } from "./components/BusinessSearch/BusinessSearch";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/client" element={<ClientLanding />} />
        <Route path="/" element={<UserLanding />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/about" element={<About />} />
        <Route path="/registerBusiness" element={<RegistersBusiness />} />
        <Route path="/personalView" element={<PersonalView />} />
        <Route path="/dashboard" element={<Dashboard extend={true} />} />
        <Route path="/homeClient" element={<HomeClient />} />
        <Route path="/search" element={<BusinessSearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
