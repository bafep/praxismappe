import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { FiFile, FiFileText } from "react-icons/fi";
import Head from "next/head";
import { DayProps, DocumentProps } from "@/types";

const ConfirmationModal = ({
  show,
  message,
  onCancel,
  onConfirm,
}: {
  show: boolean;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  if (!show) return null;

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal panel */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <FiFile size={32} className="text-red-600" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Download
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onConfirm}
            >
              OK
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onCancel}
            >
              Abbrechen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Day = ({ previewpic, date, thema, description, documents }: DayProps) => {
  const [selectedDoc, setSelectedDoc] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleDocClick = (docPath: string) => {
    const extension = docPath.split(".").pop();
    if (
      ["png", "jpg", "jpeg", "gif"].includes(extension?.toLowerCase() || "")
    ) {
      setSelectedDoc(docPath);
      setShowPreview(true);
    } else if (["pdf", "docx"].includes(extension?.toLowerCase() || "")) {
      setSelectedDoc(docPath);
      setShowConfirmationModal(true);
    } else {
      window.open(docPath, "_blank");
    }
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setSelectedDoc("");
  };

  return (
    <>
      <Head>
        <title>{`${date}`}</title>
        <meta name="description" content={`${description}`} />
        <meta property="og:description" content={`${description}`} />
        <meta property="og:title" content={`TK - KGP`} />

        <meta property="og:image" content={previewpic} />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta
          property="og:url"
          content={`https://kgp-tk.vercel.app/praxistage/${date}
          )}`}
        />
      </Head>
      <div className="bg-gray-900 text-white min-h-screen">
        {showPreview && selectedDoc && (
          <div
            className="fixed z-50 inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
            onClick={handleClosePreview}
          >
            <div
              className="bg-gray-900 rounded-lg shadow-lg overflow-hidden absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClosePreview}
                className="absolute top-2 right-2 text-white hover:text-gray-300 focus:outline-none"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <img
                src={selectedDoc}
                alt=""
                className="w-full h-screen max-h-full object-contain"
              />
            </div>
          </div>
        )}

        <div className="px-8 py-6 flex justify-between items-center">
          <img src="/logo.png" alt="" className="h-12" />
          <div>
            <div className="text-lg font-bold">{date}</div>
            <div className="text-sm">{thema}</div>
          </div>
        </div>

        <div className="px-8 py-6 flex flex-col items-center">
          {!showPreview && (
            <img
              src={previewpic}
              alt=""
              className="w-96 h-auto mb-4 rounded-lg shadow-lg cursor-pointer"
              onClick={() => handleDocClick(previewpic)}
            />
          )}

          {description && (
            <div className="mt-8 w-full">
              <h2 className="text-lg font-semibold">Beschreibung</h2>
              <p className="text-sm">{description}</p>
            </div>
          )}

          {documents && documents.length > 0 ? (
            <div className="w-full mt-8">
              <h2 className="text-lg font-semibold mb-4">Dokumente</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {documents.map((doc) => (
                  <div
                    key={doc.name}
                    className="flex flex-col items-center justify-start rounded-lg py-4 px-6 bg-white text-gray-900 shadow-lg cursor-pointer"
                    onClick={() => handleDocClick(doc.path)}
                  >
                    {doc.type === "pdf" ? (
                      <FiFile size={32} className="mb-2" />
                    ) : (
                      <FiFileText size={32} className="mb-2" />
                    )}
                    <div className="text-sm font-semibold">
                      {doc.name.split(".")[0]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-screen">
              Oops, hier gibt es noch nichts zu sehen.
            </div>
          )}
        </div>

        {selectedDoc && (
          <ConfirmationModal
            show={showConfirmationModal}
            message="Möchtest du das Dokument herunterladen?"
            onCancel={() => setShowConfirmationModal(false)}
            onConfirm={() => {
              setShowConfirmationModal(false);
              window.open(selectedDoc, "_blank");
            }}
          />
        )}
      </div>
    </>
  );
};

const PraxistageDay: NextPage<DayProps> = ({ ...day }) => {
  const [documents, setDocuments] = useState<DocumentProps[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/${day.tag}`);
      const data = await res.json();
      setDocuments(data.documents);
    }
    fetchData();
  }, [day.tag]);

  return <Day {...day} documents={documents} />;
};

export async function getServerSideProps({ params }: any) {
  const { tag } = params;

  // Find the day that matches the tag
  const praxisData = require("../../../lib/praxisData").praxisData;
  const day = praxisData.find((d: DayProps) => d.tag === tag);

  return {
    props: {
      ...day,
    },
  };
}

export default PraxistageDay;
