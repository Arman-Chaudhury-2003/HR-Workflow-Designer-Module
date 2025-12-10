import { Sidebar } from "./Sidebar";
import { RightPanel } from "./RightPanel";
import { WorkflowCanvas } from "../canvas/WorkflowCanvas";
import { TopBar } from "./TopBar";

export const AppLayout = () => {
  return (
    <div className="app-root">
      <TopBar />
      <div className="app-body">
        <Sidebar />
        <div className="app-canvas-wrapper"> //kiske baad kya aiga 
          <WorkflowCanvas />
        </div>
        <RightPanel />
      </div>
    </div>
  );
};
