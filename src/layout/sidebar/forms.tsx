import { Link, useLocation, useParams } from "react-router";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useGetForms } from "@/hooks/queries";
import { ROUTES } from "@/router/routes";

function Forms() {
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const { data } = useGetForms();

  //================================
  // Render
  //================================
  return data?.map(({ formId, title }) => {
    const url = ROUTES.forms.details.replace(":id", formId);
    const isActive =
      id && pathname === ROUTES.forms.details.replace(id, formId);

    return (
      <SidebarMenuItem key={formId}>
        <SidebarMenuButton asChild isActive={Boolean(isActive)}>
          <Link to={url}>{title}</Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  });
}

export default Forms;
