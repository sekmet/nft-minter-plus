import React from "react";
import PropTypes from "prop-types";

export default function CardAsset({
  Title,
  Description,
  IpfsHash
}) {
  return (
    <>
<section className="mx-auto p-6 md:p-12 antialiased">
        <article className="mx-auto max-w-md w-full sm:w-1/2 lg:w-1/3 py-6 px-3 cursor-pointer transform duration-500 hover:-translate-y-1">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="bg-cover bg-center h-80 -mt-32">
                    <div className="flex justify-end">
                      <img src="https://images.squarespace-cdn.com/content/v1/58dd442dbebafb88160c6929/1524859464600-90ZK15JJC3N47IZSR3MY/ke17ZwdGBToddI8pDm48kPvdHwxe8vxmYnjZvCzAU61Zw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpwxsJYjeBOStWfhZBaQGTlDOVYbSZjX976lCUHHLPdHUlrmON35exl807wLzw9VMGw/visit03.jpg?format=800w" />
                    </div>
                </div>
                <div className="p-4 py-5">
                    {/*<p className="uppercase tracking-wide text-sm font-bold text-gray-700">
                        Castlevania • 10000y old
                    </p>*/}
                    <p className="text-3xl text-gray-900 mt-1.5 mb-1.5">{Title}</p>
                    <p className="text-gray-700">{Description}</p>
                </div>
                <div className="px-4 py-3 pt-3 pb-4 border-t border-gray-200 bg-gray-100">
                    <div className="text-xs uppercase font-bold text-gray-600 tracking-wide">
                        IPFS Hash
                    </div>
                    <div className="flex items-center pt-2">
                        <div className="bg-cover bg-center w-5 h-5 text-sm text-white inline-flex items-center justify-center rounded-full mr-3">
                          <img className="w-full rounded-full align-middle border-none shadow-lg" src="https://www.ipfsbox.org/Telegram_%20Join%20Group%20Chat_files/logo.jpg" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-100">mtwirsqawjuoloq2gvtyuDEDsded....</p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </section>
    </>
  );
}

CardAsset.defaultProps = {
  Title: "Traffic",
  Description: "350,897",
};

CardAsset.propTypes = {
  Title: PropTypes.string,
  Description: PropTypes.string,
};