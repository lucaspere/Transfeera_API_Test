import type { FastifyPluginAsync } from "fastify";
import { ReceiverService } from "../../services";
import type { Status, KeyTypes, Recipient } from "../../types/recipient";
import { ListFilters } from "../../types/repository";
import ListReceiverQueries from '../../schemas/listRecipients.json'
import DeleteReceiverParams from "../../schemas/defaultIdParameters.json";
import BulkDeletionBody from "../../schemas/bulkDeletionRecipient.json";
import { createRecipient } from "./create";
import { updateRecipient } from "./update";

const DEFAULT_ITEM_PER_PAGE = 10

export interface ListReceiverQueryType extends ListFilters {
    status?: keyof typeof Status | undefined;
    name?: string | undefined;
    key_type?: keyof typeof KeyTypes | undefined;
    key_value?: string | undefined;
}

export type DefaultReceiverParamType = {
    id: string
}

export type CreateRecipientBodyTypes = Recipient

export interface DeleteReceiverParamTypes extends DefaultReceiverParamType { }

export interface BulkDeletionBodyTypes {
    ids: Array<string>
}

export interface EditRecipientParamsTypes extends DefaultReceiverParamType { }

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
    fastify.get<{
        Querystring: ListReceiverQueryType
    }>(
        "/",
        { schema: { querystring: ListReceiverQueries } },
        async (request, reply) => {
            request.query.itemsPerPage = request.query.itemsPerPage ?? DEFAULT_ITEM_PER_PAGE
            const list = await ReceiverService.listReceiver(request.query)

            void reply.status(200).send(list);
        }
    );
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
        Params: DeleteReceiverParamTypes
    }>(
        "/:id",
        { schema: { params: DeleteReceiverParams } },
        async (request, reply) => {

            void await ReceiverService.deleteRecipient(request.params)

            void reply.status(200);
        }
    );
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
    fastify.post<{
        Body: BulkDeletionBodyTypes
    }>(
        "/bulk-delete",
        { schema: { body: BulkDeletionBody }, },
        async (request, reply) => {
            const data = await ReceiverService.bulkDelete(request.body)

            void reply.status(200).send(data);
        }
    );

    updateRecipient(fastify)
    createRecipient(fastify)
};

export default recipient;
