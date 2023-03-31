import type { FastifyInstance } from "fastify";
import { DeleteRecipientParamTypes } from ".";
import DeleteRecipientParams from "../../schemas/defaultIdParameters.json";
import { RecipientService } from "../../services";
import { InternalServerError } from "../../utils/errors";

export const deleteRecipient = (app: FastifyInstance) => {
    /**
     * @swagger
     * /api/recipients:id:
     *   delete:
     *     tags: [Recipient]
     *     description: Delete a `Recipient` by its `id` 
     *     parameters:
     *       - in: params
     *         name: id
     *         schema:
     *           type: string
     *           required: true
     *         description: The `Recipient` identifier.
     *     produces: [application/json]
     *     responses:
     *       200:
     *         description: deletion success.
     *       400:
     *         description: invalid recipient value.
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
    app.delete<{
        Params: DeleteRecipientParamTypes
    }>(
        "/:id",
        { schema: { params: DeleteRecipientParams } },
        async (request, reply) => {
            try {
                void await RecipientService.delete(request.params)
                void reply.status(200);
            } catch (err) {
                void reply.status(500).send((err as InternalServerError).message);
            }
        }
    );

}