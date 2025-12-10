import type { Edge, Node } from "reactflow";
import type { SimulationResult, WorkflowNodeData } from "../types/workflow";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function simulateWorkflow(
  nodes: Node<WorkflowNodeData>[],
  edges: Edge[]
): Promise<SimulationResult> {
  await delay(250);

  const errors: string[] = [];
  const logs: string[] = [];

  if (!nodes.length) {
    return { ok: false, logs, errors: ["Workflow is empty"] };
  }

  const startNodes = nodes.filter((n) => n.data.type === "start");
  const endNodes = nodes.filter((n) => n.data.type === "end");

  if (startNodes.length === 0) {
    errors.push("Start node is missing.");
  } else if (startNodes.length > 1) {
    errors.push("Multiple Start nodes found. Only one is allowed.");
  }

  if (endNodes.length === 0) {
    errors.push("End node is missing.");
  }

  // pasapasi ja nodes thakbe detection
  const adjacency: Record<string, string[]> = {};
  nodes.forEach((n) => {
    adjacency[n.id] = [];
  });

  edges.forEach((e) => {
    if (e.source && e.target && adjacency[e.source]) {
      adjacency[e.source].push(e.target);
    }
  });

  // reach korte pabo ki? check --
  const visited = new Set<string>();
  const visiting = new Set<string>();
  const hasCycle = { value: false };

  const startId = startNodes[0]?.id;

  const dfs = (id: string) => {
    if (visiting.has(id)) {
      hasCycle.value = true;
      return;
    }
    if (visited.has(id)) return;

    visiting.add(id);
    visited.add(id);

    const neighbors = adjacency[id] || [];
    neighbors.forEach(dfs);

    visiting.delete(id);
  };

  if (startId) {
    dfs(startId);
  }

  if (hasCycle.value) {
    errors.push("Cycle detected in workflow graph.");
  }

  const unreachable = startId
    ? nodes.filter((n) => !visited.has(n.id)).map((n) => n.data.label || n.id) 
    : []; //per node reach

  if (startId && unreachable.length > 0) {
    errors.push(`Unreachable nodes from Start: ${unreachable.join(", ")}`); // joining it
  }

  if (errors.length > 0) {
    return {
      ok: false,
      logs,
      errors,
    };
  }

  // Jokhon amra depth nebo
  logs.push("Starting workflow simulation…");

  const describeNode = (node: Node<WorkflowNodeData>): string => {
    const d = node.data;
    switch (d.type) {
      case "start":
        return `Start → ${d.label}`;
      case "task":
        return `Task → ${d.label} (Assignee: ${d.assignee || "Unassigned"})`;
      case "approval":
        return `Approval → ${d.label} (Role: ${d.approverRole})`;
      case "automated":
        return `Automated Step → ${d.label} (Action: ${
          d.actionId || "Not selected"
        })`;
      case "end":
        return `End → ${d.endMessage || d.label}`;
    }
  }; // sare conditions 

  const ordered: string[] = [];
  const dfsLog = (id: string) => {
    if (!adjacency[id]) return;
    if (ordered.includes(id)) return;
    ordered.push(id);
    adjacency[id].forEach(dfsLog);
  };

  if (startId) {
    dfsLog(startId);
  }

  ordered.forEach((id, idx) => {
    const node = nodes.find((n) => n.id === id);
    if (!node) return;
    logs.push(`Step ${idx + 1}: ${describeNode(node)}`);
  });

  logs.push(
    `Simulation completed. Nodes: ${nodes.length}, Edges: ${edges.length}.`
  );

  return {
    ok: true,
    logs,
  };
}
