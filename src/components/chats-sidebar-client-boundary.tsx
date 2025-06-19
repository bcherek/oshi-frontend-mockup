'use client'
import { ChatSidebarButton } from "./chats-sidebar-menu-button";


export function ChatsSidebarClientBoundary({chats}: {chats : {chatid:string, title: string, icon: string }[]}) {
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