import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

function Header() {
  const { use, isLoaded, isSignedIn } = useUser();

  return (
    <div className="p-3 px-5 flex justify-between shadow-md bg-gray-50 sticky top-0 z-50">
      {/* Logo */}
      <Link to={"/"}>
        <img
          src="/logo.png"
          alt="IntelliCV"
          width={150}
          height={150}
          className="rounded-full"
        />
      </Link>

      {isSignedIn ? (
        <div className="flex gap-2 items-center">
          <Link to={"/dashboard"}>
            <Button variant="outline" className="cursor-pointer">
              Dashboard
            </Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to={"/auth/sign-in"}>
          <Button className="cursor-pointer mt-5">Get Started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
