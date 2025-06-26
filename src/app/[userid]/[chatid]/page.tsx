import { Chat } from "@/components/chat/chat";
import { ChatsSidebar } from "@/components/other-chats/chats-sidebar";
import {
  getAllChatListInfos,
  getChatByID,
  getGroupChatMessages,
  getMe,
  getMyGroupChats,
  GroupChat,
} from "@/api/get-from-database";
import { Message } from "@/api/get-from-database";
import { ChatDescriptionSidebar } from "@/components/chat-description/chat-description-sidebar";
import { TopBanner } from "@/components/chat/chat-banner";
import { ChatInput } from "@/components/chat/chat-input";
import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area";
type PageProps = {
  params: { userid: string; chatid: string };
};

export default async function Home({ params }: PageProps) {
  //@ts-ignore ts(80007) - Params is a Dynamic API and needs an await https://nextjs.org/docs/messages/sync-dynamic-apis
  const { userid, chatid } = await params;

  console.log("page.tsx");

  // let chatListInfos;
  // if (userid) {
  //   console.log("userid in page.tsx", userid);
  var chatListInfos = await getAllChatListInfos(userid); 
  // }
  const me = await getMe(userid);

  let chat: GroupChat | null = null;
  let chatHistory: Message[] | null = null;

  if (me && chatListInfos) {
    chatHistory = await getGroupChatMessages(userid, chatid);
    chat = await getChatByID(chatid);
  }
  else {
    return;
  }

  // console.log("chats", chats);
  return (
    <div className="flex flex-grow h-screen">
      <ChatsSidebar chatListInfos={chatListInfos} me={me} currid={chatid} />

      <div className="flex flex-col w-full flex-grow min-h-0">
        <div className="flex-none">
          <TopBanner groupChat={chat} />
        </div>

        <div className="flex-grow overflow-y-auto min-h-0">
          <Chat chatHistory={chatHistory} myuserid={me ? me.userid : null} />
        </div>
        <div className="flex-none">
          <ChatInput />
        </div>
      </div>
      <ChatDescriptionSidebar chat={chat} me={me} />
    </div>
  );
}
