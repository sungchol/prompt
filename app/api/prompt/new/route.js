import connectDB from "@utils/database";
import Prompt from "@models/prompt";

// fetch --> api/prompt/new --> post를 받아 처리하는 함수
// prompt: post.prompt, ---> prompt
// userId: session?.user.id, --> creator
// tag: post.tag, --- tag

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();

  // console.log("req.json :", req.json());

  try {
    await connectDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();

    // const newPrompt = await Prompt.create({
    //   creator: userId,
    //   prompt,
    //   tag,
    // });

    // status: 201 : success to create new prompt
    // console.log("newPrompt :", newPrompt);

    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (error) {
    console.log("Err in prompt new route.js  : ", error);
    // status: 500 : failed to create new prompt
    return new Response("Failed to create new prompt", {
      status: 500,
    });
  }
};
