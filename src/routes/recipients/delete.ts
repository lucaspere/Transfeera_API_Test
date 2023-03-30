import type { FastifyInstance } from "fastify";
import { BulkDeletionBodyTypes } from ".";
import BulkDeletionBody from "../../schemas/bulkDeletionRecipient.json";
import { RecipientService } from "../../services";

export const deleteRecipient = (app: FastifyInstance) => {
    /**
        * @swagger
        * /api/recipients/bulk-delete:
        *   post:
        *     tags: [Recipient]
        *     description: Delete many `Recipient` by its `ids` 
        *     requestBody:
        *       required: true
        *       description: A list of `Recipient`'s ids.
        *       content:
        *         application/json:
        *           schema:
        *             type: object
        *             properties:
        *               ids:
        *                 type: array
        *                 items:
        *                   type: string
        *             required: [ids]
        *     produces: [application/json]
        *     responses:
        *       200:
        *         description: deletion success.
        *         content:
        *           application/json:
        *             schema:
        *               type: object
        *               properties:
        *                 total:
        *                   type: integer
        *                   description: The total of `Recipient` deleteds.
        *       400:
        *         description: invalid json body.
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
    app.post<{
        Body: BulkDeletionBodyTypes
    }>(
        "/bulk-delete",
        { schema: { body: BulkDeletionBody }, },
        async (request, reply) => {
            const data = await RecipientService.bulkDelete(request.body)

            void reply.status(200).send(data);
        }
    )
}