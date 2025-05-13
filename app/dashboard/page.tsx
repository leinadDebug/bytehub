import { connect } from "@/lib/db";
import LodgeModal from "@/lib/modal/lodge";
import LodgesSection from "../components/LodgesSection";
import FilterSection from "../components/FilterSection";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import UserModal from "@/lib/modal/user";
import { User } from "@/types/lodges";
import { Header } from "../components/Header";
import Footer from "../components/Footer/Footer";

async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    await connect();
    const user = await UserModal.findById(payload.userId);

    if (!user) return null;
    return user;
  } catch (err) {
    console.error("Auth error:", err);
    return null;
  }
}

export default async function Dashboard() {
  await connect();

  const lodgesInDb = await LodgeModal.find();
  const lodges = lodgesInDb.map((lodgeInDb) => ({
    _id: lodgeInDb._id.toString(),
    title: lodgeInDb.title,
    owner: lodgeInDb.user.toString(),
  }));

  const profile = await getCurrentUser();
  console.log(profile.username);

  return (
    <div>
      {/*Nav*/}
      <Header name={profile.username} />

      {/*Main*/}
      <main className="mx-10">
        <FilterSection />
        <LodgesSection lodges={lodges} />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
