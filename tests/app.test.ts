import { expect } from 'chai';
import { app as server } from '../src/app';
import { Repository as repository } from '../src/repositories'
import { Receivers } from '../src/types/receiver';

const RECEIVER_URL = '/api/receivers/'

describe('Recipient API tests', async function () {
    const app = server({
        logger: false
    });
    let mockData: Receivers = []
    this.beforeAll(async () => {
        await app.listen({ port: 3001 });
        await repository.clear()
    });

    this.afterAll(async () => {
        await app.close();
    });

    this.beforeEach(async () => {
        mockData = [{ "id": "01GWQWNX6ECAAF73A8B9R7BE9J", "name": "Carmela Pyer", "cpfCnpj": "219976119", "bank": "ymroop", "agency": "795-7", "account": "58665427-4", "status": "RASCUNHO", "key_type": "CPF", "key_value": "20118025922770" }, { "id": "01GWQWNX6KVKEWVZR62H9CQX3B", "name": "Beatriz Rocha", "cpfCnpj": "969642228", "bank": "mzzoil", "agency": "440-3", "account": "77992710-5", "status": "VALIDADO", "key_type": "EMAIL", "key_value": "beatriz@test.eu" }, { "id": "01GWQWNX6QQ2KVVG3YWD0FV5TQ", "name": "Mireielle Ebi", "cpfCnpj": "984943470", "bank": "ligfkx", "agency": "848-1", "account": "71421912-8", "status": "VALIDADO", "key_type": "CNPJ", "key_value": "21568659779110" }, { "id": "01GWQWNX6X8M552DYBX01KCF7C", "name": "Brynne Stormouth", "cpfCnpj": "344010843", "bank": "brgfkc", "agency": "472-5", "account": "41932896-3", "status": "VALIDADO", "key_type": "TELEFONE", "key_value": "70739732146314" }, { "id": "01GWQWNX71S7674AB588CQT1ZR", "name": "Kalinda Kilpin", "cpfCnpj": "593321331", "bank": "ikrozf", "agency": "491-3", "account": "68616386-0", "status": "VALIDADO", "key_type": "TELEFONE", "key_value": "1771381292798" }, { "id": "01GWQWNX75MQ98NM95VXWY5H56", "name": "Giacopo Mullard", "cpfCnpj": "256054150", "bank": "yiapjp", "agency": "413-0", "account": "45210889-4", "status": "RASCUNHO", "key_type": "TELEFONE", "key_value": "13302749351018" }, { "id": "01GWQWNX78433BV08H1J67FPNK", "name": "Lona Gerred", "cpfCnpj": "479727010", "bank": "llemjv", "agency": "465-4", "account": "10317362-3", "status": "VALIDADO", "key_type": "CPF", "key_value": "41331038444148" }, { "id": "01GWQWNX7BATNWEK20N5GB0ZFH", "name": "Doretta Crothers", "cpfCnpj": "969178594", "bank": "ncgjak", "agency": "328-6", "account": "65773081-3", "status": "VALIDADO", "key_type": "CNPJ", "key_value": "77738688317532" }, { "id": "01GWQWNX7EZ64922J2VX5SRHNQ", "name": "Vanny Bramsen", "cpfCnpj": "755060356", "bank": "udhssi", "agency": "318-1", "account": "59949650-4", "status": "RASCUNHO", "key_type": "TELEFONE", "key_value": "05439122830194" }, { "id": "01GWQWNX7G4HF6V9GNPTZ9C8ZB", "name": "Durante Squires", "cpfCnpj": "870694683", "bank": "owaqgn", "agency": "180-9", "account": "85343846-9", "status": "VALIDADO", "key_type": "CNPJ", "key_value": "27373770677754" }, { "id": "01GWQWNX7K1VDSEEY3BDRT6DG5", "name": "Maryanna Raikes", "cpfCnpj": "238687510", "bank": "wkmcoj", "agency": "035-7", "account": "25102805-3", "status": "RASCUNHO", "key_type": "TELEFONE", "key_value": "24131425851990" }, { "id": "01GWQWNX7Q6B99FS12W9KWP1NY", "name": "Birk Garvey", "cpfCnpj": "224494997", "bank": "elyfit", "agency": "698-2", "account": "47915518-4", "status": "VALIDADO", "key_type": "TELEFONE", "key_value": "83216000795940" }, { "id": "01GWQWNX7TZ816VT2M1DSVN49C", "name": "Delia Mix", "cpfCnpj": "510708602", "bank": "olollr", "agency": "293-4", "account": "16928106-5", "status": "RASCUNHO", "key_type": "CHAVE_ALEATORIA", "key_value": "41460149884978" }, { "id": "01GWQWNX7YTD7MQFSGWXDWK0WY", "name": "Gardie Parker", "cpfCnpj": "059848594", "bank": "altaly", "agency": "873-2", "account": "67322914-0", "status": "RASCUNHO", "key_type": "CPF", "key_value": "65521576335452" }, { "id": "01GWQWNX866R4ZR7X2MQGRV9D4", "name": "Bartolemo Fenimore", "cpfCnpj": "447976497", "bank": "xwmdzx", "agency": "071-4", "account": "10464431-3", "status": "VALIDADO", "key_type": "CHAVE_ALEATORIA", "key_value": "08158883375222" }, { "id": "01GWQWNX8ANH9FYZGJ36WY6G6Q", "name": "Maurits Heathorn", "cpfCnpj": "956667402", "bank": "fnhfgw", "agency": "567-3", "account": "99195115-2", "status": "RASCUNHO", "key_type": "TELEFONE", "key_value": "14274449730136" }, { "id": "01GWQWNX8EZ2C0D2XNG0STMPKA", "name": "Roarke Windrum", "cpfCnpj": "926157308", "bank": "hovnqk", "agency": "675-2", "account": "36411290-3", "status": "VALIDADO", "key_type": "EMAIL", "key_value": "lucas@europa.eu" }, { "id": "01GWQWNX8JVRCAMFDXJ3M2J7PH", "name": "Beatrisa McIlwraith", "cpfCnpj": "659433009", "bank": "qjfxio", "agency": "071-1", "account": "53981765-2", "status": "VALIDADO", "key_type": "EMAIL", "key_value": "matheus@test.eu" }, { "id": "01GWQWNX8Q6MBH0W9V65KAGEYZ", "name": "Debora Rea", "cpfCnpj": "575847330", "bank": "srrjbt", "agency": "961-8", "account": "21123741-7", "status": "VALIDADO", "key_type": "CPF", "key_value": "43314506413157" }, { "id": "01GWQWNX8W8YN3BMWNMGPQK40G", "name": "Eldon McMeanma", "cpfCnpj": "999505166", "bank": "cabufu", "agency": "007-6", "account": "31673257-0", "status": "RASCUNHO", "key_type": "EMAIL", "key_value": "ctorvey0@europa.eu" }, { "id": "01GWQWNX90B74TDR7FQ0XEQD9P", "name": "Andrej Della", "cpfCnpj": "904049754", "bank": "ljnwzg", "agency": "488-3", "account": "28627590-0", "status": "VALIDADO", "key_type": "EMAIL", "key_value": "ctorvey0@europa.eu" }, { "id": "01GWQWNX95ZJ56ZD1XZD70NJFS", "name": "Chickie Filipponi", "cpfCnpj": "761690417", "bank": "imymky", "agency": "134-8", "account": "72979432-1", "status": "RASCUNHO", "key_type": "CPF", "key_value": "103254594021" }, { "id": "01GWQWNX99PYCR3BFSDTSX5BC3", "name": "Juana McGreal", "cpfCnpj": "693264057", "bank": "yozkhv", "agency": "630-4", "account": "16295015-9", "status": "VALIDADO", "key_type": "TELEFONE", "key_value": "62391735848936" }, { "id": "01GWQWNX9D88K3MJ6G77F0AWPF", "name": "Doll Garbutt", "cpfCnpj": "750525867", "bank": "embrlb", "agency": "128-4", "account": "93170549-8", "status": "RASCUNHO", "key_type": "TELEFONE", "key_value": "41274610582994" }, { "id": "01GWQWNX9GZ7GKNDMQHGVK85VV", "name": "Corly Josling", "cpfCnpj": "462291552", "bank": "mldkhn", "agency": "121-0", "account": "95187308-2", "status": "VALIDADO", "key_type": "CHAVE_ALEATORIA", "key_value": "32031709362912" }, { "id": "01GWQWNX9M7YHTH47C1QDYTHRR", "name": "Rogerio Goodliffe", "cpfCnpj": "661248873", "bank": "deyzlk", "agency": "001-5", "account": "07755222-3", "status": "VALIDADO", "key_type": "TELEFONE", "key_value": "53932070279491" }, { "id": "01GWQWNX9RCH3GAY0GGQ03B3AT", "name": "Woodman Lamkin", "cpfCnpj": "404563256", "bank": "eysnxj", "agency": "360-6", "account": "87051816-9", "status": "VALIDADO", "key_type": "EMAIL", "key_value": "ctorvey0@europa.eu" }, { "id": "01GWQWNX9YB71N20D2F89MECAH", "name": "Yvette Ireland", "cpfCnpj": "526013363", "bank": "wotodd", "agency": "187-5", "account": "41373225-8", "status": "VALIDADO", "key_type": "CHAVE_ALEATORIA", "key_value": "63452401319712" }, { "id": "01GWQWNXA0XBWSKQTZJKQWKPSE", "name": "Timothy Frankiewicz", "cpfCnpj": "521675212", "bank": "ihmrtt", "agency": "060-3", "account": "61533942-6", "status": "RASCUNHO", "key_type": "CNPJ", "key_value": "27691629711327" }, { "id": "01GWQWNXA3XQ109EJDJ0YVJKTC", "name": "Verene Dunge", "cpfCnpj": "612449542", "bank": "mhbgyj", "agency": "275-0", "account": "10068544-6", "status": "VALIDADO", "key_type": "TELEFONE", "key_value": "63134696071148" }]
        for (const data of mockData) {
            await repository.create(data)
        }
    })
    this.afterEach(async () => {
        await repository.clear()
        mockData = []
    })

    context('List Recipients', function () {
        it('Should list with default itemsPerPage filter', async () => {
            const res = await app.inject({
                method: 'GET',
                url: RECEIVER_URL,
            });
            const data = mockData.filter((_, idx) => !(idx >= 10))

            const expectedRes = JSON.stringify({
                total: data.length,
                data
            })
            expect(res.statusCode).to.be.equal(200);
            expect(res.body).to.be.equal(expectedRes);
        });

        it('Should list only recipients with status VALIDADO', async () => {
            const statusQuery = '?status=VALIDADO'
            const res = await app.inject({
                method: 'GET',
                url: RECEIVER_URL + statusQuery,
            });

            const data = mockData
                .filter(data => data.status === "VALIDADO")
                .filter((_, idx) => !(idx >= 10))

            const expectedRes = JSON.stringify({
                total: data.length,
                data
            })

            expect(res.statusCode).to.be.equal(200);
            expect(res.body).to.be.equal(expectedRes);
        });

        it('Should list only recipients with status VALIDADO and key_type EMAIL', async () => {
            const statusQuery = '?status=VALIDADO&key_type=EMAIL'
            const res = await app.inject({
                method: 'GET',
                url: RECEIVER_URL + statusQuery,
            });

            const data = mockData
                .filter(data => data.status === "VALIDADO")
                .filter(data => data.key_type === "EMAIL")
                .filter((_, idx) => !(idx >= 10))

            const expectedRes = JSON.stringify({
                total: data.length,
                data
            })

            expect(res.statusCode).to.be.equal(200);
            expect(res.body).to.be.equal(expectedRes);
        });
        it('Should list only recipients with nome contains bea, key_value contains test', async () => {
            const statusQuery = '?name=Bea&key_value=test'
            const res = await app.inject({
                method: 'GET',
                url: RECEIVER_URL + statusQuery,
            });

            const data = mockData
                .filter(data => data.name.toLocaleLowerCase().includes("bea"))
                .filter(data => data.key_value.includes("test"))
                .filter((_, idx) => !(idx >= 10))

            const expectedRes = JSON.stringify({
                total: data.length,
                data
            })

            expect(res.statusCode).to.be.equal(200);
            expect(res.body).to.be.equal(expectedRes);
        });
        it('Should response with BadRequest with invalid status value', async () => {
            const statusQuery = '?status=RASC'
            const res = await app.inject({
                method: 'GET',
                url: RECEIVER_URL + statusQuery,
            });

            const expectedRes = JSON.stringify({
                "statusCode": 400,
                "error": "Bad Request",
                "message": "querystring/status must be equal to one of the allowed values"
            })

            expect(res.statusCode).to.be.equal(400);
            expect(res.body).to.be.equal(expectedRes);
        });
        it('Should response with BadRequest with invalid key_type value', async () => {
            const statusQuery = '?key_type=TEST'
            const res = await app.inject({
                method: 'GET',
                url: RECEIVER_URL + statusQuery,
            });

            const expectedRes = JSON.stringify({
                "statusCode": 400,
                "error": "Bad Request",
                "message": "querystring/key_type must be equal to one of the allowed values"
            })

            expect(res.statusCode).to.be.equal(400);
            expect(res.body).to.be.equal(expectedRes);
        });
    });
    context('Delete Recipient', function () {
        it('Should Delete Recipient with corret id', async () => {
            const statusQuery = '?name=Carmela Pyer'
            const initialRes = await app.inject({
                method: 'GET',
                url: RECEIVER_URL + statusQuery,
            });

            const id = '01GWQWNX6ECAAF73A8B9R7BE9J'
            const res = await app.inject({
                method: 'DELETE',
                url: RECEIVER_URL + id,
            });

            const expectedRes = await app.inject({
                method: 'GET',
                url: RECEIVER_URL + statusQuery,
            });

            expect(res.statusCode).to.be.equal(200);
            expect(JSON.parse(initialRes.body).total).to.be.equal(1);
            expect(JSON.parse(expectedRes.body).total).to.be.equal(0);
        });
    });

    context('Delete Recipient', function () {
        it('Should Delete Many Recipients with ids', async () => {
            const statusQuery = '?key_value=test'
            const initialRes = await app.inject({
                method: 'GET',
                url: RECEIVER_URL + statusQuery,
            });

            const payload = {
                ids: [
                    "01GWQWNX8JVRCAMFDXJ3M2J7PH",
                    "01GWQWNX9RCH3GAY0GGQ03B3AT",
                    "01GWQWNX6KVKEWVZR62H9CQX3B"
                ]
            }
            const path = 'bulk-delete'
            const res = await app.inject({
                method: 'POST',
                url: RECEIVER_URL + path,
                payload
            });

            const expectedRes = {
                total: 2
            };

            expect(res.statusCode).to.be.equal(200);
            expect(JSON.parse(initialRes.body).total).to.be.equal(2);
            expect(expectedRes.total).to.be.equal(2);
        });
        it('Should response with Body BadRequest when ids attribute is not set', async () => {
            const payload = {
                test: [
                    "01GWQWNX8JVRCAMFDXJ3M2J7PH",
                    "01GWQWNX9RCH3GAY0GGQ03B3AT",
                    "01GWQWNX6KVKEWVZR62H9CQX3B"
                ]
            }
            const path = 'bulk-delete'
            const res = await app.inject({
                method: 'POST',
                url: RECEIVER_URL + path,
                payload
            });

            const expectedRes = {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "body must have required property 'ids'"
            }

            expect(res.statusCode).to.be.equal(400);
            expect(JSON.parse(res.body)).deep.equal(expectedRes);
        });
    });
});
