import { NextApiRequest, NextApiResponse } from "next";

export default function status(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  response.status(200).json({ status: "Running" });
}
