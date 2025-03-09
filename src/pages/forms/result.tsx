import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PropsType {
  data: unknown;
  open: boolean;
  onOpenChange(open: boolean): void;
}

function Result({ data, open, onOpenChange }: PropsType) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{"Form data"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <pre className="mt-2 rounded-md p-2 dark:bg-zinc-800 bg-zinc-200 ">
            <code className="dark:text-white whitespace-pre-wrap">
              {JSON.stringify(data, null, 2)}
            </code>
          </pre>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => onOpenChange(false)}>
            {"Close"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Result;
