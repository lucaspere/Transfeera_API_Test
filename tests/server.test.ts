import { assert } from 'chai';
import Fastify from 'fastify';
import { Server } from '../src/server';
import sinon from 'sinon';

describe('Server test', function () {
    const serverMock = new Server(Fastify({ logger: false }));

    this.beforeEach(() => {
        sinon.restore();
    });
    this.afterEach(() => {
        serverMock.close();
    });

    context('Test run Server', function () {
        it('Should handle server loading plugins', async () => {
            sinon
                .stub(serverMock._app, 'ready')
                .throws({ name: 'Error Test', message: 'Mock error' });

            try {
                await serverMock.run();
            } catch (err: any) {
                assert.isTrue(err instanceof Error);
                assert.equal(
                    err.message.trim(),
                    "Failed to load plugins: { name: 'Error Test', msg: 'Mock error' }".trim(),
                );
            }
        });

        it('Should handle server startup failures', async () => {
            sinon
                .stub(serverMock._app, 'listen')
                .throws({ name: 'Error Test', message: 'Mock error' });

            try {
                await serverMock.run();
            } catch (err: any) {
                assert.isTrue(err instanceof Error);
                assert.deepEqual(
                    err.message.trim(),
                    "Failed to start the server: { name: 'Error Test', msg: 'Mock error' }".trim(),
                );
            }
        });
    });

    it('Should handle server closed failures', async () => {
        sinon
            .stub(serverMock._app, 'close')
            .throws({ name: 'Error Test', message: 'Mock error' });

        try {
            await serverMock.close();
        } catch (err: any) {
            assert.isTrue(err instanceof Error);
            assert.equal(
                err.message.trim(),
                "Failed to close the server: { name: 'Error Test', msg: 'Mock error' }".trim(),
            );
        }
    });
});
