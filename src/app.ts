import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger';
import { initSwagger } from './swagger';

export const app = (
    opts: FastifyServerOptions = {
        logger: {
            transport: {
                target: 'pino-pretty',
                options: {
                    translateTime: 'HH:MM:ss Z',
                    ignore: 'pid,hostname',
                },
            },
            level: 'info',

        }
    }
): FastifyInstance => {
    const app = Fastify(opts);

    void initSwagger(app)
    void app.register(fastifyCors);

    return app
}

const server = app()
server.get("/", (request, reply) => {
    reply.send("Hello Lucas")
})

server.listen(3000)