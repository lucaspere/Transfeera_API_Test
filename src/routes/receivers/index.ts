import type { FastifyPluginAsync } from "fastify";

const receiver: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
    /**
     * @swagger
     * tags:
     *   name: Receiver
     *   description: Hello world end point
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
     *         bank:
     *           type: string
     *         agency:
     *           type: string
     *         account:
     *           type: string
     *         status:
     *           type: string
     *           enum: [VALIDATED, SKETCH]
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
    fastify.get("/", async (_request, reply) => {
        void reply.send({ hello: "world" });
    });
};

export default receiver;
