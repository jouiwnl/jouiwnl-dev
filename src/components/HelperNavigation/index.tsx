import { Bug, Cog, Files, FlaskConical, GitFork, Monitor, Puzzle, Search } from 'lucide-react'
import { ButtonNavigation } from "./ButtonNavigation";

export default function() {
  return (
    <div className="min-h-screen w-14 flex flex-col justify-between">
      <div className="flex flex-col">
        <ButtonNavigation icon={Files} isActive />
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
    </div>
  )
}