//simnulation reader
import { useState } from "react";
import { useWorkflowStore } from "../../hooks/useWorkflow";
import { simulateWorkflow } from "../../api/simulate";

export const SimulationPanel = () => {
  const nodes = useWorkflowStore((s) => s.nodes);
  const edges = useWorkflowStore((s) => s.edges);

  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[] | undefined>();
  const [ok, setOk] = useState<boolean | null>(null);

  const handleRun = async () => {
    setLoading(true);
    const result = await simulateWorkflow(nodes, edges);
    setLoading(false);
    setLogs(result.logs);
    setErrors(result.errors);
    setOk(result.ok);
  };

  return (
    <section className="panel section">
      <h3>Workflow Sandbox</h3>
      <button onClick={handleRun} disabled={loading}>
        {loading ? "Simulating..." : "Run Simulation"}
      </button>

      {ok === true && (
        <p
          style={{ color: "#16a34a", fontSize: "0.8rem", marginTop: "0.5rem" }}
        >
          Simulation succeeded.
        </p>
      )}
      {ok === false && (
        <p
          style={{ color: "#b91c1c", fontSize: "0.8rem", marginTop: "0.5rem" }}
        >
          Simulation failed. See errors below.
        </p>
      )}

      {errors && errors.length > 0 && (
        <div className="errors">
          {errors.map((e) => (
            <div key={e}>{e}</div>
          ))}
        </div>
      )}

      {logs.length > 0 && (
        <ol className="logs">
          {logs.map((log, i) => (
            <li key={i}>{log}</li>
          ))}
        </ol>
      )}
    </section>
  );
};
