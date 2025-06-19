import {
  GroupChat,
  Profile
} from "@/api/get-from-database";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu
} from "@/components/ui/sidebar";

import { ChatsSidebarClientBoundary } from "./chats-sidebar-client-boundary";

// THIS IS A SERVER COMPONENT, NO USEEFFECT OR USE STATE
export async function ChatsSidebar({chats, me}: {chats: GroupChat[] | null, me: Profile | null}) {
  console.log("ChatsSidebar", chats);
  if (!chats) {
    console.error("Chats Sidebar was called with null!");
    chats = [];
  }

  return (
    <Sidebar>
      <SidebarHeader>Find or start a conversation</SidebarHeader>
      <SidebarContent className="flex justify-between">
        <SidebarGroup>
          <SidebarGroupLabel>My Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <ChatsSidebarClientBoundary chats={chats}/>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      {createSidebarFooter(me)}
      </SidebarContent>
    </Sidebar>
  );

  async function createSidebarFooter(me: Profile | null) {
  if (!me) {
    return (
      <SidebarFooter>
      <div className="flex gap-x-5 items-center">
        <img src="/assets/pfp0.jpg" className="w-10 h-10" />
        <div>
          <h3>Profile Not Found!</h3>
          <h4>Userid Not Found!</h4>
        </div>
      </div>
    </SidebarFooter>
    )
  }
  
  return (
    <SidebarFooter>
      <div className="flex gap-x-5 items-center">
        <img src={`/assets/${me.profile_picture}`} className="w-10 h-10" />
        <div>
          <h3>{me.display_name}</h3>
          <h4>{me.userid}</h4>
        </div>
      </div>
    </SidebarFooter>
  );
}
}
