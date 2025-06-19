import { Message, getProfile, Profile } from "@/api/get-from-database";
export async function ChatMessage(msg: Message) {
  var profile = (await getProfile(msg.userid)) ?? null;
  if (!profile) {
    return <></>;
  }
  return (
    <div>
      <div className="flex gap-x-5 items-center">
        <img src={`/assets/${profile.profile_picture}`} className="w-10 h-10" />
        <div>
          <h3>{profile.display_name}</h3>
          <h4>{msg.timestamp}</h4>
        </div>
      </div>
      <h4>{msg.text}</h4>
    </div>
  );
}
