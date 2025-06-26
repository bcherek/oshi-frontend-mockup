import { Chat } from "@/components/chat/chat";
import { ChatsSidebar } from "@/components/other-chats/chats-sidebar";
import { getGroupChatMessages, getMe, getMyGroupChats } from "@/api/get-from-database";
import { Message } from "@/api/get-from-database";
import { ChatProvider, getChatContext } from  "@/context/ChatContext";
import { redirect } from "next/navigation";

type PageProps = {
  params: { userid: string };
};

export default async function Home({ params }: PageProps) {
  //@ts-ignore ts(80007) - Params is a Dynamic API and needs an await https://nextjs.org/docs/messages/sync-dynamic-apis 
  const { userid} = await params;

  console.log("userid but no chatid");

  const chats = await getMyGroupChats(userid);
  const me = await getMe(userid);
    
  if (me && chats) {
    if (chats.length > 0) {
        redirect(`/${userid}/${chats[0].chatid}`);
    }
    else {
        return (
        <div className="flex">
            <ChatsSidebar chats={[]} me={me} currid=""/>
        </div>
        )
    }
  }
  return (
        <div className="flex">
          Error loading; try reloading!
        </div>
  );
}
