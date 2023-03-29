import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import type { AutoloadPluginOptions } from "@fastify/autoload";
import AutoLoad from "@fastify/autoload";
import fastifyCors from '@fastify/cors'
import { initSwagger } from './swagger';
import { join } from 'path';

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
    void app.register(AutoLoad, {
        dir: join(__dirname, "routes"),
        options: opts
    })

    return app
}

const server = app()

server.listen({ port: 3000, host: '0.0.0.0' })