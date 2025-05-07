import { Link, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "../../ui/sidebar";
import itemSidebar from "../../helpers/itemSideBar";

export const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigate = (to: string) => {
    navigate(to);
  };
  return (
    <>
      <SidebarTrigger className="bg-white absolute top-4 right-[70rem] z-10" />
      <Sidebar className="bg-white min-h-screen w-64 border-r border-gray-200">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-orange-500 font-extrabold text-2xl mb-6 text-center">
              ProGestión
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {itemSidebar.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      onClick={() => handleNavigate(item.to)}
                      className="flex items-center gap-3 p-2 rounded-md"
                    >
                      <img
                        src={item.logo}
                        alt={item.alt}
                        className="w-6 h-6 object-contain"
                      />
                      <span className="text-gray-800 font-medium">
                        {item.title}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
};
