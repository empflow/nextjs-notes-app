"use client";
import axios from "axios";

export default function Test() {
  async function sendReq() {
    try {
      const email = `${String(Math.random())}@tutanota.com`;
      const password = "LKSJDFklsjdfl4345$$$";
      const res = await axios.post(
        "http://localhost:3000/auth/sign-up",
        { email, password }
      )
      console.log(res.data);
      console.log(res.headers);
    } catch (err) {
      console.error(err);
    }
    const res = await fetch(
      "http://localhost:3000/auth/sign-up",
      {
        method: "POST",
        body: JSON.stringify({ email: `${String(Math.random())}@tutanota.com`, "password": "LKSJDFklsjdfl4345$$$" }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
  }

  return (
    <>
      <button
        className="border border-red-600 rounded px-3 py-1"
        onClick={sendReq}
      >Send</button>
    </>
  )
}

