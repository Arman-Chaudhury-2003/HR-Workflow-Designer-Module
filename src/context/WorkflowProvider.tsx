import type { ReactNode } from "react";

export const WorkflowProvider = ({ children }: { children: ReactNode }) => {
  // For now, Zustand already provides state globally.
  // If later we need React Context (e.g., theming), we can add it here.
  return <>{children}</>;
};
