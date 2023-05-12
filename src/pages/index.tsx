import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaInstagram } from "react-icons/fa";
import {
  BUTTON_TEXT,
  FOOTER_TEXT,
  GITHUB_NAME,
  HEAD_TITLE,
  INSTAGRAM_NAME,
  PAGE_BUTTONHEADING,
  PAGE_DESCRIPTION,
  PAGE_TITLE,
} from "../../lib/head";

export default function Home() {
  useEffect(() => {
    // disable scrolling
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-50">
      <header className="shadow-lg">
        <nav className="container mx-auto px-4 py-6 flex items-center justify-between relative">
          <div className="flex items-center">
            <a href="#" className="text-xl font-bold">
              {HEAD_TITLE}
            </a>
          </div>
          <p className="text-gray-300 absolute top-3 right-8">
            <Image src="/logo.png" width={50} height={50} alt="Logo" />
          </p>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="container mx-auto py-6 text-center">
          <h1
            className="text-4xl md:text-6xl font-bold"
            style={{ marginTop: "-5rem" }}
          >
            {PAGE_TITLE}
          </h1>
          <p className="mt-4 text-lg md:text-xl">{PAGE_DESCRIPTION}</p>
          <div className="mt-5">
            <p
              className="text-gray-500 text-sm md:text-base"
              style={{ marginTop: "-0.50rem" }}
            >
              {PAGE_BUTTONHEADING}
            </p>

            <Link href="/praxistage">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
                style={{ marginTop: "1rem" }}
              >
                {BUTTON_TEXT}
              </button>
            </Link>
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 py-4 fixed bottom-0 left-0 w-full z-10 md:relative md:bottom-auto md:left-auto md:w-auto">
        <div className="container mx-auto flex items-start justify-between px-4 flex-row md:flex-row">
          <p className="text-sm text-gray-300 mb-4 md:mb-0">{FOOTER_TEXT}</p>
          <div className="flex space-x-4">
            <a href={GITHUB_NAME} className="text-gray-300 hover:text-white">
              <FaGithub size={20} />
            </a>
            <a href={INSTAGRAM_NAME} className="text-gray-300 hover:text-white">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
