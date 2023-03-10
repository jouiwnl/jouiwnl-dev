import { Lightning, Spinner } from 'phosphor-react'
import ANSIToHTML from 'ansi-to-html'
import { getWebContainerInstance } from '../../lib/web-container'
import { useState } from 'react'
import CodeEditor from '../CodeEditor';

const initialCode = [
  `import fetch from 'isomorphic-fetch';`,
  `// Run any javascript code`,
  `// Made with new web containers on browser`,
  ``,
  `fetch('https://api.github.com/users/jouiwnl')
    .then(response => response.json())
    .then(data => { console.log(data) })`,
].join('\n')

const ANSIConverter = new ANSIToHTML()

export default function() {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)

  async function handleEvaluateCode() {
    setIsRunning(true)

    const webContainer = await getWebContainerInstance()

    await webContainer.mount({
      'index.js': {
        file: {
          contents: code,
        },
      },
      'package.json': {
        file: {
          contents: `
            {
              "name": "example-app",
              "type": "module",
              "dependencies": {
                "isomorphic-fetch": "latest"
              },
              "scripts": {
                "start": "node index.js"
              }
            }
          `.trim(),
        },
      },
    })

    const install = await webContainer.spawn('pnpm', ['i'], {
      // output: false,
    })

    setOutput(['🔥 Installing dependencies!'])

    install.output.pipeTo(
      new WritableStream({
        write(data) {
          setOutput((state) => [...state, ANSIConverter.toHtml(data)])
        },
      }),
    )

    await install.exit

    setOutput((state) => [...state, '---------', '🚀 Running the application!'])

    const start = await webContainer.spawn('pnpm', ['start'])

    start.output.pipeTo(
      new WritableStream({
        write(data) {
          setOutput((state) => [...state, ANSIConverter.toHtml(data)])
        },
      }),
    )

    setIsRunning(false)
  }

  function handleStopEvaluation() {
    setIsRunning(false)
  }

  return (
    <div className="not-prose flex flex-col min-h-screen min-w-[600px]">
      <CodeEditor code={{ code, type: 'js', editable: true }} setCode={setCode} />
      <div
        className="bg-black p-5 min-h-[350px] rounded m-4 text-sm relative bottom-0"
        contentEditable={false}
        spellCheck={false}
      >
        {output.length > 0 ? (
          <div className="font-monospace text-xs leading-loose text-white">
            {output.map((line) => {
              return <p key={line} dangerouslySetInnerHTML={{ __html: line }} />
            })}
          </div>
        ) : (
          <span className="text-zinc-400">
            Click on run to evaluate the code.
          </span>
        )}

        <div className="absolute right-4 top-4">
          {isRunning ? (
            <button
              type="button"
              onClick={handleStopEvaluation}
              contentEditable={false}
              className="text-xs bg-zinc-500 rounded px-3 py-2 flex items-center gap-1 text-white font-semibold hover:bg-zinc-600"
            >
              <Spinner
                weight="bold"
                color="#FFF"
                size={14}
                className="animate-spin"
              />
              Stop running
            </button>
          ) : (
            <button
              type="button"
              onClick={handleEvaluateCode}
              contentEditable={false}
              className="text-xs bg-emerald-500 rounded px-3 py-2 flex items-center gap-1 text-white font-semibold hover:bg-emerald-600"
            >
              <Lightning weight="bold" color="#FFF" size={14} />
              Run code
            </button>
          )}
        </div>
      </div>
    </div>
  )
}