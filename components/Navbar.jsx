"use client";
import React from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, useUser, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { isSeller, router } = useAppContext();
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      {/* Logo */}
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push("/")}
        src={assets.logo}
        alt="logo"
      />

      {/* Desktop Navigation Links */}
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          Contact
        </Link>
        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      {/* Desktop Right Side */}
      <ul className="hidden md:flex items-center gap-4">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />

        {isSignedIn ? (
          <UserButton
            afterSignOutUrl="/"
            appearance={{ elements: { userButtonPopoverFooter: "hidden" } }}
          >
            <UserButton.MenuItems>
              {/* ✅ Home */}
              <UserButton.Action
                label="Home"
                onClick={() => router.push("/")}
                labelIcon={
                  <Image
                    src={assets.home_icon}
                    alt="Home"
                    width={20}
                    height={20}
                  />
                }
              />
              {/* ✅ All Products / Shop */}
              <UserButton.Action
                label="All Products"
                onClick={() => router.push("/all-products")}
                labelIcon={
                  <Image
                    src={assets.shop_icon}
                    alt="All Products"
                    width={20}
                    height={20}
                  />
                }
              />
              {/* ✅ Cart */}
              <UserButton.Action
                label="Cart"
                onClick={() => router.push("/cart")}
                labelIcon={
                  <Image
                    src={assets.cart_icon}
                    alt="Cart"
                    width={20}
                    height={20}
                  />
                }
              />
              {/* ✅ My Orders */}
              <UserButton.Action
                label="My Orders"
                onClick={() => router.push("/my-orders")}
                labelIcon={
                  <Image
                    src={assets.box_icon}
                    alt="My Orders"
                    width={20}
                    height={20}
                  />
                }
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </ul>

      {/* Mobile Right Side */}
      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}

        {isSignedIn ? (
          <UserButton
            afterSignOutUrl="/"
            appearance={{ elements: { userButtonPopoverFooter: "hidden" } }}
          >
            <UserButton.MenuItems>
              <UserButton.Action
                label="Home"
                onClick={() => router.push("/")}
                labelIcon={<HomeIcon />}
              />
              <UserButton.Action
                label="All Products"
                onClick={() => router.push("/all-products")}
                labelIcon={<BoxIcon />}
              />
              <UserButton.Action
                label="Cart"
                onClick={() => router.push("/cart")}
                labelIcon={<CartIcon />}
              />
              <UserButton.Action
                label="My Orders"
                onClick={() => router.push("/my-orders")}
                labelIcon={<BagIcon />}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
