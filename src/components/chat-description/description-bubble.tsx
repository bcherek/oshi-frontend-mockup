export function HeaderBubble(props: { header: string; body: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <h2 className="font-[600] text-white p-3 text-shadow-lg/5">{props.header}</h2>
      <div className="bg-[var(--translucent-timeline-post-bg)] text-white rounded-2xl mx-3">
        <h3 className="italic m-3">{props.body}</h3>
      </div>
    </div>
  );
}

//currently not in use
export function Bubble(props: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="bg-[var(--translucent-timeline-post-bg)] text-white rounded-2xl mx-3">
        <div className="italic m-3">{props.children}</div>
      </div>
    </div>
  );
}