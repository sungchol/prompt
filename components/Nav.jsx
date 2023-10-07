"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
} from "next-auth/react";

const Nav = () => {
  // const isUserLoggedIn = true;
  const { data: session } = useSession();

  console.log("Nav session1", session);
  const [providers, setProviders] = useState(null);
  //작은화면에서 toggle 여부 체크
  const [toggleDropdown, setToggleDropdown] = useState(false);
  //로그인인증 얻어오기
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      console.log("getProvider response", response);

      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          className="object-contain"
          alt="Promptopia Logo"
          width={30}
          height={30}
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      {/* {alert(providers)} */}

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {/* //로그인 되어 있는 상태면, */}

        {session?.user !== undefined ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                alt="profile"
                className="rounded-full"
              ></Image>
            </Link>
          </div>
        ) : (
          // log in 안된 상태인 경우
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    type="button"
                    key={provider.name}
                    className="black_btn"
                    onClick={() => signIn(provider.id)}
                  >
                    Sign In
                  </button>
                );
              })}
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user !== undefined ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              alt="profile"
              className="rounded-full"
              // 직접 toggleDropdown=> !toggleDropdown 이렇게 하면 안됨
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {/* //if toggleDropdown is true */}
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  className="mt-2 w-full black_btn"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};
export default Nav;
