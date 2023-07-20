"use client";

import Test from "./components/test";
import axios from "axios";
import Cookies from "js-cookie";

export default async function Home() {
  async function sendReq() {
    const response = await axios.post("http://localhost:4000/auth/sign-in", {
      email: `johndo1e1@example.com`,
      password: "sldfjsldfkj435$$",
    });
    const daysIn15Mins = 0.010416;
    Cookies.set("accessToken", response.data.accessToken, {
      expires: daysIn15Mins,
    });
  }

  return (
    <>
      <h1>home page</h1>
      <button
        className="border-blue-500 border px-4 py-2 rounded"
        onClick={sendReq}
      >
        send request!!!
      </button>
    </>
  );
}
