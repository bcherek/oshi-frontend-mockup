import { getMyGroupChats, GroupChat } from "@/api/get-from-database";
import { ChatsSidebarClient } from "./chats-sidebar-client";
import { useEffect, useState } from "react";

export default async function ChatsSidebar() {
  const [chats, setChats] = useState<GroupChat[]>([]);
  useEffect(() => {
    getMyGroupChats().then((result) => setChats(result ? result : []))
  }, []);
    
  //It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.
  //Therefore, we can't call the function.

    // return ChatsSidebarClient(chats); <- does not work

  //It instead has to be a React Component.
  return <ChatsSidebarClient chats={chats}/>
}
