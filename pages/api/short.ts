// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient, Url } from "@prisma/client";

const prisma = new PrismaClient();

type Data = {
  url: string;
};

const generateSlug = async (): Promise<string> => {
  const slug = (Math.random() + 1).toString(36).substring(7);

  if (await prisma.url.findFirst({ where: { slug } })) {
    console.log("retry");
    return generateSlug();
  }
  return slug;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { url, fallbackUrl } = req.query;

  const slug = await generateSlug();
  await prisma.url.create({
    data: {
      url: url as string,
      fallbackUrl: fallbackUrl as string,
      slug,
    },
  });
  res.status(200).json({
    shortUrl: `https://${
      process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000"
    }/${slug}`,
  });
}
