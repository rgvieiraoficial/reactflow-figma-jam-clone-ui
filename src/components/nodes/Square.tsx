import { useCallback } from "react";
import { NodeProps, Handle, Position, NodeResizer, useReactFlow } from "reactflow";


export function Square({ id, selected }: NodeProps) {
  const { deleteElements } = useReactFlow();

  const removeSquareNode = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Delete') {
      deleteElements({ nodes: [{ id }] });
    }
  }, [id, deleteElements]);

  return (
    <div
      tabIndex={0} // Torna o div focável para que o evento de teclado funcione
      onKeyDown={removeSquareNode} // Adiciona o manipulador de eventos de teclado
      className="h-full w-full min-w-[200px] min-h-[200px] bg-violet-500 rounded"
    >
      <NodeResizer
        minWidth={200}
        minHeight={200}
        isVisible={selected}
        lineClassName="boder-blue-400"
        handleClassName="h-3 w-3 bg-white border-2 rounded border-blue-400"
      />
      <Handle
        id="left"
        type="source"
        position={Position.Left}
        className="-left-5 w-3 h-3 bg-blue-400/80"
      />
      <Handle
        id="right"
        type="source"
        position={Position.Right}
        className="-right-5 w-3 h-3 bg-blue-400/80"
      />
      <Handle
        id="top"
        type="source"
        position={Position.Top}
        className="-top-5 w-3 h-3 bg-blue-400/80"
      />
      <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        className="-bottom-5 w-3 h-3 bg-blue-400/80"
      />
    </div>
  );
}