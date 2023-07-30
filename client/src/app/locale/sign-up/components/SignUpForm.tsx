"use client";

import BigBtn from "@/app/components/buttons/Big";
import getCaptchaTheme from "@/utils/getCaptchaTheme";
import axios from "../../../../config/axios";
import Cookies from "js-cookie";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function SignUpForm() {
  const { resolvedTheme } = useTheme();
  const theme = getCaptchaTheme(resolvedTheme);
  const captchaRef = useRef<ReCAPTCHA>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: `johndoe@example.com`,
    password: "sldfjsldfkj435$$",
  });

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    const captchaToken = await captchaRef.current?.executeAsync();
    captchaRef.current?.reset();
    setIsLoading(true);

    const payload = { ...formData, captchaToken };
    const response = await axios.post("/auth/sign-up", payload);
    const { data } = response;

    checkResponseData(data);
    storeResponseData(data);
    router.push("/notes");
  }

  function onEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
  }

  function onPasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, password: e.target.value }));
  }

  return (
    <>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
        size="invisible"
        ref={captchaRef}
        theme={theme}
      />
      <form onSubmit={onSubmit} className="max-w-md flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            className="px-3 py-2 rounded blue-outline"
            value={formData.email}
            onChange={onEmailChange}
            id="email"
            type={"email"}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            value={formData.password}
            onChange={onPasswordChange}
            id="password"
            className="px-3 py-2 rounded blue-outline"
            type={"password"}
          />
        </div>

        <div className="flex flex-col gap-3">
          <p>
            Already have an account?{" "}
            <Link className="text-l-accent dark:text-d-accent" href="/sign-in">
              Sign in
            </Link>
          </p>
          <div>
            <BigBtn className="w-full">
              {isLoading ? "Loading..." : "Sign up"}
            </BigBtn>
          </div>
        </div>
      </form>
    </>
  );
}

function checkResponseData(data: any) {
  if (!data.accessToken || !data.refreshToken || !data.username) {
    throw new Error("something is not present in the response");
  }
}

function storeResponseData(data: any) {
  const daysIn15Mins = 0.010416;
  const ninetyDays = 90;
  const refreshToken = JSON.stringify(data.refreshToken);

  Cookies.set("accessToken", data.accessToken, {
    expires: daysIn15Mins,
  });
  Cookies.set("refreshToken", refreshToken, { expires: ninetyDays });
  localStorage.setItem("username", data.username);
}
