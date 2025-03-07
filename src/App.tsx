import Router from "@/router";
import { ThemeProvider } from "@/hoc/theme/provider";
import { QueryProvider } from "@/hoc/queryClient/provider";

function App() {
  return (
    <QueryProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router />
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;
