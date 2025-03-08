import * as React from "react";
import { Link, Outlet, useLocation } from "react-router";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { AppSidebar } from "@/layout/sidebar/sidebar";
import { endLoadingState } from "@/utils/spinner";
import Fallback from "@/layout/fallback";

function AppLayout() {
  //================================
  // Init
  //================================
  const { pathname } = useLocation();
  // remove an extra ""
  const segments = pathname.split("/").filter((segment) => segment !== "");

  //================================
  // Subcomponents
  //================================
  const breadcrumbs = segments.map((b, i) => {
    const link = `/${segments.slice(0, i + 1).join("/")}`;

    // last segment (non-clickable)
    if (i === segments.length - 1) {
      return (
        <BreadcrumbItem className="capitalize" key={i}>
          <BreadcrumbPage>{b}</BreadcrumbPage>
        </BreadcrumbItem>
      );
    }

    // other segments with an extra separator
    return (
      <React.Fragment key={i}>
        <BreadcrumbItem className="hidden md:block capitalize">
          <BreadcrumbLink asChild>
            <Link to={link}>{b}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
      </React.Fragment>
    );
  });

  //================================
  // Handlers
  //================================
  // remove html spinner once react loaded
  React.useEffect(() => {
    endLoadingState();
  }, []);

  //================================
  // Render
  //================================
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>{breadcrumbs}</BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <React.Suspense fallback={<Fallback />}>
            <Outlet />
          </React.Suspense>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AppLayout;
