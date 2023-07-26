"use client";

import Cookies from "js-cookie";
import Link from "next/link";
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

  if (!hasLoaded) {
    return <div>Loading...</div>;
  }

  if (!username || !accessToken || !refreshToken) {
    return (
      <Link href="/sign-in">
        <div>Sign in</div>
      </Link>
    );
  }

  return <>Signed in as {username}</>;
}
