interface SidebarItemProps {
  text: string;
  onClick: () =>void;
  
}

export function SidebarItem({ text, onClick }: SidebarItemProps) {
  return (
    <div className="py-2 px-4 text-gray-700 cursor-pointer hover:bg-gray-200 rounded transition"  onClick={onClick}>
      {text}
    </div>
  );
}
