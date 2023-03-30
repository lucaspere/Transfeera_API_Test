import type { FastifyPluginAsync } from "fastify";
import { RecipientService } from "../../services";
import type { Status, KeyTypes, Recipient } from "../../types/recipient";
import { ListFilters } from "../../types/repository";
import DeleteRecipientParams from "../../schemas/defaultIdParameters.json";
import { createRecipient } from "./create";
import { updateRecipient } from "./update";
import { listRecipients } from "./list";
import { deleteRecipient } from "./delete";

export interface ListRecipientQueryType extends ListFilters {
    status?: keyof typeof Status | undefined;
    name?: string | undefined;
    key_type?: keyof typeof KeyTypes | undefined;
    key_value?: string | undefined;
}
export interface DeleteRecipientParamTypes extends DefaultRecipientParamType { }
export interface BulkDeletionBodyTypes {
    ids: Array<string>
}
export interface EditRecipientParamsTypes extends DefaultRecipientParamType { }

export type DefaultRecipientParamType = {
    id: string
}
export type CreateRecipientBodyTypes = Recipient
export type EditRecipientBodyTypes = Partial<Recipient>
const recipient: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
    /**
     * @swagger
     * tags:
     *   name: Recipient
     *   description: Hello world end point
    */

    /**
     * @swagger
     * definitions:
     *   KeyTypes:
     *     type: string
     *     enum: &KEY_TYPES
     *     - CPF
     *     - CNPJ
     *     - EMAIL
     *     - TELEFONE
     *     - CHAVE_ALEATORIA
     *
     *   Status:
     *     type: string
     *     enum: &STATUS
     *     - VALIDADO
     *     - RASCUNHO
    */

    /**
     * @swagger
     * components:
     *   schemas:
     *     Recipient:
     *       type: object
     *       properties:
     *         id:
     *           type: string
     *           format: uuid
     *         name:
     *           type: string
     *         cpfCnpj:
     *           type: string
     *         key_type:
     *           type: string
     *           enum: *KEY_TYPES 
     *         key_value:
     *           type: string
     *         bank:
     *           type: string
     *         agency:
     *           type: string
     *         account:
     *           type: string
     *         status:
     *           type: string
     *           enum: *STATUS
     *       required:
     *       - id 
     *       - name 
     *       - cpfCnpj 
     *       - bank 
     *       - agency 
     *       - account 
     *       - status 
     * 
     *     CreateEditRecipientPayload:
     *       type: object
     *       properties:
     *         name:
     *           type: string
     *         email:
     *           type: string
     *           format: email
     *         cpf_cnpj:
     *           type: string
     *         key_type:
     *           type: string
     *           enum: *KEY_TYPES 
     *         key_value:
     *           type: string
     *       required:
     *       - name 
     *       - cpf_cnpj 
     *       - key_type
     *       - key_value
    */


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
    fastify.delete<{
        Params: DeleteRecipientParamTypes
    }>(
        "/:id",
        { schema: { params: DeleteRecipientParams } },
        async (request, reply) => {

            void await RecipientService.deleteRecipient(request.params)

            void reply.status(200);
        }
    );


    updateRecipient(fastify)
    createRecipient(fastify)
    listRecipients(fastify)
    deleteRecipient(fastify)
};

export default recipient;
