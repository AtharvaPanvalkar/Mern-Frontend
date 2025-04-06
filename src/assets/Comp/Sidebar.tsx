import { ReactNode } from "react";

interface SidebarProps {
  title: string;
  children: ReactNode;
}

export function Sidebar({ title, children }: SidebarProps) {
  return (
    <div className="h-screen w-72 fixed top-0 left-0 bg-gray-100 p-4 border-r">
      <h1 className="text-xl font-bold mb-4">{title}</h1>
      <div>{children}</div>
    </div>
  );
}
