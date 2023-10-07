"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  useEffect(() => {
    const getPromptDetails = async () => {
      const res = await fetch(`api/prompt/${promptId}`);
      const data = await res.json();
      setPost({ prompt: data.prompt, tag: data.tag });
    };

    if (promptId) {
      getPromptDetails();
    }
  }, [promptId]);

  const router = useRouter();

  const editPrompt = async (e) => {
    e.preventDefault();

    //ID is not exist, exit
    if (!promptId) {
      alert("Prompt ID is not exist");
      return router.back();
    }

    setSubmitting(true);

    //post 전달 -> 먼저 backend 경로생성(api/prompt/new)+ route.js 해야 + 인증확인
    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      // const data = await res.json();
      if (res.ok) {
        router.back();
      }
    } catch (err) {
      console.log("err in edit prompt", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPrompt}
    />
  );
};

export default EditPrompt;
