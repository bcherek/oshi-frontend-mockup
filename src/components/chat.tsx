import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChatInput } from "@/components/chat-input";
import { Message } from "@/api/get-from-database";
import { ChatHistory } from "@/components/chat-history";
import { getChatContext } from "@/context/ChatContext";

export async function Chat(props : {chatHistory : Message[] | null, myuserid : string | null}) {
  console.log("chat function");
    
  return (
    <div className="flex flex-col flex-grow h-screen justify-between space-y-4 p-4">      
      {/* Not sure why we need to use overflow-y-auto here; chatHistoryObj is a Scrollable from shadcn. */}
      <div className="overflow-y-auto">
        <ChatHistory chatHistory={props.chatHistory} myuserid={props.myuserid}/>
      </div>
      <div>
        <ChatInput />
      </div>
    </div>
  );
}
