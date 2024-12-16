import { getAllRequest } from "@/lib/firebase/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const { message, success } = await getAllRequest();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 400 });
        }
        // console.log(message)
        return NextResponse.json({ data: message });
    } catch (error) {
        console.error("Unexpected error in GET handler:", error);
        return NextResponse.json(
            { error: "An error occurred while fetching user details." },
            { status: 500 }
        );
    }
};
