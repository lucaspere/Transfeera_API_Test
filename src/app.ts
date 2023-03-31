import Fastify from 'fastify'
import type { FastifyServerOptions } from 'fastify';
import AutoLoad from "@fastify/autoload";
import fastifyCors from '@fastify/cors'
import { initSwagger } from './swagger';
import { join } from 'path';
import { useRepository } from './repositories';
import ajvKeywords from 'ajv-keywords';
import * as util from 'node:util'
import { LOGTAIL_TOKEN, NODE_ENV, PINO_LOG_LEVEL, Server } from './server';
import * as dotenv from 'dotenv'
import { useService } from './services/recipient';

dotenv.config()

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
        logger: envToLogger[NODE_ENV as keyof typeof envToLogger]
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

    useService(process.env.SERVICE_TYPE).then(service => {
        new Server(server).run().catch(err => {
            server.log.error(err);
            process.exit(1);
        });
        server.log.info(`Using Service ${util.inspect(service)}`)
    })
}).catch(err => {
    console.error(`Repository data Store initialization failure because `, err);
    process.exit(1);
})
