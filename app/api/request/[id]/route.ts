import { getRequestById } from "@/lib/firebase/utils";
import { NextRequest, NextResponse } from "next/server";

type tParams = Promise<{ id: string }>;

export const GET = async (req: NextRequest, { params }: { params: tParams }) => {
    try {
        const { message, success } = await getRequestById((await params).id);

        if (!success) {
            return NextResponse.json({ error: message }, { status: 400 });
        }

        return NextResponse.json({ data: message });
    } catch (error) {
        console.error("Unexpected error in GET handler:", error);
        return NextResponse.json(
            { error: "An error occurred while fetching user details." },
            { status: 500 }
        );
    }
};
