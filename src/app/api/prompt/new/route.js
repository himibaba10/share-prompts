import { connectToDatabase } from "@/lib/database";
import Prompt from "@/models/prompt";

export const POST = async (req) => {
  const { prompt, userId, tag } = await req.json();

  try {
    await connectToDatabase();

    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response(`Error connecting to database or creating prompt`, {
      status: 500,
    });
  }
};
