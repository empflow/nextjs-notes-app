"use client";

import axios from "../../config/axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import Link from "next/link";
import BigBtn from "@/app/components/buttons/Big";
import ReCAPTCHA from "react-google-recaptcha";
import { useTheme } from "next-themes";
import getCaptchaTheme from "@/app/utils/getCaptchaTheme";

export default function SignInForm() {
  const { resolvedTheme } = useTheme();
  const theme = getCaptchaTheme(resolvedTheme);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: `johndoe@example.com`,
    password: "sldfjsldfkj435$$",
  });
  const captchaRef = useRef<ReCAPTCHA>(null);

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    const captchaToken = await captchaRef.current?.executeAsync();
    captchaRef.current?.reset();
    setIsLoading(true);

    const payload = { ...formData, captchaToken };
    const response = await axios.post("/auth/sign-in", payload);
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
            Don't have an account?{" "}
            <Link className="text-l-accent dark:text-d-accent" href="/sign-up">
              Sign up
            </Link>
          </p>

          <div>
            <BigBtn className="w-full">
              {isLoading ? "Loading..." : "Sign in"}
            </BigBtn>
          </div>
        </div>
      </form>
    </>
  );
}

function areAllInputsFilled(formData: Record<string, unknown>) {
  const values = Object.values(formData);
  return values.every((val) => !!val);
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
