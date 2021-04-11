import React, { useState } from "react";
import Router from "next/router";

// components

export default function CardAssetForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorid, setAutorid] = useState(2);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      await fetch(`http://localhost:3000/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      //await Router.push("/admin/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Create your NFT</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form  onSubmit={submitData}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Create a New Token
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Token Name
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Your NFT name"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </div>
              </div>

              <div className="w-full lg:w-12/12 px-4 mt-8">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Description
                  </label>
                  <textarea
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={(e) => setContent(e.target.value)}
                    rows={8}
                    value={content}
                    placeholder="My awesome new creation... :)"
                  ></textarea>
                </div>
              </div>

              <div className="w-full lg:w-12/12 px-4 mt-8">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    IPFS Hash
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="mtwirsqawjuoloq2gvtyuDEDsded...."
                  />
                </div>
              </div>

            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Your Asset Properties
            </h6>
            <div className="flex flex-wrap mb-24">
              <h3>Proprties Here</h3>
            </div>


            <hr className="mt-6 border-b-1 border-blueGray-300 pb-6" />
            <div className="text-center flex justify-between">
            <input type="hidden" value={authorid} name="authorId" />
            <input disabled={!content || !title} type="submit" value="Save NFT Information" className="bg-green-500 active:bg-green-300 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" />
              <a className="back" href="#" onClick={() => Router.push("/")}>
                or Cancel
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
