import { useCallback, useEffect } from 'react';
import ReactFlow, { Background, Controls, Node, ConnectionMode, useEdgesState, Connection, addEdge, useNodesState, useReactFlow, Panel } from 'reactflow';
import * as Toolbar from '@radix-ui/react-toolbar';
import { zinc } from 'tailwindcss/colors';

import 'reactflow/dist/style.css';

import { Square } from '../nodes/Square';
import Default from '../edges/Default';

const FLOW_KEY = 'figma-jam-flow';

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

export function Flow() {
  const flowInstance = useReactFlow();

  const { setViewport } = useReactFlow();

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  const onConnect = useCallback((connection: Connection) => {
    return setEdges(edges => addEdge(connection, edges));
  }, [setEdges]);

  function saveFlow() {
    const flow = flowInstance.toObject();

    localStorage.setItem(FLOW_KEY, JSON.stringify(flow));
  }

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

  useEffect(() => {
    const flowExists = localStorage.getItem(FLOW_KEY);

    if (flowExists) {
      const flow = JSON.parse(flowExists);

      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      setViewport({ x, y, zoom });
    } else {
      setNodes(INITIAL_NODES);
    }
  }, [setNodes, setEdges, setViewport])

  return (
    <>
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
        <Panel position="top-right">
          <button
            onClick={saveFlow}
            className='text-sm p-2 text-white bg-blue-500 rounded'
          >
            Salvar
          </button>
        </Panel>
      </ReactFlow>
      <Toolbar.Root
        className='fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 h-20 w-96 overflow-hidden'
      >
        <Toolbar.Button
          onClick={addSquareNode}
          className='w-32 h-32 mt-6 bg-violet-500 rounded transition-transform hover:-translate-y-2'
        />
      </Toolbar.Root>
    </>
  );
}