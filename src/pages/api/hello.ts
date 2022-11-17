import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default function Hello(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ message: 'Hello' })
}
