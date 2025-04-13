"use client";

import { Message } from "@/app/types/chat";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === "assistant";

  return (
    <div
      className={cn(
        "flex w-full items-start gap-4 p-4",
        isBot ? "bg-muted/50" : "bg-background"
      )}
    >
      <Avatar className="h-8 w-8">
        <AvatarFallback>
          {isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <p className="text-sm font-medium">
          {isBot ? "AI Assistant" : "You"}
        </p>
        <ReactMarkdown>
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}