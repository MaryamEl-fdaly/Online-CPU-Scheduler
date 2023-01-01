import React from "react";

const InputTextField = ({ title, placeholder, id }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="default-input"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {title}
      </label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        className="outline-none text-xs hover:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-cyan-500 block w-full px-2.5 py-2"
      />
    </div>
  );
};

export default InputTextField;
