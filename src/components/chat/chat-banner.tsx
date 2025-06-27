import { GroupChat } from "@/app/api/types";

export function TopBanner(props: { groupChat: GroupChat | null }) {
  if (!props.groupChat) {
    return <></>;
  }
    
  // Tailwind doesn't support dynamic paths so we have to define it outside   
  const bannerImage = `/assets/${props.groupChat.details["banner_image"]}`;
  
  return (
    <div
      className="flex h-20 w-full bg-center justify-center items-center"
      style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bannerImage})` }}
    >
      <span className="text-white text-center">{props.groupChat.title}</span>
    </div>
  );
}
