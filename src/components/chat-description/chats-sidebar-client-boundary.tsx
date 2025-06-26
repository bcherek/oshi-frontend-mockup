'use client'
import { ChatListInfo, GroupChat } from "@/api/get-from-database";
import { ChatSidebarButton } from "../other-chats/chats-sidebar-button";


export function ChatsSidebarClientBoundary(props: {chatListInfos: ChatListInfo[], currID: string}) {
  //There's no serialization check on the inputs  
  // console.log("ChatsSidebarClientBoundary", chats);
    return (
    <>
    {/* We're passing a destructed GroupChat object because not all the information actually needs to get passed*/}
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