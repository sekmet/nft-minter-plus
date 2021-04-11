import React from "react";
import { GetStaticProps } from "next";
import Post, { PostProps } from "../../components/Post";
import prisma from '../../lib/prisma'
// components
import CardSocialTraffic from "../../components/Cards/CardSocialTraffic";
import CardAssets from "../../components/Cards/CardAssets";
// layout for page
import Admin from "../../layouts/AdminNoStats";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: {
      published: false,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return {
    props: { feed },
  };
};

type Props = {
  feed: PostProps[];
};

export default function Dashboard(props) {

  return (
    <>
      <div className="flex flex-wrap">
      <div className="w-full xl:w-12/12 px-4">

        <CardAssets feed={props.feed} />

        </div>
      </div>
      {/*<div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
   
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>*/}
    </>
  );
}

Dashboard.layout = Admin;
