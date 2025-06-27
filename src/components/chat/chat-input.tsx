'use client'

import { useState } from "react"
import { useParams } from 'next/navigation'

import { Textarea } from "@/components/ui/textarea"

export function ChatInput() {
  const [message, setMessage] = useState("");
  const params = useParams<{ userid: string; chatid: string }>();

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && message.trim() !== "") {
      e.preventDefault(); // prevent newline
      try {
        console.log("handleKeyDown");
        await fetch("/api/add-to-database", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userid: params.userid,
            chatid: params.chatid,
            message,
          }),
        });

        setMessage("");
        console.log("successful message sent?");
        
        //this just refreshes the page which is really stupid but womp womp?
        location.reload();
        
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  return (
    <Textarea
      className="text-[var(--send-message-text-color)]"
      placeholder="type something..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}