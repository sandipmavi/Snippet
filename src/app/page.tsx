import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link"; // Import Next.js Link

const Home = async () => {
  const snippets = await prisma.snippet.findMany();
  return (
    <div>
      
        <h1 className="font-bold text-4xl">Home</h1>
      
      <div className="flex items-center justify-between p-2">
        <h1>Snippets</h1>
        <Link href="/snippet/new">
          <Button className="bg-black text-white">New</Button>
        </Link>
      </div>
      {snippets.map((snipp) => (
        <div
          key={snipp.id}
          className="mt-4 flex items-center justify-between gap-4 bg-gray-200 p-2 rounded-2xl"
        >
          <h1>{snipp.title}</h1>
          <Link href={`/snippet/${snipp.id}`}>
            <Button className="bg-black text-white">View</Button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
