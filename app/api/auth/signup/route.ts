import { createNewUser } from "@/lib/firebase/utils";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req:NextRequest) => {    
    try {
        const { name, email, password, role } = await req.json();
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const {message, success} = await createNewUser(name, email, hashedPassword, role);
        if (!success) {
            return NextResponse.json({ error: message }, { status: 400 });
        }

        return NextResponse.json({ message });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
