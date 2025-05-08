import User from "@/lib/modal/user";
import { connect } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const data = await request.json();
    const { email, password, username } = data;
    await connect();

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ message: "user already exist" }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newuser = new User({
      email: email,
      username: username,
      password: hashedPassword,
    });

    await newuser.save();
    return new NextResponse(
      JSON.stringify({ message: " User Registered successfully" }),
      { status: 200 }
    );
  } catch (err: any) {
    return new NextResponse(err, { status: 500 });
  }
};
