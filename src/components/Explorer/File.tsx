import { ReactNode } from 'react';

interface FileProps extends React.DOMAttributes<HTMLSpanElement> {
  children: ReactNode[];
  active?: () => boolean;
}

export function File(props: FileProps) {
  const isActive = props.active?.();

  return (
    <span
      data-active={isActive}
      className="cursor-pointer flex text-sm items-center gap-2 py-1 px-4 pl-10 hover:bg-[#2a273f] hover:text-[#E0DEF2] data-[active=true]:bg-[#2a273f] data-[active=true]:text-[#E0DEF2]"
      {...props}
    />
  );
}