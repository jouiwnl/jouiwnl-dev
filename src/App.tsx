import Explorer from './components/Explorer'
import HelperNavigation from './components/HelperNavigation'

import { codes } from './lib/codes';
import { useContext, useEffect, useState } from 'react';
import { ActiveFileContext } from './contexts/ActiveFileContext';
import { Code } from './interfaces/code';

import Playground from './components/Playground';
import CodeEditor from './components/CodeEditor';

function App() {
  const { activeFile } = useContext(ActiveFileContext);

  const [code, setCode] = useState<Code | undefined>(codes.find(code => activeFile === code.id));
  const [activeNav, setActiveNav] = useState('files')

  useEffect(() => {
    setCode(codes.find(code => activeFile === code.id));
  }, [activeFile])

  return (
    <main className="min-h-screen bg-omni-dark">
      <div className="flex flex-row overflow-hidden">
        <nav className="min-h-screen w-14 flex flex-col justify-between border-r-[1px] border-zinc-600">
          <HelperNavigation activeNav={activeNav} setActiveNav={setActiveNav} />
        </nav>

        {
          activeNav && (
            <nav className="min-h-screen w-60 col-span-2">
              <Explorer />
            </nav>
          )
        }

        {
          activeFile && (
            <section className="max-h-screen overflow-auto flex-1">
              { activeFile === 'playground.js' && <Playground /> }

              { code && <CodeEditor code={code} /> }
            </section>
          )
        }
      </div>
    </main>
  )
}

export default App
