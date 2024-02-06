"use client";

import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [prompts, setPrompts] = useState([]);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user.id) {
      fetch(`/api/users/${session.user.id}/prompts`)
        .then((res) => res.json())
        .then((data) => setPrompts(data));
    }
  }, [session?.user.id]);

  const handleEdit = (prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };

  const handleDelete = async (prompt) => {
    console.log(prompt);

    try {
      const res = await fetch(`/api/prompt/${prompt._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const filteredPrompts = prompts.filter((p) => p._id !== prompt._id);
        setPrompts(filteredPrompts);
        alert("Deleted");
      }
    } catch (error) {
      console.log(`Error deleting prompt with ${error.message}`);
    }
  };

  return (
    <Profile
      name={session?.user.name}
      desc={"Welcome to your personalized profile page"}
      prompts={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};
export default ProfilePage;
