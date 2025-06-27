import { getProfile} from "@/app/api/get-from-database";
import {GroupChat, Profile} from "@/app/api/types"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu
} from "@/components/ui/sidebar";

import { Bubble, HeaderBubble } from "@/components/chat-description/description-bubble";
import { PicturesFromProfiles } from "../profile-picture";

// THIS IS A SERVER COMPONENT, NO USEEFFECT OR USE STATE
export async function ChatDescriptionSidebar({
  chat,
  me,
}: {
  chat: GroupChat | null;
  me: Profile | null;
}) {
  // console.log("ChatDescriptionSidebar", chat);
  if (!chat) {
    console.error("trying to get description of an empty chat");
    return <></>;
  }

  const bgImage = `/assets/${chat.details["background_image"]}`;
  console.log(`bg image: ${bgImage}` );
  return (
    <Sidebar side="right" variant="chatdescription" pathtobgimage={bgImage}>
      <SidebarHeader className="text-white"> {chat.title} </SidebarHeader>
      <SidebarContent className="flex">
        {displayRules(chat)}
        {displayAllUsers(chat)}
      </SidebarContent>
      {/* {createSidebarFooter(me)} */}
    </Sidebar>
  );

  async function displayAllUsers(chat: GroupChat | null) {
    if (!chat) return <></>;

    console.log(`chat owner ${chat.owner}`);
    const owner: Profile | null = await getProfile(chat.owner);

    let mods: Profile[] = [];
    for (var mod_id of chat.moderators) {
      console.log(`chat mod ${mod_id}`);
      let mod_profile = await getProfile(mod_id);
      if (mod_profile) {
        mods.push(mod_profile);
      }
    }

    let members: Profile[] = [];
    for (const member of chat.members) {
      console.log(`member ${member}`);
      let member_profile = await getProfile(member);
      if (member_profile) {
        members.push(member_profile);
      }
    }

    return (
      <>
        <SidebarGroup>
          <SidebarGroupContent>
            <HeaderBubble header="owner" body={<PicturesFromProfiles profiles={mods}/>}/>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <HeaderBubble header="moderators" body={<PicturesFromProfiles profiles={mods}/>}/>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <HeaderBubble header="members" body={<PicturesFromProfiles profiles={members}/>}/>
          </SidebarGroupContent>
        </SidebarGroup>
      </>
    );
  }

  async function displayRules(chat: GroupChat | null) {
    if (!chat) return <></>;
    //In the future, this can be refactored to use the SidebarMenuButton to make the rules editable
    
    return (
      <>
      {/* <SidebarGroup>
        Can use other groups if description should be kept separate
      </SidebarGroup> */}
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <HeaderBubble header="description" body={<span>{chat.details.description}</span>}/>
            {chat.details.rules.map((rule, index) => (
              <HeaderBubble
                key={index}
                header={rule[0]}
                body={<span>{rule[1]}</span>}
              />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      </>
    );
  }

  async function createSidebarFooter(me: Profile | null) {
    return <SidebarFooter>empty footer for now</SidebarFooter>;
  }
}
