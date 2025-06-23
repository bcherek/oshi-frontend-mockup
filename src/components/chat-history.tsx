import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getGroupChatMessages, Message } from "@/api/get-from-database";
import { ChatMessage } from "./chat-message";

export function ChatHistory(props : {chatHistory : Message[] | null, myuserid: string | null}) {
  console.log("ChatHistory component");

  if (!props.chatHistory || !props.myuserid) {
    return <div />;
  }

  return (
    <>
        {props.chatHistory.map((message, index) => (
        <ChatMessage key={index} msg={message} isMe={props.myuserid === message.userid}/>
      ))}
    </>

  );
}