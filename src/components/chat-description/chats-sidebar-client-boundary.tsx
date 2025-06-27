'use client'
import { ChatListInfo } from "@/app/api/types";
import { ChatSidebarButton } from "../other-chats/chats-sidebar-button";


export function ChatsSidebarClientBoundary(props: {chatListInfos: ChatListInfo[], currID: string}) {
  //There's no serialization check on the inputs  
  // console.log("ChatsSidebarClientBoundary", chats);
    return (
    <>
      {props.chatListInfos.map((chatListInfo, index) => (
        <ChatSidebarButton
          info={chatListInfo}
          isSelected={chatListInfo.chatid == props.currID}
          key={index}
        />
      ))}
    </>
  );
}