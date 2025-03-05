import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";

const CreateSnippet = () => {
  async function createNewSnippet(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;
    const snippet = await prisma.snippet.create({
      data: {
        title,
        code,
      },
    });
    console.log("created snippet", snippet);
    redirect("/");
  }
  return (
    <form
      className="flex flex-col gap-4 p-5 border-2 rounded"
      action={createNewSnippet}
    >
      <div>
        <Label className="ml-4 p-2">Title:</Label>
        <Input type="text" name="title" id="title" />
      </div>
      <div>
        <Label className="ml-4 p-2">Code:</Label>
        <Textarea name="code" id="code" />
      </div>
      <Button type="submit" className="bg-black text-white my-4 ">
        New
      </Button>
    </form>
  );
};

export default CreateSnippet;
