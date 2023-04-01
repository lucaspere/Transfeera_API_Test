import { assert } from 'chai';
import { CreateRecipientBodyTypes } from '../../../src/routes/recipients';
import InProcessService from '../../../src/services/recipient/InProcessService';
import { useRepository, Repository as repository } from '../../../src/repositories';
import { Recipient, Recipients } from '../../../src/types/recipient';
import Sinon from 'sinon';
import { InternalServerError } from '../../../src/utils/errors';

suite('Testing InProcess Recepient Service', function () {
    const RecipientService = new InProcessService()
    suiteSetup(async function () {
        await useRepository(process.env.REPOSITORY_TYPE)
    })


    teardown(async function () {
        await repository.clear();

    });

    test('Should create Recipient with DEfAULT status', async () => {
        const id = "40830c36-246f-43c5-afeb-2c45af0f5e80"
        const recipient1: CreateRecipientBodyTypes = {
            id,
            name: "lucas",
            email: 'test@sbwire.com',
            cpf_cnpj: '36145118121',
            key_type: 'EMAIL',
            key_value: 'lucas@netlog.com',
        }
        const create = Sinon.stub(repository, 'create')
        await RecipientService.create(recipient1);

        assert.isTrue(create.calledOnceWithExactly({
            id,
            cpf_cnpj: '36145118121',
            email: 'test@sbwire.com',
            name: 'lucas',
            status: 'RASCUNHO',
            key_type: 'EMAIL',
            key_value: 'lucas@netlog.com',
            account_type: 'POUPANÇA',
            account: '00000-1',
            agency: '111',
            bank: 'SANTANDER'
        }))

        create.restore()
    });

    test('Create should Throw Internal Server Error when a error occurs', async () => {
        const create = Sinon.stub(repository, 'create').throws()
        try {
            await RecipientService.create({} as any);
        } catch (err: any) {
            assert.isTrue(err instanceof InternalServerError)
            assert.isTrue(create.calledOnce)
            return
        }
        create.restore()
        assert.fail("Expected the service throws a InternalServerError")

    });

    test('Should list Recipient', async () => {
        const id = "40830c36-246f-43c5-afeb-2c45af0f5e80"
        const data: Recipients = [{
            id,
            cpf_cnpj: '36145118121',
            email: 'test@sbwire.com',
            name: 'lucas',
            status: 'RASCUNHO',
            key_type: 'EMAIL',
            key_value: 'lucas@netlog.com',
            account: '00000-1',
            account_type: 'CORRENTE',
            agency: '111',
            bank: 'SANTANDER'
        }, {
            id,
            cpf_cnpj: '36145118121',
            email: 'test@sbwire.com',
            name: 'lucas',
            status: 'RASCUNHO',
            key_type: 'EMAIL',
            key_value: 'lucas@netlog.com',
            account: '00000-1',
            account_type: 'POUPANÇA',
            agency: '111',
            bank: 'SANTANDER'
        }]
        const list = Sinon.stub(repository, 'list').returns(Promise.resolve(data))
        await RecipientService.list({});

        list.restore()
    });

    test('List should Throw Internal Server Error when a error occurs', async () => {
        const list = Sinon.stub(repository, 'list').throws()
        try {
            await RecipientService.list({} as any);
        } catch (err: any) {
            assert.isTrue(err instanceof InternalServerError)
            assert.isTrue(list.calledOnce)
            return
        }
        list.restore()
        assert.fail("Expected the service throws a InternalServerError")
    });

    test('Should delete Recipient', async () => {
        const id = "40830c36-246f-43c5-afeb-2c45af0f5e80"
        const data: Recipient = {
            id,
            cpf_cnpj: '36145118121',
            email: 'test@sbwire.com',
            name: 'lucas',
            status: 'RASCUNHO',
            key_type: 'EMAIL',
            key_value: 'lucas@netlog.com',
            account: '00000-1',
            account_type: "CORRENTE",
            agency: '111',
            bank: 'SANTANDER'
        }
        const del = Sinon.stub(repository, 'delete').returns(Promise.resolve(data))
        await RecipientService.delete({ id });

        del.restore()
        assert.isTrue(del.calledOnceWith(id))
    });

    test('Delete should Throw Internal Server Error when a error occurs', async () => {
        const del = Sinon.stub(repository, 'delete').throws()
        try {
            await RecipientService.delete({} as any);
        } catch (err: any) {
            assert.isTrue(err instanceof InternalServerError)
            assert.isTrue(del.calledOnce)
            del.restore()
            return
        }
        assert.fail("Expected the service throws a InternalServerError")
    });

    test('Should bulk delete Recipients', async () => {
        const id = "40830c36-246f-43c5-afeb-2c45af0f5e80"
        const data = { ids: [id, id] }
        const bulkDelete = Sinon.stub(repository, 'bulkDelete').returns(Promise.resolve(data.ids.length))
        const response = await RecipientService.bulkDelete(data);

        assert.equal(response.total, 2)
        assert.isTrue(bulkDelete.calledOnceWith(data.ids))
        bulkDelete.restore()
    });

    test('BulkDelete should Throw Internal Server Error when a error occurs', async () => {
        const bulkDelete = Sinon.stub(repository, 'bulkDelete').throws()
        try {
            await RecipientService.bulkDelete({ ids: [] });
        } catch (err: any) {
            assert.isTrue(err instanceof InternalServerError)
            assert.isTrue(bulkDelete.calledOnce)
            return
        }
        bulkDelete.restore()
        assert.fail("Expected the service throws a InternalServerError")
    });

    test('Should only edit email when recipient status is VALIDADO', async () => {
        const id = "40830c36-246f-43c5-afeb-2c45af0f5e80"
        const data: Recipient = {
            id,
            cpf_cnpj: '36145118121',
            email: 'test@sbwire.com',
            name: 'lucas',
            status: 'VALIDADO',
            key_type: 'EMAIL',
            key_value: 'lucas@netlog.com',
            account: '00000-1',
            account_type: "CORRENTE",
            agency: '111',
            bank: 'SANTANDER'
        }
        const find = Sinon.stub(repository, 'find').returns(Promise.resolve(data))
        const update = Sinon.stub(repository, 'update')
        const datatoupdate = { ...data, email: 'lucas@test.com', name: 'matheus', key_Type: 'CPF', key_value: '111245' }
        await RecipientService.edit(datatoupdate);

        const expected: Recipient = {
            id: "40830c36-246f-43c5-afeb-2c45af0f5e80",
            cpf_cnpj: "36145118121",
            email: "lucas@test.com",
            name: "lucas",
            status: "VALIDADO",
            key_type: "EMAIL",
            key_value: "lucas@netlog.com",
            account: "00000-1",
            account_type: "CORRENTE",
            agency: "111",
            bank: "SANTANDER",
        }
        assert.isTrue(update.calledOnceWithExactly(id, expected))
        assert.isTrue(find.calledOnceWith(id))

        find.restore()
        update.restore()
    });

    test('Should edit fields when recipient status is RASCUNHO', async () => {
        const id = "40830c36-246f-43c5-afeb-2c45af0f5e80"
        const data: Recipient = {
            id,
            cpf_cnpj: '36145118121',
            email: 'test@sbwire.com',
            name: 'lucas',
            status: 'RASCUNHO',
            key_type: 'EMAIL',
            key_value: 'lucas@netlog.com',
            account: '00000-1',
            account_type: "CORRENTE",
            agency: '111',
            bank: 'SANTANDER'
        }
        const find = Sinon.stub(repository, 'find').returns(Promise.resolve(data))
        const update = Sinon.stub(repository, 'update')
        const datatoupdate = { ...data, email: 'lucas@test.com', name: 'matheus', key_Type: 'CPF', key_value: '111245' }
        await RecipientService.edit(datatoupdate);

        const expected: Recipient = {
            id: "40830c36-246f-43c5-afeb-2c45af0f5e80",
            cpf_cnpj: "36145118121",
            email: "lucas@test.com",
            name: "matheus",
            status: "RASCUNHO",
            key_type: "EMAIL",
            key_value: "111245",
            account: "00000-1",
            account_type: "CORRENTE",
            agency: "111",
            bank: "SANTANDER",
            key_Type: "CPF",
        }
        assert.isTrue(update.calledOnceWithExactly(id, expected))
        assert.isTrue(find.calledOnceWith(id))

        find.restore()
        update.restore()
    });

    test('Edit should Throw Internal Server Error when a error occurs', async () => {
        const find = Sinon.stub(repository, 'find').throws()
        const update = Sinon.stub(repository, 'update').throws()
        try {
            await RecipientService.edit({});
        } catch (err: any) {
            assert.isTrue(err instanceof InternalServerError)
            assert.isTrue(find.calledOnce)
            assert.isTrue(update.notCalled)
            return
        }

        find.restore()
        update.restore()
        assert.fail("Expected the service throws a InternalServerError")
    });
});
