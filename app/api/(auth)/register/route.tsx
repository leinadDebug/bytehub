import User from "@/lib/modal/user";
import { connect } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const username = searchParams.get("username");

    if (!(email || username)) {
      return new NextResponse(
        JSON.stringify({
          message: "Invaid parameters",
        }),
        { status: 400 }
      );
    }
    await connect();
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "user not found" }), {
        status: 404,
      });
    }
    return new NextResponse(
      JSON.stringify({
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
      }),
      { status: 200 }
    );
  } catch (e) {
    return new NextResponse(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const data = await request.json();
    const { email, password, username, role, host } = data;
    console.log("Sending role:", role);
    await connect();

    const existingEmail = await User.findOne({
      email: email,
    });

    const existingUserName = await User.findOne({
      username: username,
    });

    if (existingUserName || existingEmail) {
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
      role: role,
      host: host,
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
