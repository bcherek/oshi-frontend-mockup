import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getGroupChatMessages, Message } from "@/api/get-from-database";
import { ChatMessage } from "./chat-message";

export function ChatHistory(props: { userid: string; chatid: string }) {
  console.log("ChatHistory", props);
  const [messages, setMessages] = useState<Message[] | null>(null);

  useEffect(() => {
    let isMounted = true;
    getGroupChatMessages(props.userid, props.chatid).then((msgs) => {
      if (isMounted) setMessages(msgs ?? null);
    });
    return () => {
      isMounted = false;
    };
  }, [props.userid, props.chatid]);

  if (!messages) {
    return <div />;
  }

  return (
    <ScrollArea className="flex h-max">
      {messages.map((message, index) => (
        <ChatMessage key={index} {...message} />
      ))}
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}


// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { getGroupChatMessages, Message } from "@/api/get-from-database";
// import { ChatMessage } from "./chat-message";


// export async function ChatHistory(props : {userid: string, chatid: string}) {
//     const messages = (await getGroupChatMessages(props.userid, props.chatid) ?? null);
//     if (!messages) {
//         console.error("permission error getGroupChatMessages");
//         return (<div/>);
//     }

//     return (
//     <ScrollArea className="flex h-max">
//     {messages.map((message, index) => (
//     <ChatMessage key={index} {...message} />
//     ))}    
//     <ScrollBar orientation="vertical" />
//     </ScrollArea>
//   );
// }