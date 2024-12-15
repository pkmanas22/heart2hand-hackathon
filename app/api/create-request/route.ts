import { createNewRequest } from "@/lib/firebase/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json();

        if (!data) {
            return NextResponse.json({ error: "Data is required." }, { status: 400 });
        }
        const { message, success } = await createNewRequest(data);
        
        if (!success) {
            return NextResponse.json({ error: message }, { status: 400 });
        }

        return NextResponse.json({ requestId: message });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}