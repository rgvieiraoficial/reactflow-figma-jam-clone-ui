import { ReactFlowProvider } from "reactflow"

import { Flow } from './components/flow/Flow';

function App() {
  return (
    <div className='h-screen w-screen'>
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </div>
  )
}

export default App
