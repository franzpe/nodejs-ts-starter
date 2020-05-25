import { Request, Response } from 'express';
import { checkSearchParams } from '../../middleware/checks';

export default [
  {
    /**
     * @swagger
     * /search:
     *  get:
     *    description: use to search something
     *    parameters:
     *      - name: q
     *        description: whatever
     *        in: query
     *        required: true
     *        type: string
     *    responses:
     *      '200':
     *        description: A successful response
     */
    path: '/search',
    method: 'get',
    handler: [
      checkSearchParams,
      async ({ query }: Request, res: Response) => {
        res.send('Hello world!');
      }
    ]
  }
];
