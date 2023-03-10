import { FileJson, MoreHorizontal, Terminal } from "lucide-react";
import { Folder } from "./Folder";
import { SubMenu } from "./SubMenu";
import { File } from "./File";
import { useContext } from "react";
import { FileHtml, FileJs } from "phosphor-react";
import { ActiveFileContext } from "../../contexts/ActiveFileContext";

export default function() {
  const { activeFile, setActiveFile } = useContext(ActiveFileContext);

  function isActive(value: string) {
    return value === activeFile;
  }

  return (
    <div className="py-2 px-4 mt-1 text-white">
      <strong className="font-medium w-full text-xs pl-2 flex items-center justify-between">
        EXPLORER
        <MoreHorizontal size={16} strokeWidth={1.5} />
      </strong>

      <nav className="mt-4 flex flex-col">
        <SubMenu defaultOpen title="JOUIWNL-DEV">
          <Folder defaultOpen title="About me">
            <File active={() => isActive('about.md')} onClick={() => setActiveFile("about.md")}>
              <FileJson size={16} />
              about.md
            </File>
            <File active={() => isActive('socials.html')} onClick={() => setActiveFile("socials.html")}>
              <FileHtml size={16} />
              socials.html
            </File>
          </Folder>

          <Folder title="Setup">
            <File active={() => isActive('work.json')} onClick={() => setActiveFile("work.json")}>
              <FileJson size={16} />
              work.json
            </File>
            <File active={() => isActive('gaming.json')} onClick={() => setActiveFile("gaming.json")}>
              <FileJson size={16} />
              gaming.json
            </File>
          </Folder>

          <Folder title="Playground">
            <File active={() => isActive('playground.json')} onClick={() => setActiveFile("playground.js")}>
              <FileJs size={16} />
              playground.js
            </File>
          </Folder>
        </SubMenu>
      </nav>
    </div>
  )
}