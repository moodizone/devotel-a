import * as React from "react";
import { Link } from "react-router";

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
import { ROUTES } from "@/router/routes";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <ModeToggle />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Link to={ROUTES.forms.root}>{"Forms"}</Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <React.Suspense fallback={<Fallback />}>
                <Forms />
              </React.Suspense>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Link to={ROUTES.submissions.root}>{"Submissions"}</Link>
          </SidebarGroupLabel>
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
