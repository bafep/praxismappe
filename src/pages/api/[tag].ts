import path from "path";
import fs from "fs/promises";

type DocumentProps = {
  name: string;
  path: string;
};

type DayProps = {
  previewpic: string;
  date: string;
  thema: string;
  documents: DocumentProps[];
};

export async function getServerSideProps({ params }: any) {
  const { tag } = params;

  // Find the day that matches the tag
  const praxisData = require("../../../lib/praxisData").praxisData;
  const day = praxisData.find((d: any) => d.tag === tag);

  // Get all the documents for that day
  const documentsDirectory = path.join(
    process.cwd(),
    "public",
    "praxistage",
    tag
  );

  // get the names 
  const documentNames = await fs.readdir(documentsDirectory);
  const documents =
    documentNames?.map((name) => ({
      name,
      path: `/praxistage/${tag}/${name}`,
    })) ?? [];

  return {
    props: {
      day,
      documents,
    },
  };
}

export default async function handler(req: any, res: any) {
  const { tag } = req.query;

  // Find the day that matches the tag
  const praxisData = require("../../../lib/praxisData").praxisData;
  const day = praxisData.find((d: { tag: string }) => d.tag === tag);

  // Get all the documents for that day
  const documentsDirectory = path.join(
    process.cwd(),
    "public",
    "praxistage",
    tag
  );
  const documentNames = await fs.readdir(documentsDirectory);
  const documents =
    documentNames?.map((name) => ({
      name,
      path: `/praxistage/${tag}/${name}`,
    })) ?? [];

  res.json({ day, documents });
}
