import theme from "@/theme";

export function ProfilePicture(props: {realimagepath: string}) {
    return (
    <div className="rounded-full overflow-hidden object-scale-down w-10 h-10" style={theme.getMyGradientBox(undefined,"2px")}>
    <img
            src={`${props.realimagepath}`}
            className="content-stretch"
          />
    </div>);
}