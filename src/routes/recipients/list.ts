import type { FastifyInstance } from "fastify";
import type { ListRecipientQueryType } from ".";
import ListRecipientQueries from '../../schemas/listRecipients.json'
import { RecipientService } from "../../services";


const DEFAULT_ITEM_PER_PAGE = 10
export const listRecipients = (app: FastifyInstance) => {
    /**
    * @swagger
    * /api/recipients:
    *   get:
    *     tags: [Recipient]
    *     description: Returns a list of `Recipient`
    *     parameters:
    *       - in: query
    *         name: itemsPerPage
    *         schema:
    *           type: integer
    *           default: 10
    *         description: The quantity of items to be returned per page.
    *       - in: query
    *         name: status
    *         schema:
    *           type: string
    *           enum: *STATUS
    *         description: The `Status` of the recipient.
    *       - in: query
    *         name: name
    *         schema:
    *           type: string
    *         description: The name of the recipient.
    *       - in: query
    *         name: key_type
    *         schema:
    *           type: string
    *           enum: *KEY_TYPES
    *         description: The Pix's Key types of the recipient.
    *       - in: query
    *         name: key_value
    *         schema:
    *           type: integer
    *         description: The Pix's key value of the recipient.
    *     produces: [application/json]
    *     responses:
    *       200:
    *         description: list success.
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 total:
    *                   type: integer
    *                   description: The total of `Recipient` data returned.
    *                 data:
    *                   description: The list of `Recipient` data.
    *                   type: array
    *                   items:
    *                     $ref: '#/components/schemas/Recipient'
    *       400:
    *         description: list success.
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/BadRequest'
    *       500:
    *         description: Internal Error.
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/InternalServerError'
    */
    app.get<{
        Querystring: ListRecipientQueryType
    }>(
        "/",
        { schema: { querystring: ListRecipientQueries } },
        async (request, reply) => {
            request.query.itemsPerPage = request.query.itemsPerPage ?? DEFAULT_ITEM_PER_PAGE
            try {

                const list = await RecipientService.listRecipient(request.query)

                void reply.status(200).send(list);
            }
            catch (err) {

            }
        }
    );
}