import { Message } from "@/app/api/types";
import { ChatHistory } from "@/components/chat/chat-history";

export async function Chat(props : {chatHistory : Message[] | null, myuserid : string | null}) {
  console.log("chat function");
    
  return (
    <ChatHistory chatHistory={props.chatHistory} myuserid={props.myuserid}/>
  );
}
