import { ThemeProvider } from "@/hoc/theme/provider";
import Router from "@/router";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router />
    </ThemeProvider>
  );
}

export default App;
