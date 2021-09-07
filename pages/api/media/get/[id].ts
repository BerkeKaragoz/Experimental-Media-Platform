// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { gql, ApolloQueryResult } from "@apollo/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { MediaType, MediaSourceType } from "../../../../@types/media.d";
import ApolloClientInstance, { decrypt } from "../../../../logic/database";

type EncMedia = MediaType;

type Data = {
  findMediaByID: EncMedia;
};

function decryptObject(object: EncMedia): MediaType {
  const decSources: Array<MediaSourceType> = [];

  for (const s of object.sources) {
    decSources.push({
      name: s.name ? decrypt(s.name) : "",
      url: decrypt(s.url),
      isLocal: s.isLocal,
    });
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
  const { id } = req.query;

  try {
    const queryResult: ApolloQueryResult<Data> =
      await ApolloClientInstance.query({
        query: gql`
      {
        findMediaByID(id: ${id}) {
          name
          search
          sources{
            name
            url
            isLocal
          }
          _id
        }
      }
    `,
      });

    const data = decryptObject(queryResult.data.findMediaByID);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: { message: err.message, stack: err.stack } });
  }
}
