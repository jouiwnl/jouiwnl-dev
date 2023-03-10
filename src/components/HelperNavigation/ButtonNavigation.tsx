import type { Icon } from 'lucide-react'

interface MenuButtonProps {
  icon: Icon
  active?: () => boolean;
  onClick?: () => void;
}

export function ButtonNavigation(props: MenuButtonProps) {
  const isActive = props.active?.();

  return (
    <div
      data-active={isActive}
      onClick={props.onClick}
      className="cursor-pointer h-12 flex justify-center items-center border-l-2 border-transparent data-[active=true]:border-[#E0DEF2]"
    >
      <props.icon strokeWidth={1.5} size={28} color={isActive ? "#E0DEF2" : "#8F8CA8"} />
    </div>
  )
}