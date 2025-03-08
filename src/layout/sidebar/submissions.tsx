import { Link, useLocation, useParams } from "react-router";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useGerSubmissions } from "@/hooks/queries";
import { ROUTES } from "@/router/routes";

function Submissions() {
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const { data } = useGerSubmissions();

  //================================
  // Render
  //================================
  return data?.data?.map(({ id: si }) => {
    const url = ROUTES.submissions.details.replace(":id", si);
    const isActive =
      id && pathname === ROUTES.submissions.details.replace(id, si);
    return (
      <SidebarMenuItem key={si}>
        <SidebarMenuButton asChild isActive={Boolean(isActive)}>
          <Link to={url}>{si}</Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  });
}

export default Submissions;
