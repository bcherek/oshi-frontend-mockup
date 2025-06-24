import { Message, getProfile, Profile } from "@/api/get-from-database";
import theme from "@/theme";
export async function ChatMessage(props: { msg: Message; isMe: boolean }) {
  var profile = (await getProfile(props.msg.userid)) ?? null;

  if (!profile) {
    return <></>;
  }
  const myGradientBoxStyle = theme.getMyGradientBox(profile.chat_color);
  const theirGradientBoxStyle = theme.getOtherGradientBox(
    addOpacity(
      profile.chat_color,
      theme.colors.chatOpacityColor,
      theme.colors.chatOpacityAmount
    )
  );
  return (
    <div className="w-full">
      <div className="inline-block p-3">
        {/* PFP AND NAME */}
        <div className="flex gap-x-5 items-center">
          <img
            src={`/assets/${profile.profile_picture}`}
            className="w-10 h-10"
          />
          <div>
            <h3 className="text-[var(--chat-message-displayname-text-color)]">
              {profile.display_name}
            </h3>
          </div>
        </div>
              {/* borderRadius: "50em",
      border: "4px solid transparent", */}
        {/* CHAT BUBBLE */}
        <div className="m-3 inline-block overflow-hidden rounded-[50em] b-4 border-opacity-0" style={props.isMe ? myGradientBoxStyle : theirGradientBoxStyle} >
          {/* CHAT TEXT */}
          <h4
          className={
            props.isMe
              ? "m-2 p-2 text-[var(--chat-message-text-color)]"
              : "m-2 p-2 text-[var(--chat-message-text-color)]"
          }
        >
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
