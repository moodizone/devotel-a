import { BrowserRouter, Route, Routes, Navigate } from "react-router";

import AppLayout from "@/layout";
import NotFound from "@/pages/not-found";
import { ROUTES } from "@/router/routes";
import FormsList from "@/pages/forms/list";
import FormDetails from "@/pages/forms/details";
import SubmissionDetails from "@/pages/submissions/details";
import SubmissionsList from "@/pages/submissions/list";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to={ROUTES.submissions.root} />} />
          <Route path={ROUTES.submissions.root} element={<SubmissionsList />} />
          <Route
            path={ROUTES.submissions.details}
            element={<SubmissionDetails />}
          />
          <Route path={ROUTES.forms.root} element={<FormsList />} />
          <Route path={ROUTES.forms.details} element={<FormDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
