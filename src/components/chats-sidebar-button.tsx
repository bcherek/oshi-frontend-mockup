"use client";
import { SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";
import { useRouter } from "next/navigation";

export function ChatSidebarButton(groupChat: {
  title: string;
  icon: string;
  chatid: string;
  isSelected: boolean;
  banner: string;
}) {
  const router = useRouter();
  console.log("chatSidebarButton");

  const bannerPath = `/assets/${groupChat.banner}`

  return (
    <SidebarMenuItem key={groupChat.title}>
      {/* Do not use the "isActive" property built into shadcn */}
      <SidebarMenuButton onClick={() => router.push(`${groupChat.chatid}`)} variant={groupChat.isSelected ? "selected" : "default"}
        className="bg-center justify-center p-5"
        style={{backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bannerPath})`}}>
          {/* <img src={`/assets/${groupChat.icon}`} className="w-4 h-4" /> */}
          <span className="text-left w-full">{groupChat.title}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>  
  );
}

// url(${bannerImage})`
// className="flex h-20 w-fill bg-center justify-center items-center"
//       style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bannerImage})` }}