import { gql, ApolloQueryResult } from "@apollo/client";
import type { NextApiRequest, NextApiResponse } from "next";
import ApolloClientInstance from "../../../logic/database";
import { MediaType } from "../../../@types/media.d";
import { encrypt } from "../../../logic/database";

type Data = MediaType & {
  [key: string]: any;
};

function encryptObject(object: Data): MediaType {
  return {
    ...object,
    name: encrypt(object.name),
    search: encrypt(object.search),
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  try {
    const result: ApolloQueryResult<Data> = await ApolloClientInstance.query({
      query: gql`
      {
        findMediaByID(id: ${id}) {
          name
          search
          url
          _id
        }
      }
    `,
    });

    const data = encryptObject(result.data);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}
