import { assert } from 'chai';
import RecipientMemoryRepository from '../../src/repositories/MemoryRepository';
import { useRepository } from '../../src/repositories';

suite('Testing Repository Loader', function () {
    test('Should load with default Repository', async () => {
        const repo = await useRepository()

        assert.instanceOf(repo, RecipientMemoryRepository)

    });
    test('Should throw a error when not found repository class', async () => {
        try {
            await useRepository("TestRepository")
        } catch (e: any) {
            assert.instanceOf(e, Error)
            return
        }
        assert.fail("Should Throw a Error")
    });
});
