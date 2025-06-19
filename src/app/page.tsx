// Don't really understand the reasoning https://nextjs.org/docs/app/api-reference/directives/use-client
// but this is required in order to do state management

// import { useState } from "react";
import { Chat } from "@/components/chat";
import { ChatsSidebar } from "@/components/chats-sidebar";
import { getGroupChatMessages, getMe, getMyGroupChats } from "@/api/get-from-database";
import { Message } from "@/api/get-from-database";

export default async function Home() {
  console.log("page.tsx");

  const chats = await getMyGroupChats();
  const me = await getMe();
  
  let chatHistory : Message[] | null = null;
  if (me && chats) {
    chatHistory = await getGroupChatMessages(me.userid,chats[0].chatid);
  }

  console.log("chats", chats);
  return (
        <div className="flex">
          <ChatsSidebar chats={chats} me={me}/>
          <Chat chatHistory={chatHistory}/>
        </div>
  );
}
