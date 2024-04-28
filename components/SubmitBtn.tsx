"use client";

import { useFormStatus } from "react-dom";

export default function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="btn_component text-xl md:text-2xl px-14 py-1 rounded-md font-medium text-white hover:opacity-70"
    >
      {pending ? "Estimating..." : "Estimate"}
    </button>
  );
}
