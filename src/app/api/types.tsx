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

//one of these should be created per chat displayed on the left side
export interface ChatListInfo {
  chatid: string;
  title: string;
  icon: string;
  recent_message: string | undefined; //most recent message (one to display)
  banner_image: string;
  profile_pictures: ProfilePicture[];
  is_private_group_chat: boolean; //not in the database for now
}

export interface ProfilePicture {
  //We will return an array of Pictures when populating chat descriptions, interfaces, etc.
  realimagepath: string;
}

//one of these needs to be retrieved for a single groupchat
export interface Details {
  banner_image: string;
  background_image: string;
  description: string;
  //rules are tuples: (RULEHEADER, DESCRIPTION)
  rules: Array<[string, string]>;
}

export interface Profile {
  userid: string;
  display_name: string;
  profile_picture: string;
  chat_color: string;
}