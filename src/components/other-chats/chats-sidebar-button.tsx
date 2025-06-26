"use client";
import { ChatListInfo } from "@/api/get-from-database";
import { ProfilePicture } from "../profile-picture";
import { SidebarMenuItem, SidebarMenuButton } from "../ui/sidebar";
import { useRouter } from "next/navigation";

export function ChatSidebarButton(props: {
  info: ChatListInfo;
  isSelected: boolean;
}) {
  const router = useRouter();
  console.log("chatSidebarButton");

  const bannerPath = `/assets/${props.info.banner_image}`;

  return (
    <SidebarMenuItem>
      {/* Do not use the "isActive" property built into shadcn */}
      <SidebarMenuButton
        onClick={() => router.push(`${props.info.chatid}`)}
        variant={props.isSelected ? "selected" : "default"}
        className="bg-center justify-center p-2 h-15"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bannerPath})`,
        }}
      >
        <ProfilePicture
          realimagepath={props.info.profile_pictures[0].realimagepath}
        />
        <span className="text-left w-full font-[600]">{props.info.title}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

// url(${bannerImage})`
// className="flex h-20 w-fill bg-center justify-center items-center"
//       style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bannerImage})` }}
