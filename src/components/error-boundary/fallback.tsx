import { Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function Fallback(error: Error | null) {
  return (
    <div className="h-screen w-full flex justify-center items-center px-2">
      <Alert className="max-w-lg mx-auto flex flex-col">
        <Terminal className="h-4 w-4" />
        <AlertTitle>{error?.name}</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          {error?.message}
        </AlertDescription>
        <AlertDescription className="flex flex-col gap-4">
          <code
            className="bg-zinc-200 dark:bg-zinc-900 p-3 rounded"
            style={{ wordBreak: "break-all" }}
          >
            {error?.stack}
          </code>
          <Button
            className="w-full"
            onClick={() => {
              window.location.reload();
            }}
          >
            {"Refresh"}
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}

export default Fallback;
