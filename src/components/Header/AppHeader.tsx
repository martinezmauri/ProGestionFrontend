import React from "react";
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
