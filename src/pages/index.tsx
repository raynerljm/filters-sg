import { type NextPage } from "next";
import { useRouter } from "next/router";
import type { ChangeEvent } from "react";
import { useState } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const [sheetsLink, setSheetsLink] = useState("");

  const handleChangeSheetsLink = (event: ChangeEvent<HTMLInputElement>) => {
    setSheetsLink(event.target.value);
  };

  const handleFilter = () => {
    if (isInvalidLink(sheetsLink)) {
      return;
    }
    const sheetId = extractSheetId(sheetsLink);
    void router.push(sheetId);
  };

  const isInvalidLink = (sheetsLink: string) => {
    return sheetsLink === "";
  };

  const extractSheetId = (sheetsLink: string) => {
    return sheetsLink.split("/")[5] || "";
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            FiltersSG
          </h1>
          <div className="flex flex-col items-center gap-2 text-white">
            <label>Enter your Google Sheets link here</label>
            <input
              value={sheetsLink}
              onChange={handleChangeSheetsLink}
              className="bg-white px-2 py-1 text-sm text-black"
            />
            <button
              className="w-min rounded-md bg-blue-600 px-4 py-1 text-white"
              onClick={handleFilter}
            >
              Filter
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
