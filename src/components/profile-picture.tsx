import theme from "@/theme";

export function StackedProfilePictures(props: { realimagepaths: string[]}) {
  return (
    <div className="flex flex-row w-fit">
      {props.realimagepaths.map((path, index) => (
        <div className="relative"
          key={index}
          style={{
            // we have to use marginLeft to tell the document that "nothing is going to occupy this space",
            // as opposed to left, which does not tell the document that
            //https://www.codecademy.com/forum_questions/5142753db9f7a8a58c002fb1
            marginLeft: index === 0 ? 0 : "-1.75em",
            zIndex: props.realimagepaths.length - index,
          }}
        >
          <ProfilePicture realimagepath={path} />
        </div>
      ))}
    </div>
  );
}

export function ProfilePicture(props: { realimagepath: string }) {
  return (
    <div className="aspect-square">
      {/* the gradientBox will always take the full length of the container */}
      <div
        className="flex items-center justify-center rounded-full overflow-hidden object-scale-down w-10 h-10"
        style={theme.getMyGradientBox(undefined, "2px")}
      >
        <img
          src={`${props.realimagepath}`}
          className="object-contain w-full h-full"
        />
      </div>
    </div>
  );
}
