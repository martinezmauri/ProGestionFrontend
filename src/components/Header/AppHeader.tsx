import { Avatar } from "@ui/avatar";
import { Button } from "@ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/tooltip";
import { Bell, Search, Settings } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
interface Props {
  title: string;
}
export const AppHeader = ({ title }: Props) => {
  return (
    <header>
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      </div>
    </header>
  );
};
