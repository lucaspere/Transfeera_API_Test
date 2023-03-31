import { FastifyInstance } from 'fastify';
import { inspect } from 'util';
import { PORT } from './app';
import { errorParser, InternalServerError } from './utils/errors';

export class Server {
    constructor(private app: FastifyInstance) { }

    async run(): Promise<FastifyInstance> {
        await this.prepare();
        await this.start();

        return this.app;
    }

    private async prepare(): Promise<Server> {
        try {
            this.app.log.info('Loading the plugin...');
            await this.app.ready();
            this.app.log.info('Plugins loaded successfully.');

            return this;
        } catch (err) {
            throw new InternalServerError(
                `Failed to load plugins: ${inspect(errorParser(err as InternalServerError))}`,
            );
        }
    }

    private async start(): Promise<string> {
        try {
            this.app.log.info('Starting the server...');
            const address = await this.app.listen({ port: PORT });

            return address;
        } catch (err) {
            throw new InternalServerError(
                `Failed to start the server: ${inspect(
                    errorParser(err as InternalServerError),
                )}`,
            );
        }
    }

    async close(): Promise<void> {
        try {
            this.app.log.info('Closing the server...');
            await this.app.close();
        } catch (err) {
            throw new InternalServerError(
                `Failed to close the server: ${inspect(
                    errorParser(err as InternalServerError),
                )}`,
            );
        }
    }

    get _app(): FastifyInstance {
        return this.app;
    }
}
