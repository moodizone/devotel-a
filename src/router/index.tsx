import { BrowserRouter, Route, Routes } from "react-router";

import AppLayout from "@/layout";
import NotFound from "@/pages/not-found";
import { ROUTES } from "@/router/routes";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.home.root} element={<div>applications</div>} />
          <Route
            path={ROUTES.home.appDetails}
            element={<div>app details</div>}
          />
          ,
          <Route path={ROUTES.forms.root} element={<div>form</div>} />
          <Route
            path={ROUTES.forms.details}
            element={<div>forms details</div>}
          />
          ,
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
