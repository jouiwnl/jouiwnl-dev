import CodeEditor from '@uiw/react-textarea-code-editor'
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ActiveFileContext } from '../../contexts/ActiveFileContext';

interface CodeEditorProps {
  code: {
    code: string;
    type: string;
    fontSize?: string;
    id?: string;
    editable?: boolean;
  };
  setCode?: (value: string) => void;
}

export default function(props: CodeEditorProps) {
  const { activeFile, setActiveFile } = useContext(ActiveFileContext);

  const [code, setCode] = useState(props.code?.code);

  const length = code.split('\n').length;

  useEffect(() => {
    setCode(props.code?.code);
  }, [props.code])

  return (
    <div className="flex flex-col">
      <div className="flex flex-row sticky top-0 z-50 h-10 min-w-screen bg-omni-dark">
        <div className="h-10 w-40 border-b-[1px] border-indigo-400 flex justify-between items-center p-2 text-white text-sm">
          <span className="italic">
            {activeFile}
          </span>
          <button onClick={() => setActiveFile('')} className="p-1 hover:opacity-50">
            x
          </button>
        </div>
      </div>
      <div className="flex flex-row min-w-[1200px] px-4 flex-1 relative">
        <div className="flex flex-col font-monospace items-center leading-7 mt-5">
          {Array(length).fill(0).map((_, index) => (
            <span key={String(Math.random())} className="text-[#8F8CA8] text-[16px] leading-7">
              {index + 1}
            </span>
          ))}
        </div>

        <CodeEditor
          value={code}
          language={props.code.type}
          placeholder="Please enter JS code."
          onChange={(event) => props.setCode?.(event.target.value)}
          minHeight={80}
          padding={20}
          spellCheck={false}
          disabled={!props.code.editable}
          className="bg-omni-dark flex-1 font-monospace rounded text-white text-[16px] leading-7"
        />
      </div>
    </div>
  )
}