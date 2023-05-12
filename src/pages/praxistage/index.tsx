import Head from "next/head";
import { praxisData } from "../../../lib/praxisData";
import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { DayProps } from "@/types";
import { ALERT_MESSAGE, HEAD_TITLE } from "../../../lib/head";

const Day = ({ previewpic, date, thema, tag }: DayProps) => {
  const LazyImage = dynamic(() => import("next/image"), {
    ssr: false,
  });

  return (
    <Link href={`/praxistage/${tag}`}>
      <div className="border border-gray-300 rounded-md cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
        <LazyImage
          src={previewpic}
          alt=""
          className="w-full h-auto object-cover rounded-t-md"
          style={{ maxHeight: "14rem", minHeight: "14rem" }}
          width={500}
          height={500}
          loading="lazy"
        />
        <div className="p-4">
          <div className="text-lg text-gray-400 font-medium">{date}</div>
          <div className="text-sm text-gray-400">{thema}</div>
        </div>
      </div>
    </Link>
  );
};

const Praxistage = () => {
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(true);

  const filteredPraxisData = praxisData.filter((day) =>
    day.thema.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showModal]);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Head>
        <title>{HEAD_TITLE}</title>
        <meta property="og:title" content={HEAD_TITLE} />

        <meta property="og:image" content={`/logo.png`} />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
      </Head>
      <div className="bg-gray-900 text-white min-h-screen">
        {showModal && (
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-800 opacity-90"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              &#8203;
              <div
                className="inline-block align-bottom bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="mt-5 mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Willkommen</h2>
                  <p className="text-gray-400 text-base">
                    {ALERT_MESSAGE}
                  </p>
                </div>
                <div className="mt-5 sm:mt-6 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium                 rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2"
                    onClick={() => closeModal()}
                  >
                    OK
                  </button>
                  <Link href="/">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ml-2"
                    >
                      Abbrechen
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          className={`mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-screen-xl ${
            showModal ? "z-50 opacity-25" : ""
          }`}
        >
          <div className={`${showModal ? "opacity-25" : ""}`}>
            <h2 className="text-2xl font-semibold mb-4">Praxistage</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Thema filtern"
                className="w-full py-2 pl-10 pr-4 rounded-md border-2 border-gray-700 text-white focus:outline-none focus:border-blue-500 bg-gray-800"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              <svg
                className="h-5 w-5 text-gray-500 absolute top-1/2 left-3 transform -translate-y-1/2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.5 15a6.5 6.5 0 100-13 6.5 6.5 0 000 13zM15 9.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${
              showModal ? "opacity-25" : ""
            }`}
          >
            {filteredPraxisData.map((day, index) => (
              <Day key={index} {...day} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Praxistage;
