# HR Workflow Designer (Prototype)

A visual workflow designer for HR processes, built with **React**, **TypeScript**, **React Flow**, and **Zustand**.

The app lets an HR admin design a workflow using drag-and-drop style nodes (Start, Task, Approval, Automated Step, End), configure each step from a right-side panel, and run a mock simulation to validate the flow.

---

## Features

### Canvas & Nodes

- Interactive canvas powered by **React Flow**
- Custom node types:
  - **Start** – entry point of the workflow
  - **Task** – human task with description, assignee, and due date
  - **Approval** – role-based approval with auto-approve threshold
  - **Automated Step** – invokes a mock automation (e.g., “Send Email”)
  - **End** – workflow completion with final message
- Click-to-add palette:
  - Add nodes from the left sidebar with sensible defaults
  - Enforces **single Start node** per workflow

### Node & Edge Management

- Select a node to configure it in the right-side panel
- Edit titles, descriptions, assignees, due dates, approval thresholds, etc.
- Configure automated steps:
  - Fetches available actions from a mock `/automations` endpoint
  - Dynamically shows required parameters for the chosen action
- Delete:
  - **Delete Node** button in node inspector (removes node + connected edges)
  - **Delete Connection** button in edge inspector
- Clear canvas:
  - **Clear Canvas** button in top bar removes all nodes and edges

### Simulation / Validation

- “Run Simulation” sandbox:
  - Serializes the current graph
  - Validates:
    - At least one **Start** and one **End**
    - At most one **Start**
    - No cycles in the graph
    - All nodes reachable from Start
  - Returns a simple “execution log” in DFS order:
    - e.g. `Step 3: Task → Collect Documents (Assignee: HR Ops)`
- Displays success / error status and lists validation errors clearly

### Overview / Stats Panel

- Right-side **Workflow Overview** panel (dashboard-style):
  - Total nodes
  - Total connections
  - Average branching factor
  - Horizontal “mini-graph” bars for:
    - Tasks
    - Approvals
    - Automations
    - End nodes

### UI / UX

- Modern, SaaS-style UI:
  - **Inter** typography
  - Rounded, card-style nodes and panels
  - Subtle shadows and gradients
  - Light grid canvas background
- Three-column layout:
  - Left: Node palette
  - Center: Canvas
  - Right: Inspector, stats, simulator
- Designed to be easily deployable (e.g., on **Vercel**)

---

## Tech Stack

- **React** (Vite + TypeScript)
- **React Flow** – canvas, nodes, edges
- **Zustand** – global workflow state
- No real backend – mock APIs implemented as local async functions

---

## Getting Started

```bash
# install dependencies
npm install

# start dev server
npm run dev
```

src/
api/
automations.ts # mock GET /automations
simulate.ts # mock POST /simulate (validation + logs)
components/
canvas/
WorkflowCanvas.tsx
nodeTypes/
StartNode.tsx
TaskNode.tsx
ApprovalNode.tsx
AutomatedNode.tsx
EndNode.tsx
index.ts
forms/
NodeFormPanel.tsx # node configuration form
EdgeInspector.tsx # edge/connection inspector
layout/
AppLayout.tsx
Sidebar.tsx # node palette + add buttons
RightPanel.tsx
TopBar.tsx
simulator/
SimulationPanel.tsx
stats/
StatsPanel.tsx # “mini graphs” / metrics
context/
WorkflowProvider.tsx
hooks/
useWorkflow.ts # Zustand store (nodes, edges, selection)
types/
workflow.ts # Node & automation type definitions
App.tsx
main.tsx
index.css # visual theme & layout

Architecture & Design Decisions
State Management

All workflow state is centralized in a Zustand store (useWorkflow.ts):

nodes: Node<WorkflowNodeData>[]

edges: Edge[]

selectedNodeId, selectedEdgeId

actions:

setNodes, setEdges (functional updates, React Flow-friendly)
addNode, deleteNode, deleteEdge, clearWorkflow
setSelectedNode, setSelectedEdge
updateNodeData

Using Zustand keeps the React Flow integration simple and avoids prop-drilling.
Each component subscribes only to the slices it needs (e.g. nodes, edges, or selection IDs).

Nodes share a common base and extend it per type: type NodeType = "start" | "task" | "approval" | "automated" | "end";

interface BaseNodeData {
id: string;
type: NodeType;
label: string;
}

Each node type adds its own configuration:

TaskNodeData – description, assignee, dueDate, customFields

ApprovalNodeData – approverRole, autoApproveThreshold

AutomatedNodeData – actionId, params

EndNodeData – endMessage, summaryEnabled

The Sidebar builds nodes via a small createNode(type) factory, so defaults are centralized and easy to evolve.

Node Configuration

NodeFormPanel:

Determines the active node from selectedNodeId

Switches on data.type and renders a tailored form:

Start: label

Task: label, description, assignee, due date

Approval: label, approver role, threshold

Automated:

label

select from automations list

dynamic parameter inputs based on chosen action

End: message + boolean “summaryEnabled”

Updates are applied via updateNodeData(nodeId, partialData), which merges into the existing node data, so the form stays decoupled from the canvas.

Mock API Layer

api/automations.ts:

Mimics GET /automations

Returns a small set of automation actions with parameter names:

e.g. send_email → ["to", "subject"]

api/simulate.ts:

Mimics POST /simulate

Accepts nodes and edges

Performs validation:

0 / >1 Start nodes

0 End nodes

Graph cycles (DFS with visiting set)

Unreachable nodes from Start

On success:

Runs a DFS from Start to create an ordered sequence

Emits human-readable log lines per node type

This mocks the feel of a backend engine without adding network complexity.

How to Use

Add nodes
Use the left sidebar buttons (+ Start, + Task, + Approval, + Automated, + End).

Position & connect
Drag nodes around and connect outputs to targets using the React Flow handles.

Configure nodes
Click a node → edit its fields in Configure Node panel.

Inspect connections
Click an edge → see source/target labels in Connection panel → delete if needed.

Simulate
Open Workflow Sandbox → click Run Simulation:

If invalid, errors are listed.

If valid, you get an ordered execution log.

Clear everything
Use Clear Canvas in the top bar.

Limitations & Possible Extensions

If I had more time, I would extend the prototype with:

Drag-and-drop from sidebar instead of click-to-add

Node templates / presets for common HR flows (Onboarding, Exit, Leave Request)

Inline validation badges on nodes (e.g., missing assignee, missing automation params)

Undo/redo history

Persistent storage (saving / loading workflows)

More visual edge styles (conditional branches, labels, etc.)

Real backend integration for simulate and automations
