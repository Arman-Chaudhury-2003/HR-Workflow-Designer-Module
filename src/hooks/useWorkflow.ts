import { create } from "zustand";
import type { Edge, Node } from "reactflow";
import type { WorkflowMeta, WorkflowNodeData } from "../types/workflow";

export interface WorkflowState {
  meta: WorkflowMeta;
  nodes: Node<WorkflowNodeData>[];
  edges: Edge[];
  selectedNodeId?: string;
  selectedEdgeId?: string;

  setMeta: (meta: Partial<WorkflowMeta>) => void;

  setNodes: (
    updater:
      | Node<WorkflowNodeData>[]
      | ((nodes: Node<WorkflowNodeData>[]) => Node<WorkflowNodeData>[])
  ) => void;

  setEdges: (updater: Edge[] | ((edges: Edge[]) => Edge[])) => void;

  addNode: (node: Node<WorkflowNodeData>) => void;

  deleteNode: (id: string) => void;
  deleteEdge: (id: string) => void;

  clearWorkflow: () => void;

  setSelectedNode: (id?: string) => void;
  setSelectedEdge: (id?: string) => void;

  updateNodeData: (id: string, data: Partial<WorkflowNodeData>) => void;
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  meta: {
    id: "workflow-1",
    name: "New HR Workflow",
    description: "",
  },
  nodes: [],
  edges: [],
  selectedNodeId: undefined,
  selectedEdgeId: undefined,

  setMeta: (meta) =>
    set((state) => ({
      meta: { ...state.meta, ...meta },
    })),

  setNodes: (updater) =>
    set((state) => ({
      nodes:
        typeof updater === "function"
          ? (
              updater as (
                nodes: Node<WorkflowNodeData>[]
              ) => Node<WorkflowNodeData>[]
            )(state.nodes)
          : updater,
    })),

  setEdges: (updater) =>
    set((state) => ({
      edges:
        typeof updater === "function"
          ? (updater as (edges: Edge[]) => Edge[])(state.edges)
          : updater,
    })),

  addNode: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),

  deleteNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== id),
      edges: state.edges.filter((e) => e.source !== id && e.target !== id),
      selectedNodeId:
        state.selectedNodeId === id ? undefined : state.selectedNodeId,
      // if an edge referencing this node was selected, clear it
      selectedEdgeId: state.edges.some(
        (e) =>
          e.id === state.selectedEdgeId && (e.source === id || e.target === id)
      )
        ? undefined
        : state.selectedEdgeId,
    })),

  deleteEdge: (id) =>
    set((state) => ({
      edges: state.edges.filter((e) => e.id !== id),
      selectedEdgeId:
        state.selectedEdgeId === id ? undefined : state.selectedEdgeId,
    })),

  clearWorkflow: () =>
    set({
      nodes: [],
      edges: [],
      selectedNodeId: undefined,
      selectedEdgeId: undefined,
    }),

  setSelectedNode: (id) =>
    set(() => ({
      selectedNodeId: id,
    })),

  setSelectedEdge: (id) =>
    set(() => ({
      selectedEdgeId: id,
    })),

  updateNodeData: (id, data) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: { ...(node.data ?? {}), ...data } as WorkflowNodeData,
            }
          : node
      ),
    })),
}));
