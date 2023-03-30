import type { FastifyPluginAsync } from "fastify";
import { ReceiverService } from "../../services/";
import type { Status, KeyTypes } from "../../types/receiver";
import { ListFilters } from "../../types/repository";
import ListReceiversQueries from "../../schemas/listReceivers.json";
const DEFAULT_ITEM_PER_PAGE = 10

export interface ListReceiverQueryType extends ListFilters {
    status?: keyof typeof Status | undefined;
    name?: string | undefined;
    key_type?: keyof typeof KeyTypes | undefined;
    key_value?: string | undefined;
}

const receiver: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
    /**
     * @swagger
     * tags:
     *   name: Receiver
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
     *     Receiver:
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
    */

    /**
     * @swagger
     * /api/receivers:
     *   get:
     *     tags: [Receiver]
     *     description: Returns a list of `Receiver`
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
     *                   description: The total of `Receiver` data returned.
     *                 data:
     *                   description: The list of `Receiver` data.
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/Receiver'
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
        { schema: { querystring: ListReceiversQueries } },
        async (request, reply) => {
            request.query.itemsPerPage = request.query.itemsPerPage ?? DEFAULT_ITEM_PER_PAGE
            const list = await ReceiverService.listReceiver(request.query)

            void reply.status(200).send(list);
        }
    );
};

export default receiver;
