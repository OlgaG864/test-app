import React, { useEffect, useRef, useState } from "react";
import AppSearchForm from "../form/AppSearchForm";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks";

export default function Header({ onAddActorClick, onAddMovieClick }) {
  const [showOptions, setShowOptions] = useState(false);
  const { toggleTheme } = useTheme();
  const navigate = useNavigate();
  const options = [
    { title: "Add Movie", onClick: onAddMovieClick },
    { title: "Add Actor", onClick: onAddActorClick },
  ];

  const handleSearchSubmit = (query) => {
    if (!query.trim()) return;

    navigate("/search?title=" + query);
  };
  return (
    <div className="flex items-center justify-between relative">
      <AppSearchForm
        onSubmit={handleSearchSubmit}
        placeholder="Search Movies..."
      />
      <input
        type="text"
        className="border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-main dark:text-white transition
         bg-transparent rounded text-lg p-1 outline-none"
        placeholder="Search Movies..."
      />

      <div className="flex items-center space-x-3">
        <button
          onClick={toggleTheme}
          className="dark:bg-white bg-dark-subtle p-1 rounded"
        >
          <i className="bi bi-brightness-high-fill"></i>
        </button>

        <button
          onClick={() => setShowOptions(true)}
          className="flex items-center space-x-2 dark:border-dark-subtle border-light-subtle dark:text-dark-subtle text-light-subtle hover:opacity-80 transition font-semibold border-2 rounded text-lg px-3 py-1"
        >
          <span>Create</span>
          <i className="bi bi-plus"></i>
        </button>

        <CreateOptions
          visible={showOptions}
          onClose={() => setShowOptions(false)}
          options={options}
        />
      </div>
    </div>
  );
}

const CreateOptions = ({ options, visible, onClose }) => {
  const container = useRef();
  const containerID = "options-container";

  useEffect(() => {
    const handleClose = (e) => {
      if (!visible) return;
      const { parentElement, id } = e.target;

      if (parentElement.id === containerID || id === containerID) return;

      if (container.current) {
        if (!container.current.classList.contains("animate-scale"))
          container.current.classList.add("animate-scale-reverse");
      }
    };

    document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, [visible]);

  const handleClick = (fn) => {
    fn();
    onClose();
  };

  if (!visible) return null;

  return (
    <div
      id={containerID}
      ref={container}
      className="absolute right-0 z-50 top-12 flex flex-col space-y-3 p-5 dark:bg-second bg-white drop-shadow-lg rounded animate-scale"
      onAnimationEnd={(e) => {
        if (e.target.classList.contains("animate-scale-reverse")) onClose();
        e.target.classList.remove("animate-scale");
      }}
    >
      {options.map(({ title, onClick }) => {
        return (
          <Option key={title} onClick={() => handleClick(onClick)}>
            {title}
          </Option>
        );
      })}
    </div>
  );
};

const Option = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="dark:text-white text-second hover:opacity-80 transition"
    >
      {children}
    </button>
  );
};
