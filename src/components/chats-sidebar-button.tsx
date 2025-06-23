"use client";
import { redirect } from "next/dist/server/api-utils";
import { SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";
import { getChatContext } from "@/context/ChatContext";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function ChatSidebarButton(groupChat: {
  title: string;
  icon: string;
  chatid: string;
  isSelected: boolean;
}) {
  const router = useRouter();
  console.log("chatSidebarButton");
  return (
    <SidebarMenuItem key={groupChat.title}>
      {/* Do not use the "isActive" property built into shadcn */}
      <SidebarMenuButton onClick={() => router.push(`${groupChat.chatid}`)} variant={groupChat.isSelected ? "selected" : "default"}>
          <img src={`/assets/${groupChat.icon}`} className="w-4 h-4" />
          <span>{groupChat.title}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}