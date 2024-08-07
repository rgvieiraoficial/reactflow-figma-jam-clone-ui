import { useCallback } from 'react';
import ReactFlow, { Background, Controls, Node, ConnectionMode, useEdgesState, Connection, addEdge, useNodesState, ReactFlowProvider } from 'reactflow';
import * as Toolbar from '@radix-ui/react-toolbar';
import { zinc } from 'tailwindcss/colors';

import 'reactflow/dist/style.css';

import { Square } from './components/nodes/Square';
import Default from './components/edges/Default';

const NODE_TYPES = {
  square: Square,
}

const EDGE_TYPES = {
  default: Default,
}

const INITIAL_NODES = [
  {
    id: crypto.randomUUID(),
    type: 'square',
    position: {
      x: 200,
      y: 400,
    },
    data: {}
  },
  {
    id: crypto.randomUUID(),
    type: 'square',
    position: {
      x: 1000,
      y: 400,
    },
    data: {}
  }
] satisfies Node[];

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);

  const onConnect = useCallback((connection: Connection) => {
    return setEdges(edges => addEdge(connection, edges));
  }, [setEdges]);

  function addSquareNode() {
    setNodes(nodes => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: 'square',
        position: {
          x: 750,
          y: 350,
        },
        data: {}
      }
    ]);
  }

  return (
    <div className='h-screen w-screen'>
      <ReactFlowProvider>
        <ReactFlow
          nodeTypes={NODE_TYPES}
          edgeTypes={EDGE_TYPES}
          defaultEdgeOptions={
            {
              type: 'default'
            }
          }
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          connectionMode={ConnectionMode.Loose}
          fitView
        >
          <Background
            gap={12}
            size={2}
            color={zinc[200]}
          />
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>

      <Toolbar.Root
        className='fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 h-20 w-96 overflow-hidden'
      >
        <Toolbar.Button
          onClick={addSquareNode}
          className='w-32 h-32 mt-6 bg-violet-500 rounded transition-transform hover:-translate-y-2'
        />
      </Toolbar.Root>
    </div>
  )
}

export default App
