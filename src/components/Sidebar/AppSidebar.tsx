import {
  BarChart3,
  Briefcase,
  Calendar,
  Menu,
  Settings,
  Users,
} from "lucide-react";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@ui/sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@lib/utils";

const navItems = [
  { to: "/personal", icon: <Users className="w-5 h-5" />, label: "Personal" },
  {
    to: "/servicios",
    icon: <Calendar className="w-5 h-5" />,
    label: "Servicios",
  },
  { to: "/turnos", icon: <Calendar className="w-5 h-5" />, label: "Turnos" },
  {
    to: "/empresa",
    icon: <Briefcase className="w-5 h-5" />,
    label: "Empresa",
  },
  {
    to: "/configuracion",
    icon: <Settings className="w-5 h-5" />,
    label: "Configuración",
  },
];

const bottomItems = [
  {
    to: "/estadisticas",
    icon: <BarChart3 className="w-5 h-5" />,
    label: "Estadísticas",
  },
  { to: "/menu", icon: <Menu className="w-5 h-5" />, label: "Menú" },
];
export default function AppSidebar() {
  /* Tiene problemas ya que si crece en altura el bottomItems se va muy abajo. Los logos deben ser mas grandes,
  y los iconos tambien. */
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Sidebar collapsible="none" className="w-20 text-white hidden md:flex">
      <SidebarContent className="flex flex-col bg-sky-600 justify-between items-center h-full py-4">
        <SidebarGroup className="flex flex-col items-center w-full">
          {/* Logo redondo */}
          <SidebarGroupLabel
            className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold mb-6"
            onClick={() => navigate("/")}
          >
            P
          </SidebarGroupLabel>

          {/* Menú principal */}
          <SidebarGroupContent className="flex flex-col gap-4 items-center">
            <SidebarMenu className="flex flex-col gap-4 items-center">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    className={cn(
                      "flex items-center justify-center p-3 w-12 h-12 rounded-lg hover:bg-sky-700 transition-colors",
                      location.pathname === item.to && "bg-sky-700"
                    )}
                    asChild
                  >
                    <Link to={item.to} title={item.label}>
                      {item.icon}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Menú inferior */}
        <div className="flex flex-col gap-4 items-center">
          <SidebarMenu className="flex flex-col gap-4 items-center">
            {bottomItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  className={cn(
                    "flex items-center justify-center p-3 w-12 h-12 rounded-lg hover:bg-sky-700 transition-colors",
                    location.pathname === item.to && "bg-sky-700"
                  )}
                  asChild
                >
                  <Link to={item.to} title={item.label}>
                    {item.icon}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
