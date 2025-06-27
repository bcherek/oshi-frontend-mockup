"use client";
import { ChatListInfo } from "@/app/api/types";
import { ProfilePicture, StackedProfilePictures } from "../profile-picture";
import { SidebarMenuItem, SidebarMenuButton } from "../ui/sidebar";
import { useRouter } from "next/navigation";

export function ChatSidebarButton(props: {
  info: ChatListInfo;
  isSelected: boolean;
}) {
  const router = useRouter();
  // console.log("chatSidebarButton");

  const bannerPath = `/assets/${props.info.banner_image}`;

  let pfp_images: string[] = []
  for (var profile of props.info.profile_pictures) {
    pfp_images.push(profile.realimagepath);
  }

  return (
    <SidebarMenuItem>
      {/* Do not use the "isActive" property built into shadcn */}
      <SidebarMenuButton
        onClick={() => router.push(`${props.info.chatid}`)}
        variant={props.isSelected ? "selected" : "default"}
        className="bg-center justify-start pl-3 pr-2 py-0 h-15 flex-grow"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bannerPath})`,
        }}
      >
        <StackedProfilePictures realimagepaths={pfp_images}/>
        <div className="w-full line-clamp-1 justify-between flex flex-row">
          <span className="text-left w-fit font-[600] line-clamp-1">{props.info.title}</span>
          <span className="text-right w-fit line-clamp-1">{props.info.recent_message}</span>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

// url(${bannerImage})`
// className="flex h-20 w-fill bg-center justify-center items-center"
//       style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bannerImage})` }}
