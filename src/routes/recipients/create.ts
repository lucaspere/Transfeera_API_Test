import { FastifyInstance } from "fastify";
import { CreateRecipientBodyTypes } from ".";
import CreateRecipientBody from '../../schemas/createEditRecipientBody.json'
import { RecipientService } from "../../services";

export const createRecipient = (app: FastifyInstance) => {
    /**
    * @swagger
    * /api/recipients:
    *   post:
    *     tags: [Recipient]
    *     description: Create a new `Recipient` 
    *     requestBody:
    *       required: true
    *       description: The `CreateUpdateRecipientPayload` data.
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/CreateEditRecipientPayload'
    *     produces: [application/json]
    *     responses:
    *       201:
    *         description: deletion success.
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Recipient'
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
        Body: CreateRecipientBodyTypes
    }>(
        "/",
        { schema: { body: CreateRecipientBody }, },
        async (request, reply) => {
            const data = await RecipientService.createRecipient(request.body)

            void reply.status(201).send(data);
        }
    );
}