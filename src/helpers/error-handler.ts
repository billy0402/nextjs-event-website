import util from 'util';

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

function withServerError(handler: NextApiHandler): NextApiHandler {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
      return undefined;
    } catch (error) {
      console.error(
        'API Error:',
        util.inspect(error, { breakLength: Infinity }),
      );
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}

export default withServerError;
