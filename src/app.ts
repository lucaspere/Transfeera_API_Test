import Fastify from 'fastify'
import type { FastifyServerOptions } from 'fastify';
import AutoLoad from "@fastify/autoload";
import fastifyCors from '@fastify/cors'
import { initSwagger } from './swagger';
import { join } from 'path';
import { useRepository } from './repositories';
import ajvKeywords from 'ajv-keywords';
import * as util from 'node:util'
import { config } from 'dotenv'
import { Server } from './server';

config()

export const PORT = (process.env.PORT ?? 3000) as number
export const ENV = process.env.NODE_ENV || 'development'
export const LOGTAIL_TOKEN = process.env.LOGTAIL_TOKEN
export const PINO_LOG_LEVEL = process.env.PINO_LOG_LEVEL || 'info'

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
    production: {
        transport: {
            target: "@logtail/pino",
            options: { sourceToken: LOGTAIL_TOKEN }
        },
        level: PINO_LOG_LEVEL,
        formatters: {
            level: (label: string) => ({ level: label.toUpperCase() }),
        },
    },
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
) => {
    const app = Fastify(opts);

    void initSwagger(app)
    void app.register(fastifyCors);
    void app.register(AutoLoad, {
        dir: join(__dirname, "routes"),
        options: { ...opts, prefix: '/api' },
    })

    return app
}

export const server = app()

useRepository(process.env.REPOSITORY_TYPE).then(store => {
    server.log.info(`Using Repository ${util.inspect(store)}`)

    new Server(server).run().catch(err => {
        server.log.error(err);
        process.exit(1);
    });
}).catch(err => {
    console.error(`Repository data Store initialization failure because `, err);
    process.exit(1);
})
