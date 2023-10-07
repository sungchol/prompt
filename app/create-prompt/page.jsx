"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const router = useRouter();
  const { data: session } = useSession();

  const createPrompt = async (e) => {
    e.preventDefault();
    // const test = document.getElementById("test");
    // const newtag = document.createElement("p");
    // newtag.textContent = "test";
    // test.appendChild(newtag);
    // router.push("/");

    // console.log("post value : ", post);

    setSubmitting(true);

    //post 전달 -> 먼저 backend 경로생성(api/prompt/new)+ route.js 해야 + 인증확인
    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });
      // const data = await res.json();
      if (res.ok) {
        router.push("/");
      }
    } catch (err) {
      console.log("err in create prompt", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
