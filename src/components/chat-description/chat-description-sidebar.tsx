import { getProfile, GroupChat, Profile } from "@/api/get-from-database";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu
} from "@/components/ui/sidebar";

import { HeaderBubble } from "@/components/chat-description/description-bubble";

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
      <SidebarHeader> {chat.title} </SidebarHeader>
      <SidebarContent className="flex">
        {displayRules(chat)}
        {displayAllUsers(chat)}
      </SidebarContent>
      {createSidebarFooter(me)}
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
            Owner:
            {" " + owner?.display_name}
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            Moderators:
            {" " + mods.map((mod) => mod.display_name)}
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            Members:
            {" " + members.map((member) => member.display_name + " ")}
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
            <HeaderBubble header="description" body={chat.details.description}/>
            {chat.details.rules.map((rule, index) => (
              <HeaderBubble
                key={index}
                header={rule[0]}
                body={rule[1]}
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
