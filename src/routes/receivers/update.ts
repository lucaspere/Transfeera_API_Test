import { FastifyInstance } from "fastify";
import { EditRecipientBodyTypes, EditRecipientParamsTypes } from ".";
import EditRecipientBody from '../../schemas/createEditRecipientBody.json'
import { ReceiverService } from "../../services";


export const updateRecipient = (app: FastifyInstance) => {
    /**
    * @swagger
    * /api/receivers/:id:
    *   put:
    *     tags: [Receiver]
    *     description: Update a `Receiver`
    *     requestBody:
    *       required: true
    *       description: The `CreateUpdateRecipientPayload` data.
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/CreateEditRecipientPayload'
    *     produces: [application/json]
    *     responses:
    *       204:
    *         description: update success.
    *         content:
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
    app.put<{
        Params: EditRecipientParamsTypes,
        Body: EditRecipientBodyTypes
    }>(
        "/:id",
        { schema: { body: EditRecipientBody }, },
        async (request, reply) => {
            const data = await ReceiverService.editRecipient({ id: request.params.id, ...request.body })

            void reply.status(204).send(data);
        }
    );
}