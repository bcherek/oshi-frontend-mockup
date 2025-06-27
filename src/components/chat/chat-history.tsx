import { ChatMessage } from "@/components/chat/chat-message";
import { Message } from "@/app/api/types";

export function ChatHistory(props : {chatHistory : Message[] | null, myuserid: string | null}) {
  console.log("ChatHistory component");

  if (!props.chatHistory || !props.myuserid) {
    return <div />;
  }

  return (
    <div className="w-full">
        {props.chatHistory.map((message, index) => (
        <ChatMessage key={index} msg={message} isMe={props.myuserid === message.userid}/>
      ))}
    </div>

  );
}