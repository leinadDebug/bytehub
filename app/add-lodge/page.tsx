import Profile_header from "@/app/components/Header/Profile_header";
import Footer from "@/app/components/Footer/Footer";
import { LodgeFormWithPreview } from "../components/LodgeFormWithPreview";

type Props = {};

export default function AddLodgePage({}: Props) {
  return (
    <div className="">
      <Profile_header />
      <LodgeFormWithPreview />
      <Footer />
    </div>
  );
}
