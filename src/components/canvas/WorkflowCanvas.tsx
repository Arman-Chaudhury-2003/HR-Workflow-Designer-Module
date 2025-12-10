//protek ta 
import React, { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type Edge,
  type EdgeMouseHandler,
  type Node,
  type NodeMouseHandler,
} from "reactflow";
import "reactflow/dist/style.css";

import { nodeTypes } from "./nodeTypes";
import { useWorkflowStore } from "../../hooks/useWorkflow";
import type { WorkflowNodeData } from "../../types/workflow";

export const WorkflowCanvas = () => { // canvas er sre nodes se
  const nodes = useWorkflowStore((s) => s.nodes);
  const edges = useWorkflowStore((s) => s.edges);
  const setNodes = useWorkflowStore((s) => s.setNodes);
  const setEdges = useWorkflowStore((s) => s.setEdges);
  const setSelectedNode = useWorkflowStore((s) => s.setSelectedNode);
  const setSelectedEdge = useWorkflowStore((s) => s.setSelectedEdge);

  const onNodesChange = useCallback(
    (changes: Parameters<typeof applyNodeChanges>[0]) => {
      setNodes((nds) =>
        applyNodeChanges(changes, nds as Node<WorkflowNodeData>[])
      );
    },
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: Parameters<typeof applyEdgeChanges>[0]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds as Edge[]));
    },
    [setEdges] // when we change
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds as Edge[]));
    },
    [setEdges]
  );
            // moose detection bsically 
  const onNodeClick: NodeMouseHandler = (_event, node) => {
    setSelectedNode(node.id);
    setSelectedEdge(undefined);
  };
//mouse detection kintu for edges
  const onEdgeClick: EdgeMouseHandler = (_event, edge) => {
    setSelectedEdge(edge.id);
    setSelectedNode(undefined);
  };

  return (
    <div className="canvas-root">
      <ReactFlow
        nodes={nodes as Node[]}
        edges={edges as Edge[]}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};
