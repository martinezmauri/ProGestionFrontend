import "./App.css";
import { ClientLanding } from "@views/Client/Landing";
import { Route, Routes } from "react-router-dom";
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
import ProtectedRoute from "@components/ProtectedRoute";
import { OnboardingLayout } from "@layout/OnboardingLayout";
import { SelectPlan } from "@views/Client/SelectPlan";
import { AppointmentGrid } from "@views/Client/AppointmentGrid";
import { BusinessSettings } from "@views/Client/BusinessSettings";
import { UserSettings } from "@views/Client/UserSettings";
import { Statistics } from "@views/Client/Statistics";

function App() {
  return (
    <Routes>
        <Route path="/para-negocios" element={<ClientLanding />} />
        <Route path="/" element={<UserLanding />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/about" element={<About />} />
        <Route path="/business/:id" element={<BusinessDetail />} />
        <Route path="/search" element={<BusinessSearch />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<OnboardingLayout />}>
            <Route path="/onboarding/plans" element={<SelectPlan />} />
            <Route path="/onboarding/business" element={<RegistersBusiness />} />
            {/* Note: In Phase 2, Business, Hours, Personal and Services will also move here or be refactored */}
          </Route>
          <Route element={<SidebarLayout />}>
            <Route path="/support" element={<Support />} />
            <Route path="/dashboard" element={<HomeClient />} />
            <Route path="/personal" element={<Personal />} />
            <Route path="/services" element={<ServiceView />} />
            <Route path="/grilla-turnos" element={<AppointmentGrid />} />
            <Route path="/empresa" element={<BusinessSettings />} />
            <Route path="/configuracion" element={<UserSettings />} />
            <Route path="/estadisticas" element={<Statistics />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;
