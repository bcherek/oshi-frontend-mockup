//DUMMYAPI

// This is how a message exists in the json databse
export interface Message {
  userid: string;
  timestamp: string; // ISO 8601 timestamp
  text: string;
}

export interface GroupChat {
  //This is how a group-chat exists in the database
  title: string;
  owner: string; //userid of owner
  members: string[]; // array of userIDs
  moderators: string[];
  icon: string;
  messages: Record<string, Message>; // O(1) message lookup by message ID
  details: Details;
  chatid: string; //the is the SAME VALUE used for the lookup in the DB.
  //Not stored twice in the database; assigned in this file
  //This might not be best practice; needs code review
}

export interface Details {
  "banner-image": string;
  "background-image": string;
  "description": string;
  //rules are tuples: (RULEHEADER, DESCRIPTION) 
  "rules": Array<[string, string]>;
}

export interface Profile {
    userid: string,
    display_name: string,
    profile_picture: string,
    chat_color: string
}

async function getJSON(): Promise<any> {
  const resp = await fetch("http://localhost:4000/all-data");
  // do NOT try to print this directly
  return resp.json();
}

export async function getProfile(userid: string) {
  console.log(`getProfile ${userid}`);
  let json;
  try {
    json = await getJSON();
    // console.log("Successfully got json");
  } catch {
    // console.error("failed to get json");
    return null;
  }
  const myProfile: Profile = json["profiles"][userid];
  if (!(myProfile)) {
  console.error(`Cant find profile specified in getProfile: ${userid}`);
  return null;
  }
  myProfile.userid = userid;
  return myProfile;
}


export async function getMe(whoami: string): Promise<Profile | null>{
  console.log("getMe");
  let json;
  try {
    json = await getJSON();
    console.log("Successfully got json");
  } catch {
    console.error("failed to get json");
    return null;
  }
  const myProfile: Profile = json["profiles"][whoami];
  if (!(myProfile)) {
  console.error(`Cant find me; ${whoami}`);
  return null;
  }

  myProfile.userid = whoami;
  return myProfile;
}
export async function getChatByID(chatid: string): Promise<GroupChat | null> {
  let json;
  try {
    json = await getJSON();
    // console.log("Successfully got json");
  } catch {
    // console.error("failed to get json");
    return null;
  }
  var groupChat = json["group-chats"][chatid] as GroupChat;
  
  // console.log(groupChat);
  groupChat.chatid = chatid;

  return groupChat;
} 

export async function getGroupChatMessages(userid: string, chatid: string): Promise<Message[] | null> {
  console.log(`getGroupChatMessages ${chatid}`);
  // TODO: Validation that the user asking has permission
  
  let json;
  try {
    json = await getJSON();
    // console.log("Successfully got json");
  } catch {
    // console.error("failed to get json");
    return null;
  }
  // var details = json["group-chats"][chatid]["details"] as Details;
  // console.log(details);
  var groupChat = json["group-chats"][chatid] as GroupChat;
  
  // console.log(groupChat);
  groupChat.chatid = chatid;

  // Now, we sort the messages based on timestamp before serving them
  // Obviously this sucks because it's O(n log n)
  const arr: Message[] = Object.values(groupChat.messages).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  // console.log(arr);
  return arr;
}

//Returns the full chat object for a specific user.
//Obviously this is not sustainable; trying to load 10,000+ messages for every single chat
//is wasteful. We would want some ChatSummary object which does not have
//messages.

export async function getMyGroupChats(whoami: string): Promise<GroupChat[] | null> {
  console.log("getmygroupchats");
  let json;
  try {
    json = await getJSON();
    console.log("Successfully got json");
  } catch {
    console.error("failed to get json");
    return null;
  }
  const groupChatIDS: string[] = json["profiles"][whoami]["my_chats"];

  //validate that user has group chats
  if (groupChatIDS.length == 0) {
    return [];
  }
  
  //validate these group chats exist in DB
  for (const chatid of groupChatIDS) {
    if (!(json["group-chats"][chatid])) {
      console.error(`chatid ${chatid} does not exist`);
      return null;
    }
  }

  //retrieve the groupchats from the DB
  var myChats: GroupChat[] = [];
  for (const chatid of groupChatIDS) {
    var groupChat = json["group-chats"][chatid] as GroupChat;
    groupChat.chatid = chatid;
    myChats.push(groupChat);
  }
  return myChats;
}
