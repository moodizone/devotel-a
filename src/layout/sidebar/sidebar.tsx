import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/layout/sidebar/toggle";
import Fallback from "@/layout/sidebar/fallback";
import Forms from "@/layout/sidebar/forms";
import Submissions from "@/layout/sidebar/submissions";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <ModeToggle />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{"Forms"}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <React.Suspense fallback={<Fallback />}>
                <Forms />
              </React.Suspense>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>{"Submissions"}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <React.Suspense fallback={<Fallback />}>
                <Submissions />
              </React.Suspense>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
