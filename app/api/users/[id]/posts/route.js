import connectDB from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    // console.log("user params", params);
    // console.log("user prompts:", prompts);

    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Failed to fetch all prompts", {
      status: 500,
    });
  }
};
