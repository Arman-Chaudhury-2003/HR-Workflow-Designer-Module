import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useWorkflowStore } from "../../hooks/useWorkflow";
import { getAutomations } from "../../api/automations";
import type { AutomationAction, WorkflowNodeData } from "../../types/workflow";

type TextInputEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
type CheckboxEvent = ChangeEvent<HTMLInputElement>;

export const NodeFormPanel = () => {
  const nodes = useWorkflowStore((s) => s.nodes);
  const selectedNodeId = useWorkflowStore((s) => s.selectedNodeId);
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const deleteNode = useWorkflowStore((s) => s.deleteNode);
  const setSelectedNode = useWorkflowStore((s) => s.setSelectedNode);

  const [automations, setAutomations] = useState<AutomationAction[]>([]);

  useEffect(() => {
    getAutomations()
      .then(setAutomations)
      .catch(() => setAutomations([]));
  }, []);

  const node = nodes.find((n) => n.id === selectedNodeId);
  if (!node) {
    return (
      <section className="panel section">
        <h3>No node selected</h3>
        <p>Select a node on the canvas to configure it.</p>
      </section>
    );
  }

  const data = node.data as WorkflowNodeData;

  const handleChange = (field: string) => (e: TextInputEvent) => {
    const value =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;

    const payload = { [field]: value } as unknown as Partial<WorkflowNodeData>;
    updateNodeData(node.id, payload);
  };

  const handleCheckbox = (field: string) => (e: CheckboxEvent) => {
    const payload = {
      [field]: e.target.checked,
    } as unknown as Partial<WorkflowNodeData>;
    updateNodeData(node.id, payload);
  };

  const handleDelete = () => {
    deleteNode(node.id);
    setSelectedNode(undefined);
  };

  const renderFields = () => {
    switch (data.type) {
      case "start":
        return (
          <>
            <label className="field">
              Start title
              <input
                value={data.label || ""}
                onChange={handleChange("label")}
              />
            </label>
          </>
        );

      case "task":
        return (
          <>
            <label className="field">
              Title
              <input
                value={data.label || ""}
                onChange={handleChange("label")}
              />
            </label>
            <label className="field">
              Description
              <textarea
                value={data.description || ""}
                onChange={handleChange("description")}
              />
            </label>
            <label className="field">
              Assignee
              <input
                value={data.assignee || ""}
                onChange={handleChange("assignee")}
              />
            </label>
            <label className="field">
              Due date
              <input
                type="date"
                value={data.dueDate || ""}
                onChange={handleChange("dueDate")}
              />
            </label>
          </>
        );

      case "approval":
        return (
          <>
            <label className="field">
              Title
              <input
                value={data.label || ""}
                onChange={handleChange("label")}
              />
            </label>
            <label className="field">
              Approver role
              <input
                value={data.approverRole || ""}
                onChange={handleChange("approverRole")}
              />
            </label>
            <label className="field">
              Auto-approve threshold
              <input
                type="number"
                value={data.autoApproveThreshold ?? 0}
                onChange={handleChange("autoApproveThreshold")}
              />
            </label>
          </>
        );

      case "automated":
        return (
          <>
            <label className="field">
              Title
              <input
                value={data.label || ""}
                onChange={handleChange("label")}
              />
            </label>
            <label className="field">
              Action
              <select
                value={data.actionId || ""}
                onChange={(e) => {
                  const payload = {
                    actionId: e.target.value || undefined,
                    params: {},
                  } as unknown as Partial<WorkflowNodeData>;
                  updateNodeData(node.id, payload);
                }}
              >
                <option value="">Select action</option>
                {automations.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.label}
                  </option>
                ))}
              </select>
            </label>

            {data.actionId && (
              <>
                <h4 style={{ marginTop: "0.75rem" }}>Action parameters</h4>
                {automations
                  .find((a) => a.id === data.actionId)
                  ?.params.map((p) => (
                    <label key={p} className="field">
                      {p}
                      <input
                        value={(data.params && data.params[p]) || ""}
                        onChange={(e) => {
                          const newParams = {
                            ...(data.params || {}),
                            [p]: e.target.value,
                          };
                          const payload = {
                            params: newParams,
                          } as unknown as Partial<WorkflowNodeData>;
                          updateNodeData(node.id, payload);
                        }}
                      />
                    </label>
                  ))}
              </>
            )}
          </>
        );

      case "end":
        return (
          <>
            <label className="field">
              End message
              <input
                value={data.endMessage || ""}
                onChange={handleChange("endMessage")}
              />
            </label>
            <label className="field checkbox">
              <input
                type="checkbox"
                checked={data.summaryEnabled}
                onChange={handleCheckbox("summaryEnabled")}
              />
              Show summary at end
            </label>
          </>
        );

      default:
        return <p>Unsupported node type.</p>;
    }
  };

  return (
    <section className="panel section">
      <h3>Configure Node</h3>
      <p
        style={{
          fontSize: "0.8rem",
          color: "#6b7280",
          marginTop: 0,
          marginBottom: "0.5rem",
        }}
      >
        Type: <strong>{data.type}</strong>
      </p>
      <div className="form-fields">{renderFields()}</div>
      <button
        type="button"
        className="btn-danger"
        style={{ marginTop: "0.75rem" }}
        onClick={handleDelete}
      >
        Delete Node
      </button>
    </section>
  );
};
