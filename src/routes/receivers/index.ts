import { Type } from "@sinclair/typebox";
import type { Static } from "@sinclair/typebox"
import type { FastifyPluginAsync } from "fastify";
import { ReceiverService } from "../../services/";

enum Status {
    VALIDADO = 'VALIDADO',
    RASCUNHO = 'RASCUNHO'
}
enum KeyTypes {
    CPF = 'CPF',
    CNPJ = 'CNPJ',
    EMAIL = 'EMAIL',
    TELEFONE = 'TELEFONE',
    CHAVE_ALEATORIA = 'CHAVE_ALEATORIA'
}

const DEFAULT_ITEM_PER_PAGE = 10
const ListReceiverParams = Type.Object({
    itemsPerPage: Type.Optional(Type.Number({ minimum: 1, default: DEFAULT_ITEM_PER_PAGE })),
    status: Type.Optional(Type.Enum(Status)),
    name: Type.Optional(Type.String()),
    key_type: Type.Optional(Type.Enum(KeyTypes)),
    key_value: Type.Optional(Type.Number({ minimum: 0 })),
})

export type ListReceiverQueryType = Static<typeof ListReceiverParams>

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
     * /receivers:
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
     *         description: The quantity of items to be returned per page.
     *       - in: query
     *         name: name
     *         schema:
     *           type: string
     *         description: The quantity of items to be returned per page.
     *       - in: query
     *         name: key_type
     *         schema:
     *           type: string
     *           enum: *KEY_TYPES
     *         description: The quantity of items to be returned per page.
     *       - in: query
     *         name: key_value
     *         schema:
     *           type: integer
     *         description: The quantity of items to be returned per page.
     *     produces: [application/json]
     *     responses:
     *       200:
     *         description: A list of users.
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
     */
    fastify.get<{ Querystring: ListReceiverQueryType }>("/", async (request, reply) => {
        request.query.itemsPerPage = request.query.itemsPerPage ?? DEFAULT_ITEM_PER_PAGE
        const list = await ReceiverService.listReceiver(request.query)

        void reply.send(list);
    });
};

export default receiver;
