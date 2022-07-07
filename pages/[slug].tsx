import Head from "next/head";
import Image from "next/image";
import type { NextPage } from "next";
import { PrismaClient } from "@prisma/client";
import styles from "../styles/Home.module.css";

const prisma = new PrismaClient();

const Home: NextPage = () => {
  return <div>Hello</div>;
};

export async function getServerSideProps({ res, params }) {
  const url = await prisma.url.findFirst({
    where: {
      slug: params.slug,
    },
  });

  if (url) {
    await prisma.url.update({
      where: {
        id: url.id,
      },
      data: {
        viewed: true,
        viewedAt: new Date(),
      },
    });
    if (!url.viewed) {
      res.writeHead(302, {
        Location: url.url,
      });
      res.end();
    } else if (url.fallbackUrl) {
      res.writeHead(302, {
        Location: url.fallbackUrl,
      });
      res.end();
    } else {
      res.writeHead(302, {
        Location: "/",
      });
      res.end();
    }
  } else {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
  }
  return {
    props: {},
  };
}

export default Home;
