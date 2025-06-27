import { Chat } from "@/components/chat/chat";
import { ChatsSidebar } from "@/components/other-chats/chats-sidebar";
import {
  getAllChatListInfos,
  getChatByID,
  getGroupChatMessages,
  getMe,
} from "@/app/api/get-from-database";
import { Message, GroupChat } from "@/app/api/types";
import { ChatDescriptionSidebar } from "@/components/chat-description/chat-description-sidebar";
import { TopBanner } from "@/components/chat/chat-banner";
import { ChatInput } from "@/components/chat/chat-input";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  } else {
    return;
  }
  

  // console.log("chats", chats);
  return (
    <div className="flex h-screen w-full">
      <div className="flex-shrink-0">
        <ChatsSidebar chatListInfos={chatListInfos} me={me} currid={chatid} />
      </div>

      {/* Center of the screen */}
      <div className="flex flex-col flex-grow min-w-0 min-h-0 basis-0">
        <div className="w-full">
          <TopBanner groupChat={chat} />
        </div>
        {/* scrollArea does the exact same thing as a normal div it just looks a little better */}
        <ScrollArea className="flex-grow overflow-y-auto min-h-0 w-full">
          <Chat chatHistory={chatHistory} myuserid={me ? me.userid : null} />
        </ScrollArea>
        <div className="w-full flex-shrink-0 p-3">
          <ChatInput />
        </div>
      </div>

      <div className="flex-shrink-0">
        <ChatDescriptionSidebar chat={chat} me={me} />
      </div>
    </div>
  );
}
