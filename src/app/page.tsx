// Don't really understand the reasoning https://nextjs.org/docs/app/api-reference/directives/use-client 
// but this is required in order to do state management

// import { useState } from "react";
import {Chat} from "@/components/chat"; 
import { ChatProvider, getChatContext } from "@/context/ChatContext";
import {ChatsSidebar} from "@/components/chats-sidebar";
import { getMyGroupChats } from "@/api/get-from-database";
export default async function Home() {
  console.log("page.tsx");
  
  const chats = await getMyGroupChats();
  console.log("chats", chats);
  return (
    <ChatProvider>
      <div className="flex">
        <ChatsSidebar chats={chats}/>
        {/* <Chat /> */}
      </div>
    </ChatProvider>
  );

}
