import { Bug, Cog, Files, FlaskConical, GitFork, Monitor, Puzzle, Search } from 'lucide-react'
import { useState } from 'react';
import { ButtonNavigation } from "./ButtonNavigation";

interface HelperNavigationProps {
  activeNav: string;
  setActiveNav: (value: string) => void;
}

export default function(props: HelperNavigationProps) {
  function isActive(value: string) {
    return value === props.activeNav;
  }

  function handleActive(value: string) {
    if (value === props.activeNav) {
      return props.setActiveNav('');
    }

    return props.setActiveNav(value);
  }

  return (
    <>
      <div className="flex flex-col">
        <ButtonNavigation icon={Files} onClick={() => handleActive('files')} active={() => isActive('files')} />
        <ButtonNavigation icon={Search} />
        <ButtonNavigation icon={GitFork} />
        <ButtonNavigation icon={Bug} />
        <ButtonNavigation icon={Puzzle} />
        <ButtonNavigation icon={Monitor} />
        <ButtonNavigation icon={FlaskConical} />
      </div>
      <div className="flex flex-col items-center">
        <ButtonNavigation icon={Cog} />
      </div>
    </>
  )
}