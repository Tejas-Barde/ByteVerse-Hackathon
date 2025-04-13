import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Discussions</h1>
        <Link href="/discussions/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Discussion
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {/* Discussion list will be added here */}
        <div className="p-8 text-center">
          <p className="text-muted-foreground">No discussions yet. Be the first to start one!</p>
        </div>
      </div>
    </div>
  );
}