import Explorer from './components/Explorer'
import HelperNavigation from './components/HelperNavigation'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CodeEditor from '@uiw/react-textarea-code-editor'
import { codes } from './lib/codes';
import { useContext } from 'react';
import { ActiveFileContext } from './contexts/ActiveFileContext';
import Playground from './components/Playground';

function App() {
  const { activeFile } = useContext(ActiveFileContext);

  const code = codes.find(code => activeFile === code.id);
  const length = code?.code.split('\n').length;

  return (
    <main className="min-h-screen bg-omni-dark">
      <div className="flex flex-row overflow-hidden">
        <HelperNavigation />

        <nav className="min-h-screen w-60 col-span-2">
          <Explorer />
        </nav>

        <section className="max-h-screen overflow-auto flex-1">
          {
            activeFile === 'playground' && (
              <Playground />
            )
          }

          {
            code && (
              <div className="flex flex-row min-h-screen min-w-[1200px]">
                <div className="flex flex-col font-monospace items-center leading-7 mt-5">
                  {Array(length).fill(0).map((_, index) => (
                    <span className="text-[#8F8CA8] text-[16px] leading-7">
                      {index + 1}
                    </span>
                  ))}
                </div>

                <CodeEditor
                  value={code.code}
                  language={code.type}
                  placeholder="Please enter JS code."
                  minHeight={80}
                  padding={20}
                  spellCheck={false}
                  disabled={true}
                  className="bg-omni-dark flex-1 font-monospace rounded text-white text-[16px] leading-7"
                />
              </div>
            )
          }
        </section>
      </div>
    </main>
  )
}

export default App
