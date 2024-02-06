"use client";

import Form from "@/components/Form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UpdatePrompt = ({ searchParams }) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [prompt, setPrompt] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    fetch(`/api/prompt/${searchParams.id}`)
      .then((res) => res.json())
      .then((data) => setPrompt(data));
  }, [searchParams.id]);

  const handleUpdatePrompt = async (e) => {
    e.preventDefault();

    if (!searchParams.id) {
      console.log("Please provide a valid prompt id");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/prompt/${searchParams.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: prompt.prompt,
          tag: prompt.tag,
        }),
      });

      if (res.ok) {
        //    Navigate user to homepage
        router.push("/");
      }
    } catch (error) {
      console.log(`Error updating prompt with ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      prompt={prompt}
      setPrompt={setPrompt}
      submitting={submitting}
      handleCreatePrompt={handleUpdatePrompt}
    />
  );
};

export default UpdatePrompt;
