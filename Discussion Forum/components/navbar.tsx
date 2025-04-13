"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MessageSquare, Search, User } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold flex items-center gap-2">
          <MessageSquare className="h-6 w-6" />
          Discussion Forum
        </Link>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          
          <ModeToggle />
          
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}