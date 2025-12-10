import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";
import type { AutomatedNodeData } from "../../../types/workflow";

export const AutomatedNode = ({ data }: NodeProps<AutomatedNodeData>) => {
  return (
    <div className="node node-task">
      <div className="node-title">{data.label || "Automated Step"}</div>
      <div className="node-subtitle">
        {data.actionId || "Select automation"}
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
