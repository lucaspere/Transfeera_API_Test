import { assert } from 'chai';
import RecipientMemoryRepository from '../../src/repositories/MemoryRepository';
import { Recipient } from '../../src/types/recipient';

suite('Testing Recepient Memory Repository', function () {
    const recipientRepository = new RecipientMemoryRepository();
    suiteSetup(async function () {
        await recipientRepository.clear()
    })

    teardown(async function () {
        await recipientRepository.clear();
    });

    test('Should clear database', async () => {
        const recipient1: Recipient = {
            id: '1a17015b-6ec6-450c-a68e-df660d5de1c8',
            name: 'Rosmunda Klimkov',
            email: 'rklimkov0@sbwire.com',
            cpf_cnpj: '36145118121',
            status: 'RASCUNHO',
            key_type: 'EMAIL',
            key_value: 'rklimkov0@netlog.com',
            account: '43644-0',
            bank: 'SANTANDER',
            agency: '562'
        }
        const recipient2: Recipient = {
            id: '4efbe38b-2dbf-4bce-849b-b8082a4097eb',
            name: 'Adelle Meth',
            email: 'ameth1@vinaora.com',
            cpf_cnpj: '36145118121',
            status: 'VALIDADO',
            key_type: 'EMAIL',
            key_value: 'ameth1@mapquest.com',
            account: '70829-8',
            bank: 'ITAU',
            agency: '655'
        }
        await recipientRepository.create(recipient1);
        await recipientRepository.create(recipient2);

        await recipientRepository.clear();

        const recipients = await recipientRepository.list({});

        assert.equal(recipients.length, 0);
    });
});
