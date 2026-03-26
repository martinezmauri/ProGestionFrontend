import {
  BarChart3,
  Briefcase,
  Calendar,
  Settings,
  Users,
  LogOut,
  LayoutDashboard,
  CalendarSearch,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@ui/sidebar";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/personal", icon: Users, label: "Personal" },
  { to: "/services", icon: Briefcase, label: "Servicios" },
  { to: "/dashboard/agenda", icon: Calendar, label: "Agenda" },
  { to: "/empresa", icon: Briefcase, label: "Empresa" },
  { to: "/estadisticas", icon: BarChart3, label: "Estadísticas" },
  { to: "/configuracion", icon: Settings, label: "Configuración" },
];

export default function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Sidebar className="border-r border-sky-100 bg-white/95 backdrop-blur-xl shadow-sm z-40">
      <SidebarHeader className="p-4 flex flex-row items-center gap-3 border-b border-sky-50 pb-6 pt-6">
        <div
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center font-bold text-white shadow-md cursor-pointer hover:shadow-lg transition-all hover:-translate-y-0.5"
          onClick={() => navigate("/dashboard")}
        >
          O
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-extrabold text-slate-800 leading-tight">OMTime</span>
          <span className="text-xs font-semibold tracking-wider text-sky-600 uppercase">Gestor</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.to || (location.pathname === "/turnos" && item.to === "/grilla-turnos");
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      className={`h-11 rounded-lg transition-all duration-200 ${isActive
                        ? "bg-sky-50 text-sky-700 font-semibold shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      asChild
                      tooltip={item.label}
                    >
                      <Link to={item.to} className="flex items-center gap-3 px-3">
                        <item.icon className={`w-5 h-5 ${isActive ? "text-sky-600" : "text-slate-400"}`} />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sky-50 pb-6">
        <SidebarMenu className="gap-1">
          <SidebarMenuItem>
            <SidebarMenuButton
              className="h-11 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors w-full flex items-center gap-3 px-3"
              asChild
            >
              <Link to="/">
                <CalendarSearch className="w-5 h-5 text-slate-400" />
                <span className="font-medium">Sacar un turno</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="h-11 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors w-full flex items-center gap-3 px-3"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 text-red-400" />
              <span className="font-medium">Cerrar Sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
