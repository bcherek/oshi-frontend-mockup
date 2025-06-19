import { ChatSidebarButton } from "./chats-sidebar-menu-button";
import {
  getMyGroupChats,
  GroupChat,
  Message,
  getMe,
  Profile,
} from "@/api/get-from-database";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

import { getChatContext } from "@/context/ChatContext";
import { ChatsSidebarClientBoundary } from "./chats-sidebar-client-boundary";

// THIS IS A SERVER COMPONENT, NO USEEFFECT OR USE STATE
export async function ChatsSidebar({chats}: {chats: GroupChat[] | null}) {
  console.log("ChatsSidebar", chats);
  if (!chats) {
    console.log("Chats Sidebar was called with null. We want to retry");
    chats = [];
  }

    const safeChats = JSON.parse(JSON.stringify(
    chats.map(({ chatid, title, icon }) => ({
      chatid: String(chatid),
      title: String(title),
      icon: String(icon),
    }))
  ));
  console.log("Passing to ChatsSidebarClientBoundary:", safeChats);

  return (
    <Sidebar>
      <SidebarHeader>Find or start a conversation</SidebarHeader>
      <SidebarContent className="flex justify-between">
        <SidebarGroup>
          <SidebarGroupLabel>My Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <ChatsSidebarClientBoundary chats={safeChats}/>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      {/* {createSidebarFooter(me)} */}
      </SidebarContent>
    </Sidebar>
  );
}

// function createSidebarFooter(me: Profile | null) {
//   if (!me) {
//     return (
//       <SidebarFooter>
//       <div className="flex gap-x-5 items-center">
//         <img src="/assets/pfp0.jpg" className="w-10 h-10" />
//         <div>
//           <h3>Profile Not Found!</h3>
//           <h4>Userid Not Found!</h4>
//         </div>
//       </div>
//     </SidebarFooter>
//     )
//   }
  
//   return (
//     <SidebarFooter>
//       <div className="flex gap-x-5 items-center">
//         <img src={`/assets/${me.profile_picture}`} className="w-10 h-10" />
//         <div>
//           <h3>{me.display_name}</h3>
//           <h4>{me.userid}</h4>
//         </div>
//       </div>
//     </SidebarFooter>
//   );
// }
