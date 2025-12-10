import { useWorkflowStore } from "../../hooks/useWorkflow";

export const TopBar = () => {
  const name = useWorkflowStore((s) => s.meta.name);
  const clearWorkflow = useWorkflowStore((s) => s.clearWorkflow);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1>{name}</h1>
        <span className="subtitle">HR Workflow Designer</span>
      </div>
      <div className="topbar-actions">
        <button
          type="button"
          className="btn-danger"
          onClick={clearWorkflow}
        >
          Clear Canvas
        </button>
      </div>
    </header>
  );
};
