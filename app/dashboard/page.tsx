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
import Lodge from "@/lib/modal/lodge";

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
  try {
    await connect();

    const [lodgesInDb, profile] = await Promise.all([
      LodgeModal.find().lean(),
      getCurrentUser(),
    ]);

    const lodges = lodgesInDb.map((lodgeInDb: any) => ({
      _id: lodgeInDb._id.toString(),
      title: lodgeInDb.title,
      owner: lodgeInDb.user ? lodgeInDb.user.toString() : "Unknown",
    }));

    return (
      <div>
        <Header name={profile?.username || "Guest"} />
        <main className="mx-10">
          <FilterSection />
          <LodgesSection lodges={lodges} />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  } catch (error) {
    console.error("Dashboard error:", error);
    return (
      <div>
        <Header name="Guest" />
        <main className="mx-10">
          <div className="text-center py-10">
            <h1 className="text-2xl font-bold text-red-600">
              Error loading dashboard
            </h1>
            <p className="mt-2">Please try again later</p>
          </div>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}
