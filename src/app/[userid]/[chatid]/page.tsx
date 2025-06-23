import { Chat } from "@/components/chat";
import { ChatsSidebar } from "@/components/chats-sidebar";
import { getChatByID, getGroupChatMessages, getMe, getMyGroupChats, GroupChat } from "@/api/get-from-database";
import { Message } from "@/api/get-from-database";
import { getChatContext } from  "@/context/ChatContext";
import { redirect } from "next/navigation";
import { ChatDescriptionSidebar } from "@/components/chat-description-sidebar";

type PageProps = {
  params: { userid: string, chatid: string };
};

export default async function Home({ params }: PageProps) {
  //@ts-ignore ts(80007) - Params is a Dynamic API and needs an await https://nextjs.org/docs/messages/sync-dynamic-apis 
  const { userid, chatid } = await params;


  console.log("page.tsx");

  const chats = await getMyGroupChats(userid);
  const me = await getMe(userid);
  
  let chat : GroupChat | null = null;
  let chatHistory : Message[] | null = null;

  if (me && chats) {
    chatHistory = await getGroupChatMessages(userid,chatid);
    chat = await getChatByID(chatid);
  }

  console.log("chats", chats);
  return (
        <div className="flex flex-grow">
          <ChatsSidebar chats={chats} me={me} currid={chatid}/>
          <Chat chatHistory={chatHistory} myuserid={me ? me.userid : null}/>
          <ChatDescriptionSidebar chat={chat} me={me}/>
        </div>
  );
}
