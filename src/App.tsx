import { BrowserRouter, Routes, Route } from "react-router";

import AppLayout from "@/layout";
import { ThemeProvider } from "@/hoc/theme/provider";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<div>applications</div>} />
            <Route path="/:id" element={<div>app details</div>} />
            <Route path="/forms" element={<div>form</div>} />
            <Route path="/forms/:id" element={<div>forms details</div>} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
