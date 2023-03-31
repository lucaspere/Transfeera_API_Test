import Fastify from 'fastify'
import type { FastifyInstance, FastifyServerOptions } from 'fastify';
import AutoLoad from "@fastify/autoload";
import fastifyCors from '@fastify/cors'
import { initSwagger } from './swagger';
import { join } from 'path';
import { useRepository } from './repositories';
import ajvKeywords from 'ajv-keywords';
import * as util from 'node:util'
import { config } from 'dotenv'
config()

export const PORT = (process.env.PORT ?? 3000) as number
export const ENV = process.env.NODE_ENV || 'development'

const envToLogger = {
    development: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
    },
    production: true,
    test: false,
}

export const app = (
    opts: FastifyServerOptions = {
        ajv: {
            customOptions: {
                discriminator: true,
                removeAdditional: true,
            },
            plugins: [
                [ajvKeywords] as any
            ]
        },
        logger: envToLogger[ENV as keyof typeof envToLogger]
    }
): FastifyInstance => {
    const app = Fastify(opts);

    void initSwagger(app)
    void app.register(fastifyCors);
    void app.register(AutoLoad, {
        dir: join(__dirname, "routes"),
        options: { ...opts, prefix: '/api' },
    })

    return app
}

const server = app()

useRepository(process.env.REPOSITORY_TYPE).then(store => {
    server.log.info(`Using Repository ${util.inspect(store)}`)
}).catch(err => {
    console.error(`Repository data Store initialization failure because `, err.error);
    process.exit(1);
})

server.listen({ port: PORT, host: '0.0.0.0' }).catch(err => {
    console.error('An error occurred while trying to initialize the server', err)
    process.exit(1)
})