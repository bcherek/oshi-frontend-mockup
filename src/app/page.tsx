'use client'

// Don't really understand the reasoning https://nextjs.org/docs/app/api-reference/directives/use-client 
// but this is required in order to do state management

// import { useState } from "react";
import {Chat} from "@/components/chat"; 
import { ChatProvider, getChatContext } from "@/context/ChatContext";
import ChatsSidebar from "@/components/chats-sidebar";
export default function Home() {

  return (
    <ChatProvider>
      <div className="flex">
        <ChatsSidebar />
        <Chat />
      </div>
    </ChatProvider>
  );

}
