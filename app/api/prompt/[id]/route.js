//api/prompt/[id]

import connetToDB from "@utils/database";
import Prompt from "@models/prompt";

//GET : read
export const GET = async (req, { params }) => {
  try {
    // connect to database
    await connetToDB();
    // fetch data
    const prompts = await Prompt.findById(params.id).populate(
      "creator"
    );

    // not exists
    if (!prompts) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }

    // data exists
    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Failed to fetch prompts", {
      status: 500,
    });
  }
};

//PATCH : update
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    // connect to database
    await connetToDB();

    // fetch data
    const existingPrompt = await Prompt.findById(params.id);

    // not exists ==> response 404
    if (!existingPrompt) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }

    // update prompt
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    // save a updated data
    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to update prompt", {
      status: 500,
    });
  }
};

//DELETE : delete
export const DELETE = async (req, { params }) => {
  try {
    // connect to database
    await connetToDB();
    // delete prompt
    const deletePrompt = await Prompt.findByIdAndRemove(params.id);

    // return success
    return new Response("Prompt deleted", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
