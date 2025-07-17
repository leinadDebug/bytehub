// NO 'use client' here!

import LodgeDetails from "@/app/components/LodgeDetails";

interface LodgePageProps {
  params: { lodge: string };
}

async function getLodge(id: string) {
  const res = await fetch(
    `https://6878e5f263f24f1fdc9fed51.mockapi.io/freeapi/Lodge/${id}`
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function LodgePage({ params }: LodgePageProps) {
  const lodge = await getLodge(params.lodge);
  if (!lodge) return <div>Not found</div>;

  return <LodgeDetails lodge={lodge} />;
}
