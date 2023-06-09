import React, { useState } from "react";
import Submit from "./Submit";

const ratings = new Array(10).fill("");
export default function RatingForm({ busy, onSubmit }) {
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [content, setContent] = useState("");

  const handleMouseEnter = (index) => {
    const ratings = new Array(index + 1).fill("");
    setSelectedRatings([...ratings]);
  };

  const handleOnChange = ({ target }) => {
    setContent(target.value);
  };

  const handleSubmit = () => {
    if (!selectedRatings.length) return;
    const data = {
      rating: selectedRatings.length,
      content,
    };

    onSubmit(data);
  };

  return (
    <div>
      <div className="p-5 dark:bg-main rounded space-y-3">
        <div className="text-highlight dark:text-highlight-dark flex items-center relative">
          <StarsOutlined ratings={ratings} onMouseEnter={handleMouseEnter} />
          <div className="flex items-center absolute top-1/2 -translate-y-1/2">
            <StarsFilled
              ratings={selectedRatings}
              onMouseEnter={handleMouseEnter}
            />
          </div>
        </div>

        <textarea
          value={content}
          onChange={handleOnChange}
          className="w-full h-24 border-2 p-2 dark:text-white text-main rounded outline-none bg-transparent resize-none"
        ></textarea>

        <Submit busy={busy} onClick={handleSubmit} value="Rate This Movie" />
      </div>
    </div>
  );
}

const StarsOutlined = ({ ratings, onMouseEnter }) => {
  return ratings.map((_, index) => {
    return (
      <i
        className="bi bi-star cursor-pointer"
        onMouseEnter={() => onMouseEnter(index)}
        key={index}
        size={24}
      ></i>
    );
  });
};

const StarsFilled = ({ ratings, onMouseEnter }) => {
  return ratings.map((_, index) => {
    return (
      <i
        className="bi bi-star cursor-pointer"
        onMouseEnter={() => onMouseEnter(index)}
        key={index}
        size={24}
      />
    );
  });
};
