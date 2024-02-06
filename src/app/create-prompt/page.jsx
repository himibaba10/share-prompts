"use client";

import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreatePrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [prompt, setPrompt] = useState({
    prompt: "",
    tag: "",
  });

  const handleCreatePrompt = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: prompt.prompt,
          userId: session?.user.id,
          tag: prompt.tag,
        }),
      });

      if (res.ok) {
        //    Navigate user to homepage
        router.push("/");
      }
    } catch (error) {
      console.log(`Error creating prompt with ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      prompt={prompt}
      setPrompt={setPrompt}
      submitting={submitting}
      handleCreatePrompt={handleCreatePrompt}
    />
  );
};

export default CreatePrompt;
