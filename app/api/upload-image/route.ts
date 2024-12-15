import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const POST = async (req: NextRequest) => {
    try {
        // console.log(req);
        const id = uuidv4();
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const userId = formData.get("userId") as string;

        if (!file) {
            return NextResponse.json({ error: "File is required." }, { status: 400 });
        }

        if (file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "image/gif") {
            return NextResponse.json({ error: "File type not supported. Only JPEG, PNG, and GIF files are allowed." }, { status: 400 });
        }

        if (file.size > 1024 * 1024 * 2) {
            return NextResponse.json({ error: "File size too large. Max size is 2MB." }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const extension = file.name.split(".").pop();
        const secureUrl: string | undefined = await uploadImageToCloudinary(
            buffer,
            `${userId}/${id}.${extension}`
        );

        return NextResponse.json({ secureUrl: secureUrl ?? "" }, { status: secureUrl ? 200 : 400 })
    } catch (error) {
        console.error("Error uploading image:", error);
        return NextResponse.json({ error }, { status: 500 });
    }

};