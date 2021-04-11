import React from "react";

// components
import CardAssetForm from "../../components/Cards/CardAssetForm";
import CardUpload from "../../components/Cards/CardUpload";

// layout for page
import Admin from "../../layouts/AdminNoStats";

export default function NewAsset() {
  return (
    <>
    <div className="flex flex-wrap">
      <div className="w-full lg:w-6/12 px-4  mt-16">
        <CardAssetForm />
      </div>
      <div className="w-full lg:w-6/12 px-4  mt-16">
        <CardUpload />
      </div>
    </div>
  </>
  );
}

NewAsset.layout = Admin;
