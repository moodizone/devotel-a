import * as React from "react";

import { SidebarMenuItem } from "@/components/ui/sidebar";

function Fallback() {
  return (
    <React.Fragment>
      <SidebarMenuItem>
        <div className="h-4 mb-2 rounded-xl bg-muted/50" />
      </SidebarMenuItem>
      <SidebarMenuItem>
        <div className="h-4 mb-2 rounded-xl bg-muted/50" />
      </SidebarMenuItem>
      <SidebarMenuItem>
        <div className="h-4 mb-2 rounded-xl bg-muted/50" />
      </SidebarMenuItem>
    </React.Fragment>
  );
}

export default Fallback;
