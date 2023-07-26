"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function signUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: `johndoe@example.com`,
    password: "sldfjsldfkj435$$",
  });

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const response = await axios.post(
      "http://localhost:3001/auth/sign-in",
      formData
    );
    const { data } = response;

    const daysIn15Mins = 0.010416;
    const ninetyDays = 90;
    const refreshToken = JSON.stringify(data.refreshToken);

    if (!data.accessToken || !data.refreshToken || !data.username) {
      throw new Error("something is not present in the response");
    }

    Cookies.set("accessToken", data.accessToken, {
      expires: daysIn15Mins,
    });
    Cookies.set("refreshToken", refreshToken, { expires: ninetyDays });
    localStorage.setItem("username", data.username);
    router.replace("/");
  }

  function onEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
  }

  function onPasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, password: e.target.value }));
  }

  return (
    <>
      <h1>Sign up</h1>
      <form onSubmit={onSubmit} className="max-w-xl">
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="px-2 py-1 border border-blue-600 rounded"
            value={formData.email}
            onChange={onEmailChange}
            id="email"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            value={formData.password}
            onChange={onPasswordChange}
            id="password"
            className="px-2 py-1 border border-blue-600 rounded"
          />
        </div>
        <div>
          <button className="px-8 py-1 bg-blue-600 hover:bg-blue-700 duration-200 text-white rounded">
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}
