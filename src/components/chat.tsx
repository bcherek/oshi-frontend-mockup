import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChatInput } from "@/components/chat-input";
import { Message } from "@/api/get-from-database";
import { ChatHistory } from "@/components/chat-history";
import { getChatContext } from "@/context/ChatContext";

export async function Chat({chatHistory} : {chatHistory : Message[] | null}) {
  console.log("chat function");
    
  return (
    <div className="flex flex-col h-screen justify-between space-y-4 p-4">      
      <div className="overflow-y-auto">
        <ChatHistory chatHistory={chatHistory}/>
      </div>
      {/* Not sure why we need to use overflow-y-auto here; chatHistoryObj is a Scrollable from shadcn. */}
      <div>
        <ChatInput />
      </div>
    </div>
  );
}
