//DUMMYAPI
import {ChatListInfo, GroupChat, Details, Message, Profile, ProfilePicture} from "@/app/api/types"
// This is how a message exists in the json databse


async function getJSON(): Promise<any> {
  const resp = await fetch("http://localhost:4000/all-data");
  // do NOT try to print this directly
  return resp.json();
}

//This is supposed to get only the information needed to create the banner for every chat;
//obviously right now it's pulling the whole JSON which is wrong :)
export async function getAllChatListInfos(whoami: string) {
  if (whoami == "api"){
    console.log("WHY IS THIS GETTING CALLED?");
    return;
  };
  if (whoami == "") {
    console.log("empty getallchatlist");
    return;
  }
  console.log("getAllChatListInfos: ", whoami);
  let json;
  try {
    json = await getJSON();
  } catch {
    return null;
  }
  console.log("whoami: ", json["profiles"][whoami]);
  const myChatIDs: string[] = json["profiles"][whoami]["my_chats"];
  // console.log("my_chats:", json["profiles"][whoami]["my_chats"]);
  var myChatListInfos: ChatListInfo[] = [];
  for (var chatid of myChatIDs) {
    var chatListInfo = {} as ChatListInfo;
    chatListInfo.chatid = chatid;
    //This is not a fully formed GroupChat object; it doesn't yet have chatid defined
    var groupChat = json["group-chats"][chatid] as GroupChat;
    chatListInfo.title = groupChat.title;
    chatListInfo.is_private_group_chat = Math.random() >= 0.5;
    chatListInfo.banner_image = groupChat.details.banner_image;
    chatListInfo.profile_pictures = [];
    chatListInfo.icon = groupChat.icon;
    chatListInfo.recent_message = sortMessages(groupChat.messages).pop()?.text;
    
    //We need to get the profile pictures that we want to display beside the chat.
    //Normally, this would be the 3 most recent people, but I don't want to do that rn.
    //so this is just going to pull from the members list.
    for (var i = 0; i < 3; i++) {
      if (i <= groupChat.members.length - 1) {
        let profilePicture = {} as ProfilePicture;
        profilePicture.realimagepath = `/assets/${
          json["profiles"][groupChat.members[i]]["profile_picture"]
        }`;
        chatListInfo.profile_pictures.push(profilePicture);
      } else {
        break;
      }
    }

    myChatListInfos.push(chatListInfo);
  }
  return myChatListInfos;
}


function sortMessages(messages: Record<string, Message>): Message[] {
    const arr: Message[] = Object.values(messages).sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  return arr;
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
  if (!myProfile) {
    console.error(`Cant find profile specified in getProfile: ${userid}`);
    return null;
  }
  myProfile.userid = userid;
  return myProfile;
}

export async function getMe(whoami: string): Promise<Profile | null> {
  console.log("getMe");
  let json;
  try {
    json = await getJSON();
    // console.log("Successfully got json");
  } catch {
    // console.error("failed to get json");
    return null;
  }
  const myProfile: Profile = json["profiles"][whoami];
  if (!myProfile) {
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

export async function getGroupChatMessages(
  userid: string,
  chatid: string
): Promise<Message[] | null> {
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
  // Obviously this sucks because it's O(n logn)
  return sortMessages(groupChat.messages);
}

//Returns the full chat object for a specific user.
//Obviously this is not sustainable; trying to load 10,000+ messages for every single chat
//is wasteful. We would want some ChatSummary object which does not have
//messages.

export async function getMyGroupChats(
  whoami: string
): Promise<GroupChat[] | null> {
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
    if (!json["group-chats"][chatid]) {
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
