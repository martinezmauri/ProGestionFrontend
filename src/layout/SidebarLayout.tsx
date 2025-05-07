import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../ui/sidebar";

export const SidebarLayout = () => {
  return (
    <SidebarProvider>
      <Outlet />
    </SidebarProvider>
  );
};
