"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}


export function ChatInput({ onSend, disabled }: ChatInputProps) {


  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);


  useEffect(() => {
    textareaRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (input.trim()) {
          onSend(input);
          setInput("");
        }
      }
    }
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      if (textarea) {
        textarea.removeEventListener("keydown", handleKeyDown);
      }
    }
  }, [input])
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput("");
      textareaRef.current?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 p-4">
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about the image..."
        className="min-h-[60px] flex-1"
        disabled={disabled}
      />
      <Button type="submit" size="icon" disabled={disabled || !input.trim()}>
        <SendHorizontal className="h-4 w-4" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
}