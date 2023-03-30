import Fastify from 'fastify'
import type { FastifyInstance, FastifyServerOptions } from 'fastify';
import AutoLoad from "@fastify/autoload";
import fastifyCors from '@fastify/cors'
import { initSwagger } from './swagger';
import { join } from 'path';
import { __dirname } from './approotdir';

export const PORT = (process.env.PORT ?? 3000) as number

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

await server.listen({ port: PORT, host: '0.0.0.0' })