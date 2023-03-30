import type { FastifyInstance } from "fastify";
import { DeleteRecipientParamTypes } from ".";
import DeleteRecipientParams from "../../schemas/defaultIdParameters.json";
import { RecipientService } from "../../services";

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
            void await RecipientService.deleteRecipient(request.params)
            void reply.status(200);
        }
    );

}