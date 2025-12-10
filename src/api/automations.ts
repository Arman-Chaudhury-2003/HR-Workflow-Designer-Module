import type { AutomationAction } from "../types/workflow";

const MOCK_AUTOMATIONS: AutomationAction[] = [
  { id: "send_email", label: "Send Email", params: ["to", "subject"] },
  {
    id: "generate_doc",
    label: "Generate Document",
    params: ["template", "recipient"],
  },
];

export async function getAutomations(): Promise<AutomationAction[]> {
  // achon er jonno 
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_AUTOMATIONS;
}
