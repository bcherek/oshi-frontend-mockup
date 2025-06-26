import { ChatMessage } from "@/components/chat/chat-message";
import { Message } from "@/api/get-from-database";

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