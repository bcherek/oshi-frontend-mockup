'use client'
import { useContext } from "react";
import { ChatSidebarButton } from "./chats-sidebar-button";


export function ChatsSidebarClientBoundary({chats}: {chats : {chatid:string, title: string, icon: string }[]}) {
  //There's no serialization check on the inputs  
  console.log("ChatsSidebarClientBoundary", chats);
    return (
    <>
      {chats.map((groupChat) => (
        <ChatSidebarButton
          key={groupChat.chatid}
          title={groupChat.title}
          icon={groupChat.icon}
          chatid={groupChat.chatid}
        />
      ))}
    </>
  );
}