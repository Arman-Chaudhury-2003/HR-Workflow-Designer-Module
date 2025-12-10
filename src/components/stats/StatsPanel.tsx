import { useMemo } from "react";
import { useWorkflowStore } from "../../hooks/useWorkflow";

export const StatsPanel = () => {
  const nodes = useWorkflowStore((s) => s.nodes);
  const edges = useWorkflowStore((s) => s.edges);

  const stats = useMemo(() => {
    const totalNodes = nodes.length;
    const totalEdges = edges.length;

    const counts = {
      start: 0,
      task: 0,
      approval: 0,
      automated: 0,
      end: 0,
    };

    nodes.forEach((n) => {
      const t = n.data.type;
      if (t in counts) {
        //ts-expect-error runtime index
        counts[t]++;
      }
    });

    const avgOutDegree =
      totalNodes > 0 ? Number((totalEdges / totalNodes).toFixed(2)) : 0;

    return {
      totalNodes,
      totalEdges,
      ...counts,
      avgOutDegree,
    };
  }, [nodes, edges]);

  const maxNodeCount = Math.max(
    stats.task,
    stats.approval,
    stats.automated,
    stats.end,
    1
  );

  const barWidth = (count: number) =>
    `${Math.max(10, (count / maxNodeCount) * 100)}%`;

  return (
    <section className="panel section">
      <h3>Workflow Overview</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Nodes</div>
          <div className="stat-value">{stats.totalNodes}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Connections</div>
          <div className="stat-value">{stats.totalEdges}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg. Branching</div>
          <div className="stat-value">{stats.avgOutDegree}</div>
        </div>
      </div>

      <h4 className="stats-heading">By Type</h4>
      <div className="stat-row">
        <span>Tasks</span>
        <div className="stat-bar">
          <div
            className="stat-bar-fill stat-bar-task"
            style={{ width: barWidth(stats.task) }}
          />
        </div>
        <span className="stat-count">{stats.task}</span>
      </div>
      <div className="stat-row">
        <span>Approvals</span>
        <div className="stat-bar">
          <div
            className="stat-bar-fill stat-bar-approval"
            style={{ width: barWidth(stats.approval) }}
          />
        </div>
        <span className="stat-count">{stats.approval}</span>
      </div>
      <div className="stat-row">
        <span>Automations</span>
        <div className="stat-bar">
          <div
            className="stat-bar-fill stat-bar-automated"
            style={{ width: barWidth(stats.automated) }}
          />
        </div>
        <span className="stat-count">{stats.automated}</span>
      </div>
      <div className="stat-row">
        <span>End Nodes</span>
        <div className="stat-bar">
          <div
            className="stat-bar-fill stat-bar-end"
            style={{ width: barWidth(stats.end) }}
          />
        </div>
        <span className="stat-count">{stats.end}</span>
      </div>
    </section>
  );
};
