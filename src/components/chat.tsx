import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChatInput } from "@/components/chat-input";
import { Message } from "@/api/get-from-database";
import { ChatHistory } from "@/components/chat-history";
import { getChatContext } from "@/context/ChatContext";

export async function Chat(props : {chatHistory : Message[] | null, myuserid : string | null}) {
  console.log("chat function");
    
  return (
    <ChatHistory chatHistory={props.chatHistory} myuserid={props.myuserid}/>
  );
}
