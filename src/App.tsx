import { WorkflowProvider } from "./context/WorkflowProvider";
import { AppLayout } from "./components/layout/AppLayout";
import "./index.css";

function App() {
  return (
    <WorkflowProvider>
      <AppLayout />
    </WorkflowProvider>
  );
}

export default App;
