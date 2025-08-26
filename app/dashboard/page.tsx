import { connect } from "@/lib/db";
import LodgeModal from "@/lib/modal/lodge";
import LodgesSection from "../components/LodgesSection";
import FilterSection from "../components/FilterSection";
import { Header } from "../components/Header";
import Footer from "../components/Footer/Footer";
import { getCurrentUser } from "@/lib/auth";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  try {
    await connect();

    const resolvedSearchParams = await searchParams;
    const query = resolvedSearchParams?.query || "";
    const filter = query ? { title: { $regex: query, $options: "i" } } : {};

    const [lodgesInDb, profile] = await Promise.all([
      LodgeModal.find(filter).lean(),
      getCurrentUser(),
    ]);

    const lodges = lodgesInDb.map((lodgeInDb: any) => ({
      _id: lodgeInDb._id.toString(),
      title: lodgeInDb.title,
      owner: lodgeInDb.user ? lodgeInDb.user.toString() : "Unknown",
    }));

    return (
      <div className="min-h-screen w-full relative overflow-hidden bg-[#0b0b0b] text-white">
        {/* dotted grid bg */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        {/* gradient blobs */}
        <div className="absolute -left-40 top-56 h-[420px] w-[420px] rounded-full blur-3xl opacity-70 bg-gradient-to-tr from-orange-800 via-orange-600 to-red-700" />
        <div className="absolute right-20 bottom-36 h-[300px] w-[300px] rounded-full blur-2xl opacity-80 bg-gradient-to-br from-orange-500/70 via-orange-400/50 to-yellow-300/40" />

        {/* main container */}
        <div className="relative z-10 min-h-screen max-w-7xl mx-auto">
          <Header name={profile?.username || "Guest"} />

          <main className="mx-5 sm:mx-10 py-10">
            <FilterSection />
            <LodgesSection lodges={lodges} />
          </main>
        </div>

        {/* watermark */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-24 mx-auto select-none text-center font-extrabold tracking-tight text-gray-500/20"
          style={{ fontSize: "16vw", lineHeight: 0.9 }}
        >
          DASHBOARD
        </div>

        {/* footer */}
        <footer className="relative z-20">
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
