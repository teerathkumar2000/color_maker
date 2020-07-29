import React from 'react'
import chroma from 'chroma-js'
import { ObjectInspector } from 'react-inspector'
import AceEditor from 'react-ace'
import { observer } from 'mobx-react'
import { toast } from 'react-toastify'
import 'brace/mode/javascript'
import 'brace/theme/pastel_on_dark'

class Settings extends React.Component {
  componentDidMount = () => {
    this.props.store.hideUI()
    this.props.store.lockUIHidden()
  }

  render() {
    const store = this.props.store
    return (
      <div className="settings">
        <h3>Settings</h3>
        <h4>Output</h4>
        <div>
          <code>function output(chroma, store){' {'} </code>
          <AceEditor
            height="auto"
            mode="javascript"
            theme="pastel_on_dark"
            name="settings-code-output-editor"
            width={'100%'}
            minLines={2}
            maxLines={64}
            onChange={code => store.setOutputCode(code)}
            fontSize={14}
            showPrintMargin={false}
            showGutter={false}
            highlightActiveLine
            value={store.outputCode}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2
            }}
          />
          <code>{'}'} </code>
        </div>
        <div>
          <br />
          <h4>Example</h4>
          <code style={{ wordBreak: 'break-all' }}>
            {(() => {
              let codeBeforeEval = '((chroma, store) => {'
              codeBeforeEval += store.outputCode + '})'
              try {
                const builtFunction = eval(codeBeforeEval)
                const result = builtFunction(chroma, store)
                return result
              } catch (err) {
                return err.toString()
              }
            })()}
          </code>
        </div>
        <br />
        <div>
          <h4>
            Application State{' '}
            <button
              onPointerUp={() => {
                toast('Reset all gradients', { position: 'bottom-right' })
                store.reset()
              }}
            >
              Reset
            </button>
          </h4>
          <ObjectInspector theme="chromeDark" data={store.toJSON()} />
        </div>
      </div>
    )
  }
}

export default observer(Settings)
