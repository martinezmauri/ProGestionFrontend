import "./App.css";
import { ClientLanding } from "@views/Client/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserLanding } from "@views/User/UserLanding";
import { Plans } from "@views/Client/Plans";
import { About } from "@views/Client/About";
import { RegistersBusiness } from "@views/Client/RegisterBusiness";
import { HomeClient } from "@views/Client/Home";
import { BusinessSearch } from "@views/User/BusinessSearch";
import { ServiceView } from "@views/Client/ServiceView";
import { SidebarLayout } from "@layout/SidebarLayout";
import { Support } from "@views/Client/Support";
import BusinessDetail from "@views/User/BusinessDetail";
import { Personal } from "@views/Client/Personal";
import NotFound from "@components/NotFound/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/client" element={<ClientLanding />} />
        <Route path="/" element={<UserLanding />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/about" element={<About />} />
        <Route path="/business/:id" element={<BusinessDetail />} />
        <Route path="/search" element={<BusinessSearch />} />
        <Route element={<SidebarLayout />}>
          <Route path="/register-business" element={<RegistersBusiness />} />
          <Route path="/support" element={<Support />} />
          <Route path="/dashboard" element={<HomeClient />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/services" element={<ServiceView />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
