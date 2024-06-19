import { getAllDocuments } from "@/lib/firestore";

interface fetchDocsTypes {
  collection: string;
  setState: (state: any) => void;
}

export async function fetchDocs({ collection, setState }: fetchDocsTypes) {
  const docs = await getAllDocuments(collection);
  const activeDocs = docs.filter((e: any) => e.deletedAt === "");
  activeDocs.sort((a: any, b: any) => a.idOpcional - b.idOpcional);
  setState(activeDocs);
}
