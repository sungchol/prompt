import React from "react";
import { PromptCard } from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  console.log("profile data", data);

  return (
    <section className="w-full">
      <h1 className="head_text pb-4 blue_gradient">{name} profile</h1>
      <p className="desc text-left text-gray-600">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map((item) => (
          <PromptCard
            key={item._id}
            post={item}
            handleEdit={() => handleEdit && handleEdit(item)}
            handleDelete={() => handleDelete && handleDelete(item)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
