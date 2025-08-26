import Profile_header from "@/app/components/Header/Profile_header";
import Footer from "@/app/components/Footer/Footer";
import { LodgeFormWithPreview } from "../components/LodgeFormWithPreview";

type Props = {};

export default function AddLodgePage({}: Props) {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex flex-col">
      <div className="px-5 md:px-10 lg:px-20 flex-grow">
        <Profile_header />
        <main className="max-w-7xl mx-auto">
          <LodgeFormWithPreview />
        </main>
      </div>
      <Footer />
    </div>
  );
}
