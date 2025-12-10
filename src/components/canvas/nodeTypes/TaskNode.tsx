import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";
import type { TaskNodeData } from "../../../types/workflow";

export const TaskNode = ({ data }: NodeProps<TaskNodeData>) => {
  return (
    <div className="node node-task">
      <div className="node-title">{data.label || "Task"}</div>
      <div className="node-subtitle">{data.assignee || "Unassigned"}</div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
