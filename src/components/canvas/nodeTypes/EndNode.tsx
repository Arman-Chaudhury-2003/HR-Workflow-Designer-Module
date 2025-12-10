//ending
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";
import type { EndNodeData } from "../../../types/workflow";

export const EndNode = ({ data }: NodeProps<EndNodeData>) => {
  return (
    <div className="node node-start">
      <div className="node-title">{data.label || "End"}</div>
      <Handle type="target" position={Position.Top} />
    </div>
  );
};
