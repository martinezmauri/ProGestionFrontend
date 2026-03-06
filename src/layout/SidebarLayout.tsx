import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "../components/Sidebar/AppSidebar";

export const SidebarLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-[#F4FBFF] to-white">
        <AppSidebar />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          {/* Mobile Header Header */}
          <div className="md:hidden flex h-14 items-center gap-4 border-b bg-white px-4 lg:h-[60px] lg:px-6 shadow-sm z-30 sticky top-0">
            <SidebarTrigger className="text-sky-600" />
            <div className="flex flex-1 items-center justify-between">
              <h1 className="text-orange-500 font-bold text-xl ml-2">OMTime</h1>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xs">P</span>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
