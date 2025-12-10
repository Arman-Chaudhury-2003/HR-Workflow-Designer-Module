import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";
import type { ApprovalNodeData } from "../../../types/workflow";

export const ApprovalNode = ({ data }: NodeProps<ApprovalNodeData>) => {
  return (
    <div className="node node-task">
      <div className="node-title">{data.label || "Approval"}</div>
      <div className="node-subtitle">{data.approverRole || "Approver"}</div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
