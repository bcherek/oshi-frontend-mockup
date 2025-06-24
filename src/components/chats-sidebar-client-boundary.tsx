'use client'
import { GroupChat } from "@/api/get-from-database";
import { ChatSidebarButton } from "./chats-sidebar-button";


export function ChatsSidebarClientBoundary(props: {groupChats: GroupChat[], currID: string}) {
  //There's no serialization check on the inputs  
  // console.log("ChatsSidebarClientBoundary", chats);
    return (
    <>
    {/* We're passing a destructed GroupChat object because not all the information actually needs to get passed*/}
      {props.groupChats.map((groupChat) => (
        <ChatSidebarButton
          key={groupChat.chatid}
          title={groupChat.title}
          icon={groupChat.icon}
          chatid={groupChat.chatid}
          isSelected={groupChat.chatid == props.currID}
          banner={groupChat.details["banner-image"]}
        />
      ))}
    </>
  );
}