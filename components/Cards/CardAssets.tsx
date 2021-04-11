import React from "react";

// components

import CardAsset from "./CardAsset";

export default function HeaderStats({feed}) {
  return (
    <>
      {/* Header */}
      <div className="relative md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
            {feed.length ? feed.map((post) => (
              <div key={post.id} className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardAsset
                  Title={post.title}
                  Description={post.content}
                  IpfsHash="0x00000000000000000"
                />
              </div>
              )) : <div className="w-full xl:w-12/12 text-center mx-auto"><h3 className="text-3xl">No NFTs yet! :(</h3></div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
