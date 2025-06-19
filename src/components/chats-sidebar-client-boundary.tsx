'use client'
import { ChatSidebarButton } from "./chats-sidebar-menu-button";


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
        />
      ))}
    </>
  );
}