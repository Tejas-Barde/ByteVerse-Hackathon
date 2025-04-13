"use client";

import { ChatInput } from "@/app/components/chat/ChatInput";
import { ChatMessage } from "@/app/components/chat/ChatMessage";
import { ImageUpload } from "@/app/components/ImageUpload";
import { ChatState, Message } from "@/app/types/chat";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Brain } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    image: null,
    isLoading: false,
    error: null,
  });

  const handleImageUpload = (image: string) => {
    setState((prev) => ({ ...prev, image }));
  };

  const handleSendMessage = async (content: string) => {
    if (!state.image) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: Date.now(),
    };

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          context: state.image,
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.response,
        timestamp: Date.now(),
      };

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Failed to get response. Please try again.",
      }));
    }
  };

  return (
    <main className="container mx-auto flex min-h-screen flex-col gap-4 p-4 lg:p-8">
      <div className="flex items-center gap-2">
        <Brain className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold">AI Vision Chat</h1>
      </div>
      <div className="grid flex-1 gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <ImageUpload
            onImageUpload={handleImageUpload}
            isLoading={state.isLoading}
          />
          {state.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}
        </div>
        <Card className="flex flex-col h-[85vh]">
          <ScrollArea className="flex-1 overflow-y-scroll">
            {state.messages.length === 0 ? (
              <div className="flex h-full items-center justify-center p-8 text-center text-muted-foreground">
                <p>
                  Upload an image and start asking questions about it. I'll help
                  you understand what's in the image.
                </p>
              </div>
            ) : (
              state.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))
            )}
          </ScrollArea>
          <Separator />
          <ChatInput
            onSend={handleSendMessage}
            disabled={!state.image || state.isLoading}
          />
        </Card>
      </div>
    </main>
  );
}