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

    // const mockLodges = await fetchLodges<Lodge>(
    //   "https://6878e5f263f24f1fdc9fed51.mockapi.io/freeapi/Lodge"
    // );

    return (
      <div>
        <div className="min-h-screen max-w-7xl mx-auto">
          <Header name={profile?.username || "Guest"} />
          <main className="mx-5 sm:mx-10">
            <FilterSection />
            <LodgesSection lodges={lodges} />
          </main>
        </div>
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
