import  { Handle, Position } from "reactflow";
import type {NodeProps} from "reactflow";
import type { StartNodeData } from "../../../types/workflow";

export const StartNode = ({ data }: NodeProps<StartNodeData>) => {
  return (
    <div className="node node-start">
      <div className="node-title">{data.label || "Start"}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};


