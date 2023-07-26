"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function NameOrSignInButton() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const accessToken = Cookies.get("accessToken") ?? null;
  const refreshToken = Cookies.get("refreshToken") ?? null;

  useEffect(() => {
    setHasLoaded(true);
    setUsername(localStorage.getItem("username"));
  }, []);

  console.log(`username ${username}`);
  console.log(`accessToken ${accessToken}`);
  console.log(`refreshToken ${refreshToken}`);

  if (!hasLoaded) {
    return <div>Loading...</div>;
  }

  if (!username || !accessToken || !refreshToken) {
    return <button>Sign in</button>;
  }

  return <>Signed in as {username}</>;
}
