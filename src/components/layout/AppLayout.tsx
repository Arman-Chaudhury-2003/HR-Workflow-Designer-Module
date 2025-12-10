import { Sidebar } from "./Sidebar";
import { RightPanel } from "./RightPanel";
import { WorkflowCanvas } from "../canvas/WorkflowCanvas";
import { TopBar } from "./TopBar";
import { Footer } from "./Footer";

export const AppLayout = () => {
  return (
    <div className="app-root">
      <TopBar />
      <div className="app-body">
        <Sidebar />
        <div className="app-canvas-wrapper">
          <WorkflowCanvas />
        </div>
        <RightPanel />
      </div>
      <Footer />
    </div>
  );
};
