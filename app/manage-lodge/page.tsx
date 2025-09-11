import Footer from "../components/Footer/Footer";
import Profile_header from "../components/Header/Profile_header";
import LodgePage from "./lodgesPage";

interface Lodge {
  title: string;
  user: string;
  price: number;
  host: {
    hostName: string;
    superHost: boolean;
    responseRate: number;
    reviews: number;
    rating: number;
  };
}

async function getLodges(): Promise<Lodge[]> {
  return [
    {
      title: "Luxury Beachfront",
      user: "user123",
      price: 300,
      host: {
        hostName: "Daniel",
        superHost: true,
        responseRate: 20,
        reviews: 3,
        rating: 70,
      },
    },
    {
      title: "Cozy Apartment",
      user: "user456",
      price: 150,
      host: {
        hostName: "Jane",
        superHost: true,
        responseRate: 20,
        reviews: 3,
        rating: 70,
      },
    },
    {
      title: "Modern Villa",
      user: "user123",
      price: 500,
      host: {
        hostName: "Joshua",
        superHost: true,
        responseRate: 20,
        reviews: 3,
        rating: 70,
      },
    },
    {
      title: "Modern Villa",
      user: "user123",
      price: 500,
      host: {
        hostName: "Joshua",
        superHost: true,
        responseRate: 20,
        reviews: 3,
        rating: 70,
      },
    },
    {
      title: "Modern Villa",
      user: "user123",
      price: 500,
      host: {
        hostName: "Joshua",
        superHost: true,
        responseRate: 20,
        reviews: 3,
        rating: 70,
      },
    },
    {
      title: "Modern Villa",
      user: "user123",
      price: 500,
      host: {
        hostName: "Joshua",
        superHost: true,
        responseRate: 20,
        reviews: 3,
        rating: 70,
      },
    },
    {
      title: "Modern Villa",
      user: "user123",
      price: 500,
      host: {
        hostName: "Joshua",
        superHost: true,
        responseRate: 20,
        reviews: 3,
        rating: 70,
      },
    },
    {
      title: "Modern Villa",
      user: "user123",
      price: 500,
      host: {
        hostName: "Joshua",
        superHost: true,
        responseRate: 20,
        reviews: 3,
        rating: 70,
      },
    },
  ];
}
export default async function Page() {
  const lodges = await getLodges();
  const currentUserId = "user123";
  const userLodges = lodges.filter((lodge) => lodge.user === currentUserId);
  return (
    <div className="bg-[#0b0b0b] min-h-screen">
      <Profile_header />
      <LodgePage lodges={userLodges} />
      <Footer />
    </div>
  );
}
