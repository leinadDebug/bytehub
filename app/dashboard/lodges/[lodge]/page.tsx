// NO 'use client' here!

import LodgeDetails from "@/app/components/LodgeDetails";

interface LodgePageProps {
  params: Promise<{ lodge: string }>;
}

async function getLodge(id: string) {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/api/lodges/${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function LodgePage({ params }: LodgePageProps) {
  const { lodge } = await params;
  const lodgeData = await getLodge(lodge);
  if (!lodgeData) return <div>Not found</div>;

  return <LodgeDetails lodge={lodgeData} />;
}
