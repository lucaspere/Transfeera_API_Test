import { FastifyInstance } from "fastify";
import { EditRecipientBodyTypes, EditRecipientParamsTypes } from ".";
import EditRecipientBody from '../../schemas/createEditRecipientBody.json'
import EditRecipientParams from "../../schemas/defaultIdParameters.json";
import { RecipientService } from "../../services";
import { InternalServerError } from "../../utils/errors";


export const updateRecipient = (app: FastifyInstance) => {
    /**
    * @swagger
    * /api/recipients/{recipientID}:
    *   put:
    *     tags: [Recipient]
    *     description: Update a `Recipient`
    *     parameters:
    *      - name: recipientId
    *        in: path
    *        schema:
    *          type: string
    *        description: The `Recipient` identifier.
    *        required: true
    *     requestBody:
    *       required: true
    *       description: The `CreateUpdateRecipientPayload` data.
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/CreateEditRecipientPayload'
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
        { schema: { body: EditRecipientBody, params: EditRecipientParams }, },
        async (request, reply) => {

            try {
                const data = await RecipientService.edit({ id: request.params.id, ...request.body })

                void reply.status(204).send(data);
            } catch (err) {
                void reply.status(500).send((err as InternalServerError).message);
            }
        }
    );
}