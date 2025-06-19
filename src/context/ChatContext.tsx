'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type ChatContextType = {
  userid: string;
  chatid: string;
  switchChat: (chatid: string) => void;
  switchUser: (userid: string) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [userid, setUserID] = useState("userid0");
  const [chatid, setChatID] = useState("chatid0");

  const switchChat = (newChatID: string) => {
    console.log(`Switch chat to ${newChatID}`);
    setChatID(newChatID);
  };

  const switchUser = (newUserID: string) => {
    setUserID(newUserID);
  }

  return (
    <ChatContext.Provider value={{ userid, chatid, switchChat, switchUser }}>
      {children}
    </ChatContext.Provider>
  );
}

export function getChatContext() {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChatContext must be used within a ChatProvider");
  return context;
}
