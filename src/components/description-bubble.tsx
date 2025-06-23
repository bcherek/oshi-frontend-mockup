export function Bubble(props: {body: string}) {
    return (<div className="flex flex-col">
        {props.body}
    </div>);
}

export function HeaderBubble(props: {header: string, body: string}) {
    return (<div className="flex flex-col">
    <h2>{props.header}</h2>
    <h3>{props.body}</h3>
    </div>);
}