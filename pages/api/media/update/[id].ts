// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { gql, ApolloQueryResult } from "@apollo/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { MediaType, MediaSourceType } from "../../../../@types/media.d";
import ApolloClientInstance, {
  decrypt,
  encrypt,
} from "../../../../logic/database";

type EncMedia = MediaType;

function encryptObject(
  sources: Array<MediaSourceType>,
): Array<MediaSourceType> {
  const encSources: Array<MediaSourceType> = [];

  for (const s of sources) {
    if (s.name) s.name = encrypt(s.name);
    s.url = encrypt(s.url);
    encSources.push(s);
  }

  return encSources;
}

function decryptObject(object: EncMedia): MediaType {
  const decSources: Array<MediaSourceType> = [];

  for (const s of object.sources) {
    if (s.name) s.name = decrypt(s.name);
    s.url = decrypt(s.url);
    decSources.push(s);
  }

  return {
    ...object,
    name: decrypt(object.name),
    search: decrypt(object.search),
    sources: decSources,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { id } = req.query;
    const sources: Array<MediaSourceType> = req.body.sources;

    const data = { sources: encryptObject(sources) };

    try {
      const queryResult = await ApolloClientInstance.mutate({
        variables: { id, data },
        mutation: gql`
          mutation updateMedia($id: ID!, $data: MediaInput!) {
            updateMedia(id: $id, data: $data) {
              name
              sources {
                name
                url
                isLocal
              }
            }
          }
        `,
      });

      const returnObject = decryptObject(queryResult.data.updateMedia);

      res.status(200).json(returnObject);
    } catch (err) {
      res.status(500).json({ err: { message: err.message, stack: err.stack } });
    }
  } else res.status(405).json({ error: "Method not allowed!" });
}
