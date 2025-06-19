'use client';
import { SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";
import { getChatContext } from "@/context/ChatContext";

export function ChatSidebarButton(groupChat: { title: string, icon: string, chatid: string }) {
  console.log("chatSidebarButton");  
  return (
     <SidebarMenuItem key={groupChat.title}>
                  <SidebarMenuButton asChild>
                    <button onClick={() => console.log("Switching to chat", groupChat.chatid)}>
                      {/* This is happening in the client! */}
                      <img
                        src={`/assets/${groupChat.icon}`}
                        className="w-4 h-4"
                      />
                      <span>{groupChat.title}</span>
                    </button>
                  </SidebarMenuButton>
        </SidebarMenuItem>);
}