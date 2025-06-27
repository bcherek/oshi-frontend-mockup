import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "_data/db.json");

export async function POST(req: NextRequest) {
    console.log("WE ARE ACTUALLY POSTING");
    try {
    console.log("post request reqcieved?");
    const { userid, chatid, message } = await req.json();

    const dbRaw = fs.readFileSync(dbPath, "utf-8");
    const db = JSON.parse(dbRaw);
    console.log("Are we even here?");
    const messages = db["all-data"]["group-chats"][chatid]?.messages;
    if (!messages) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    let maxId = 0;
    Object.keys(messages).forEach((msgid) => {
      const match = msgid.match(/^msgid(\d+)$/);
      if (match) {
        maxId = Math.max(maxId, parseInt(match[1]));
      }
    });
    const newMsgId = `msgid${maxId + 1}`;

    const newMessage = {
      userid,
      timestamp: new Date().toISOString(),
      text: message,
    };

    messages[newMsgId] = newMessage;

    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");

    return NextResponse.json({ success: true, newMsgId, newMessage });
  } catch (error) {
    console.log("womp womp error");
    return NextResponse.json({ error: "Internal server error..." }, { status: 500 });
  }
}