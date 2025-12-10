import type { Node } from "reactflow";
import { useWorkflowStore } from "../../hooks/useWorkflow";
import type { NodeType, WorkflowNodeData } from "../../types/workflow";

const createNode = (
  type: NodeType,
  index: number
): Node<WorkflowNodeData> => {
  const id = `${type}-${Date.now()}-${index}`;
  const base = {
    id,
    type,
    position: { x: 100 + index * 40, y: 80 + index * 40 },
    data: {} as WorkflowNodeData,
  } as Node<WorkflowNodeData>;

  switch (type) {
    case "start":
      base.data = {
        id,
        type: "start",
        label: "Start",
        metadata: {},
      };
      break;
    case "task":
      base.data = {
        id,
        type: "task",
        label: "Task",
        description: "",
        assignee: "",
        dueDate: "",
        customFields: {},
      };
      break;
    case "approval":
      base.data = {
        id,
        type: "approval",
        label: "Approval",
        approverRole: "Manager",
        autoApproveThreshold: 0,
      };
      break;
    case "automated":
      base.data = {
        id,
        type: "automated",
        label: "Automated Step",
        actionId: undefined,
        params: {},
      };
      break;
    case "end":
      base.data = {
        id,
        type: "end",
        label: "End",
        endMessage: "Workflow completed",
        summaryEnabled: true,
      };
      break;
  }

  return base;
};

export const Sidebar = () => {
  const nodes = useWorkflowStore((s) => s.nodes);
  const nodesCount = nodes.length;
  const addNode = useWorkflowStore((s) => s.addNode);

  const handleAdd = (type: NodeType) => {
    if (type === "start") {
      const hasStart = nodes.some((n) => n.data.type === "start");
      if (hasStart) {
        // simple UX; you can later swap to toast
        alert("Workflow already has a Start node.");
        return;
      }
    }

    const node = createNode(type, nodesCount);
    addNode(node);
  };

  return (
    <aside className="sidebar">
      <h3>Node Palette</h3>
      <p style={{ fontSize: "0.8rem", color: "#6b7280" }}>
        Click to add nodes to the canvas:
      </p>
      <div className="sidebar-buttons">
        <button onClick={() => handleAdd("start")}>+ Start</button>
        <button onClick={() => handleAdd("task")}>+ Task</button>
        <button onClick={() => handleAdd("approval")}>+ Approval</button>
        <button onClick={() => handleAdd("automated")}>+ Automated</button>
        <button onClick={() => handleAdd("end")}>+ End</button>
      </div>
    </aside>
  );
};
