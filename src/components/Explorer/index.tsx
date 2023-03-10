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
    <div className="py-2 mt-1 text-white">
      <strong className="font-medium h-2 px-6 py-2 w-full text-xs pl-2 flex items-center justify-between">
        <span className="ml-2">
          EXPORER
        </span>
        <MoreHorizontal size={16} strokeWidth={1.5} />
      </strong>

      <nav className="mt-3 flex flex-col">
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
            <File active={() => isActive('work.js')} onClick={() => setActiveFile("work.js")}>
              <FileJson size={16} />
              work.js
            </File>
            <File active={() => isActive('gaming.js')} onClick={() => setActiveFile("gaming.js")}>
              <FileJson size={16} />
              gaming.js
            </File>
          </Folder>

          <Folder title="Playground">
            <File active={() => isActive('playground.js')} onClick={() => setActiveFile("playground.js")}>
              <FileJs size={16} />
              playground.js
            </File>
          </Folder>
        </SubMenu>
      </nav>
    </div>
  )
}