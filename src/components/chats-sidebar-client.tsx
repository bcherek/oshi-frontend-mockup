'use client'
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
import { useEffect, useState } from "react";

// I can not figure out how to make this resizeable. I tried using https://ui.shadcn.com/docs/components/resizable,
// but the resized sidebar keeps going behind the sidebar object.

//I tried using https://github.com/lumpinif/shadcn-resizable-sidebar , but it's not published as an npm package so I
//don't know how to install it, and i feel like it would also be a bad idea to use something that's not published

export function ChatsSidebarClient({ chats }: { chats: GroupChat[] }) {
  // This function is already null-checked.

  //The use of the strange arguments is because this HAS to be a react component, and react components
  //must have arguments presented in this way.

  const { switchChat } = getChatContext();
  const [me, setMe] = useState<Profile | null>(null);

  useEffect(() => {
    //We have to use this strange syntax because fetchMe returns a Promise<void>, while useEffect expects an undefined.
    //By defining the function and calling it in the function (where the return value is ignored), we can destroy the return
    //value of the function. 
    async function fetchMe() {
      const me = await getMe();
      if (!me) {
        console.error("cant find myself!");
        return;
      }
      setMe(me);
      return;
    }
    fetchMe();
  }, []);

  return (
    <Sidebar>
      <SidebarHeader>Find or start a conversation</SidebarHeader>
      <SidebarContent className="flex justify-between">
        <SidebarGroup>
          <SidebarGroupLabel>My Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats.map((groupChat) => (
                <SidebarMenuItem key={groupChat.title}>
                  <SidebarMenuButton asChild>
                    <button onClick={() => console.log("button pressed")}>
                      <img
                        src={`/assets/${groupChat.icon}`}
                        className="w-4 h-4"
                      />
                      <span>{groupChat.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      {createSidebarFooter(me)}
      </SidebarContent>
    </Sidebar>
  );
}

function createSidebarFooter(me: Profile | null) {
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
