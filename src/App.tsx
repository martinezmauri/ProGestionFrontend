import "./App.css";
import { ClientLanding } from "@views/Client/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserLanding } from "@views/User/UserLanding";
import { Plans } from "@views/Client/Plans";
import { About } from "@views/Client/About";
import { RegistersBusiness } from "@views/Client/RegisterBusiness";
import { PersonalView } from "@views/Client/PersonalView";
import { Dashboard } from "@components/Sidebar/Dashboard";
import { HomeClient } from "@views/Client/Home";
import { BusinessSearch } from "@views/User/BusinessSearch";
import { ServiceView } from "@views/Client/ServiceView";
import { ServiceDetailView } from "@components/Forms/ServiceForm";
import { SidebarLayout } from "@layout/SidebarLayout";
import { PersonalDetailView } from "@views/Client/PersonalDetailView";
import { Support } from "@views/Client/Support";
import AppointmentGrid from "@views/User/AppointmentGrid";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/client" element={<ClientLanding />} />
        <Route path="/" element={<UserLanding />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/about" element={<About />} />
        <Route path="/register-business" element={<RegistersBusiness />} />
        <Route path="/appointment/:id" element={<AppointmentGrid />} />
        <Route path="/search" element={<BusinessSearch />} />
        <Route element={<SidebarLayout />}>
          <Route path="/support" element={<Support />} />
          <Route path="/business" element={<HomeClient />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/personal" element={<PersonalView />} />
          <Route path="/personal/edit" element={<PersonalDetailView />} />
          <Route path="/services" element={<ServiceView />} />
          <Route path="/services/new" element={<ServiceDetailView />} />
          <Route path="/services/edit/:id" element={<ServiceDetailView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
