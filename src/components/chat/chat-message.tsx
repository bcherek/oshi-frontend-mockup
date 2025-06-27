import {getProfile } from "@/app/api/get-from-database";
import { Message } from "@/app/api/types";
import theme from "@/theme";
import { ProfilePicture } from "../profile-picture";
export async function ChatMessage(props: { msg: Message; isMe: boolean }) {
  
  
  var profile = (await getProfile(props.msg.userid)) ?? null;

  if (!profile) {
    return <></>;
  }
  const myGradientBoxStyle = theme.getMyGradientBox(profile.chat_color);
  const theirGradientBoxStyle = theme.getOtherGradientBox(
    addOpacity(profile.chat_color,
      theme.colors.chatOpacityColor,
      theme.colors.chatOpacityAmount
    )
  );
  return (
    <div className="w-full">
      <div className="p-3">
        {/* PFP AND NAME */}
        <div className="flex gap-x-5 items-center">
          <ProfilePicture realimagepath={`/assets/${profile.profile_picture}`}/>
          <div>
            <h3 className="text-[var(--chat-message-displayname-text-color)]">
              {profile.display_name}
            </h3>
          </div>
        </div>
        {/* CHAT BUBBLE */}
        <div
          className="m-3 inline-block border-opacity-0 box-border p-1"
          style={props.isMe ? myGradientBoxStyle : theirGradientBoxStyle}
        >
          <h4 className="px-8 py-4 text-[var(--chat-message-text-color)] break-words whitespace-pre-wrap">
            {props.msg.text}
          </h4>
        </div>
      </div>
    </div>
  );
}

//We want to change the opacity of the backgroundColor dependent on whether or not we are the user.
//I tried using a z-index for this but for some reason that just refuses to work.
//Instead, we'll just manually compute what the RGB will be for the background given the overlay.
function addOpacity(color: string, color2: string, opacity: number): string {
  //This function is AI generated; it simply blends colors together
  const hexToRgb = (hex: string): [number, number, number] => {
    hex = hex.replace("#", "");
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    }
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  };

  const [r1, g1, b1] = hexToRgb(color);
  const [r2, g2, b2] = hexToRgb(color2);

  // Blend the colors
  const r = Math.round(r2 * opacity + r1 * (1 - opacity));
  const g = Math.round(g2 * opacity + g1 * (1 - opacity));
  const b = Math.round(b2 * opacity + b1 * (1 - opacity));

  return `rgb(${r}, ${g}, ${b})`;
}
