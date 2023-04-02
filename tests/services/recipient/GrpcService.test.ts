import { assert } from 'chai';
import { CreateRecipientBodyTypes } from '../../../src/routes/recipients';
import GrpcRecipientService from '../../../src/services/recipient/GrpcService';
import Sinon from 'sinon';
import { InternalServerError } from '../../../src/utils/errors';
import { ListRecipientResponse } from '../../../src/services';
import { ListRecipientsReply } from '../../../src/generated/grpc_service/service/recipients';

suite('Testing Grpc Recepient Service', function () {
    const RecipientService = new GrpcRecipientService()

    teardown(async function () {
        RecipientService._channel.close()
    });

    test('Should call createRecipient', async () => {
        const id = "40830c36-246f-4VT5-afeb-2c45af0f5e80"
        const recipient: CreateRecipientBodyTypes & { id: string } = {
            id,
            name: "lucas",
            email: 'test@sbwire.com',
            cpf_cnpj: '36145118121',
            key_type: 'EMAIL',
            key_value: 'lucas@netlog.com',
        }
        const client = Sinon
            .stub(RecipientService._client, 'createRicipient')
            .returns(Promise.resolve({
                keyType: recipient.key_type,
                keyValue: recipient.key_value,
                cpfCnpj: recipient.cpf_cnpj,
                accountType: "CORRENTE",
                id,
                email: recipient.email,
                name: recipient.name

            } as any))
        const result = await RecipientService.create(recipient);

        client.restore()
        Sinon.assert.calledOnceWithExactly(client, {
            recipient: {
                id,
                cpfCnpj: '36145118121',
                email: 'test@sbwire.com',
                name: 'lucas',
                keyType: 'EMAIL',
                keyValue: 'lucas@netlog.com',
            }
        })
        assert.deepEqual({ ...recipient, account_type: "CORRENTE" } as any, result)
    });

    test('Create should Throw Internal Server Error when a error occurs', async () => {
        const client = Sinon.stub(RecipientService._client, 'createRicipient').throws()
        try {
            await RecipientService.create({} as any);
        } catch (err: any) {
            assert.isTrue(err instanceof InternalServerError)
            assert.isTrue(client.calledOnce)
            return
        }
        client.restore()
        assert.fail("Expected the service throws a InternalServerError")

    });

    test('Should call listRecipients', async () => {
        const id = "40830c36-246f-43c5-afeb-2c45af0f5e80"
        const data: ListRecipientsReply = {
            total: 2,
            data: [{
                id,
                cpfCnpj: '36145118121',
                email: 'test@sbwire.com',
                name: 'lucas',
                status: 'RASCUNHO',
                keyType: 'EMAIL',
                keyValue: 'lucas@netlog.com',
                account: '00000-1',
                accountType: 'CORRENTE',
                agency: '111',
                bank: 'SANTANDER'
            }, {
                id,
                cpfCnpj: '36145118121',
                email: 'test@sbwire.com',
                name: 'lucas',
                status: 'RASCUNHO',
                keyType: 'EMAIL',
                keyValue: 'lucas@netlog.com',
                account: '00000-1',
                accountType: 'POUPANÇA',
                agency: '111',
                bank: 'SANTANDER'
            }]
        }
        const expected: ListRecipientResponse = {
            total: 2,
            data: [{
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
        }
        const client = Sinon.stub(RecipientService._client, 'listRecipients').returns(Promise.resolve(data))
        const result = await RecipientService.list({});

        assert.deepEqual(expected, result)
        client.restore()
    });

    test('List should Throw Internal Server Error when listRecipients returns a error', async () => {
        const client = Sinon.stub(RecipientService._client, 'listRecipients').throws()
        try {
            await RecipientService.list({} as any);
        } catch (err: any) {
            assert.isTrue(err instanceof InternalServerError)
            assert.isTrue(client.calledOnce)
            return
        }
        client.restore()
        assert.fail("Expected the service throws a InternalServerError")
    });

    test('Should call ediRecipient', async () => {
        const id = "40830c36-246f-4VT5-afeb-2c45af0f5e80"
        const recipient: CreateRecipientBodyTypes = {
            id,
            name: "lucas",
            email: 'test@sbwire.com',
            cpf_cnpj: '36145118121',
            key_type: 'EMAIL',
            key_value: 'lucas@netlog.com',
        }
        const client = Sinon
            .stub(RecipientService._client, 'editRecipient')
            .returns(Promise.resolve({
                keyType: recipient.key_type,
                keyValue: recipient.key_value,
                cpfCnpj: recipient.cpf_cnpj,
                accountType: "CORRENTE",
                id,
                email: recipient.email,
                name: recipient.name

            } as any))
        const result = await RecipientService.edit(recipient);

        Sinon.assert.calledOnceWithExactly(client, {
            id,
            recipient: {
                keyType: 'EMAIL',
                keyValue: 'lucas@netlog.com',
                cpfCnpj: '36145118121',
                email: 'test@sbwire.com',
                name: 'lucas'
            }
        })
        assert.deepEqual({ ...recipient, account_type: "CORRENTE" } as any, result)

        client.restore()
    });

    test('Edit should Throw Internal Server Error when editRecipient returns a error', async () => {
        const client = Sinon.stub(RecipientService._client, 'editRecipient').throws()
        try {
            await RecipientService.edit({} as any);
        } catch (err: any) {
            assert.isTrue(err instanceof InternalServerError)
            assert.isTrue(client.calledOnce)
            return
        }
        client.restore()
        assert.fail("Expected the service throws a InternalServerError")
    });

    test('Should call deleteRecipient', async () => {
        const id = "40830c36-246f-4VT5-afeb-2c45af0f5e80"

        const client = Sinon.stub(RecipientService._client, 'deleteRecipient')
        const result = await RecipientService.delete({ id });

        Sinon.assert.calledOnceWithExactly(client, { id })
        assert.isUndefined(result)

        client.restore()
    });

    test('Delete should Throw Internal Server Error when deleteRecipient returns a error', async () => {
        const client = Sinon.stub(RecipientService._client, 'deleteRecipient').throws()
        try {
            await RecipientService.delete({} as any);
        } catch (err: any) {
            assert.isTrue(err instanceof InternalServerError)
            assert.isTrue(client.calledOnce)
            return
        }
        client.restore()
        assert.fail("Expected the service throws a InternalServerError")
    });

    test('Should call bulkDeleteRecipients', async () => {
        const ids = [
            "40830c36-246f-4VT5-afeb-2c45af0f5e80",
            "40830c36-246f-4VT5-afeb-2c45af0f5e80",
            "40830c36-246f-4VT5-afeb-2c45af0f5e80"
        ]

        const client = Sinon
            .stub(RecipientService._client, 'bulkDeleteRecipients')
            .returns(Promise.resolve({ total: ids.length }))
        const result = await RecipientService.bulkDelete({ ids });
        client.restore()

        Sinon.assert.calledOnceWithExactly(client, { ids })
        assert.deepEqual(result, { total: ids.length })

    });

    test('Bulk Deletion should Throw Internal Server Error when bulkDeleteRecipients returns a error', async () => {
        const client = Sinon.stub(RecipientService._client, 'bulkDeleteRecipients').throws()
        try {
            await RecipientService.bulkDelete({ ids: [] } as any);
        } catch (err: any) {
            assert.isTrue(err instanceof InternalServerError)
            Sinon.assert.calledOnce(client)
            assert.isTrue(client.calledOnce)
            return
        }
        client.restore()
        assert.fail("Expected the service throws a InternalServerError")
    });

});
