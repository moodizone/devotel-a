import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/hoc/queryClient/index";

export function QueryProvider({ children }: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
