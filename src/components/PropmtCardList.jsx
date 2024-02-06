import React from "react";
import PromptCard from "./PromptCard";

const PropmtCardList = ({ prompts, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {prompts?.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

export default PropmtCardList;
