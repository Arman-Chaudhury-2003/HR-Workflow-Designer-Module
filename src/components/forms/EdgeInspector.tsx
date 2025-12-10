
//edger opr when we select etc

import { useWorkflowStore } from "../../hooks/useWorkflow";

export const EdgeInspector = () => {
  const edges = useWorkflowStore((s) => s.edges);
  const nodes = useWorkflowStore((s) => s.nodes);
  const selectedEdgeId = useWorkflowStore((s) => s.selectedEdgeId);
  const deleteEdge = useWorkflowStore((s) => s.deleteEdge);
  const setSelectedEdge = useWorkflowStore((s) => s.setSelectedEdge);

  if (!selectedEdgeId) return null;

  const edge = edges.find((e) => e.id === selectedEdgeId);
  if (!edge) return null;

  const sourceLabel =
    nodes.find((n) => n.id === edge.source)?.data.label ?? edge.source;
  const targetLabel =
    nodes.find((n) => n.id === edge.target)?.data.label ?? edge.target;

  const handleDelete = () => {
    deleteEdge(edge.id);
    setSelectedEdge(undefined);
  };

  return (
    <section className="panel section">
      <h3>Connection</h3>
      <p style={{ fontSize: "0.8rem", color: "#6b7280" }}>
        {sourceLabel} <span style={{ opacity: 0.6 }}>→</span> {targetLabel}
      </p>
      <button
        type="button"
        className="btn-danger"
        style={{ marginTop: "0.5rem" }}
        onClick={handleDelete}
      >
        Delete Connection
      </button>
      <p
        style={{
          fontSize: "0.7rem",
          color: "#9ca3af",
          marginTop: "0.4rem",
        }}
      >
        
      </p>
    </section>
  );
};
