'use client'
import { ChatSidebarButton } from "./chats-sidebar-button";


export function ChatsSidebarClientBoundary(chats: {props : {chatid:string, title: string, icon: string }[], currID: string}) {
  //There's no serialization check on the inputs  
  console.log("ChatsSidebarClientBoundary", chats);
    return (
    <>
      {chats.props.map((groupChat) => (
        <ChatSidebarButton
          key={groupChat.chatid}
          title={groupChat.title}
          icon={groupChat.icon}
          chatid={groupChat.chatid}
          isSelected={groupChat.chatid == chats.currID}
        />
      ))}
    </>
  );
}