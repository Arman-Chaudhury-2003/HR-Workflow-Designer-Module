import { NodeFormPanel } from "../forms/NodeFormPanel";
import { EdgeInspector } from "../forms/EdgeInspector";
import { SimulationPanel } from "../simulator/SimulationPanel";
import { StatsPanel } from "../stats/StatsPanel";

export const RightPanel = () => {
  return (
    <aside className="right-panel">
      <StatsPanel />
      <NodeFormPanel />
      <EdgeInspector />
      <SimulationPanel />
    </aside>
  );
};
