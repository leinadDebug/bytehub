import React from "react";

const FilterSection = () => {
  return (
    <div className="max-w-full flex">
      <input
        className="p-3 px-10 font-medium rounded-full bg-transparent text-white border-white mx-auto w-[70%] mb-4"
        placeholder="filter by:"
      />
    </div>
  );
};

export default FilterSection;
