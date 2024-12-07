import { NextApiRequest, NextApiResponse } from "next";

export async function notAllowed(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  return response.status(405).json({
    error: `Method '${request.method} not allowed'`,
  });
}
