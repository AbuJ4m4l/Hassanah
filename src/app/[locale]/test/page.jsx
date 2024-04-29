import React from "react";

const page = () => {
  return (
    <>
      <div class="flex items-center justify-between px-4 py-2 bg-black text-white">
        <div>New!</div>
        <div class="text-lg font-semibold">
          Alif-Lam-Mim.<sup>1</sup>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7 10a1 1 0 01.707-.293l7-7a1 1 0 011.414 1.414L10.414 10l5.707 5.707a1 1 0 01-1.414 1.414l-7-7A1 1 0 017 10z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default page;
