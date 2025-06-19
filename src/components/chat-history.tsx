import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getGroupChatMessages, Message } from "@/api/get-from-database";
import { ChatMessage } from "./chat-message";

export function ChatHistory({chatHistory} : {chatHistory : Message[] | null}) {
  console.log("ChatHistory component");

  if (!chatHistory) {
    return <div />;
  }

  return (
    <ScrollArea className="flex h-max">
      {chatHistory.map((message, index) => (
        <ChatMessage key={index} {...message} />
      ))}
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}