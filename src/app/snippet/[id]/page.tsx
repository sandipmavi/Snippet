import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";
import { deleteSnippet } from "@/actions";

const SnippetDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = parseInt((await params).id);
  const snippet = await prisma.snippet.findUnique({
    where: {
      id,
    },
  });
  await new Promise((r) => setTimeout(r, 1000));
  if (!snippet) {
    return <p>No Data Found</p>;
  }
  const deleteSnippetActions = deleteSnippet.bind(null, snippet.id);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl">{snippet.title}</h1>
        <div className="flex items-center gap-2">
          <Link href={`/snippet/${id}/edit`}>
            <Button className="bg-black text-white">Edit</Button>
          </Link>
          <form action={deleteSnippetActions}>
            <Button type="submit" className="bg-red-600 text-white">
              Delete
            </Button>
          </form>
        </div>
      </div>
      <pre className="p-3 bg-gray-200 rounded border-gray-200 ">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
};

export default SnippetDetailPage;
