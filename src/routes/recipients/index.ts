import type { FastifyPluginAsync } from "fastify";
import type { Status, KeyTypes, Recipient } from "../../types/recipient";
import { ListFilters } from "../../types/repository";
import { createRecipient } from "./create";
import { updateRecipient } from "./update";
import { listRecipients } from "./list";
import { deleteRecipient } from "./delete";
import { BulkRecipientDeletion } from "./bulkDelete";

export interface ListRecipientQueryType extends ListFilters {
    status?: keyof typeof Status | undefined;
    name?: string | undefined;
    key_type?: keyof typeof KeyTypes | undefined;
    key_value?: string | undefined;
}
export interface DeleteRecipientParamTypes extends DefaultRecipientParamType { }
export interface BulkDeletionBodyTypes {
    ids: Array<string>
}
export interface EditRecipientParamsTypes extends DefaultRecipientParamType { }

export type DefaultRecipientParamType = {
    id: string
}
export type CreateRecipientBodyTypes = Recipient
export type EditRecipientBodyTypes = Partial<Recipient>
const recipient: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
    /**
     * @swagger
     * tags:
     *   name: Recipient
     *   description: Hello world end point
    */

    /**
     * @swagger
     * definitions:
     *   KeyTypes:
     *     type: string
     *     enum: &KEY_TYPES
     *     - CPF
     *     - CNPJ
     *     - EMAIL
     *     - TELEFONE
     *     - CHAVE_ALEATORIA
     *
     *   Status:
     *     type: string
     *     enum: &STATUS
     *     - VALIDADO
     *     - RASCUNHO
    */

    /**
     * @swagger
     * components:
     *   schemas:
     *     Recipient:
     *       type: object
     *       properties:
     *         id:
     *           type: string
     *           format: uuid
     *         name:
     *           type: string
     *         cpfCnpj:
     *           type: string
     *         key_type:
     *           type: string
     *           enum: *KEY_TYPES 
     *         key_value:
     *           type: string
     *         bank:
     *           type: string
     *         agency:
     *           type: string
     *         account:
     *           type: string
     *         status:
     *           type: string
     *           enum: *STATUS
     *       required:
     *       - id 
     *       - name 
     *       - cpfCnpj 
     *       - bank 
     *       - agency 
     *       - account 
     *       - status 
     * 
     *     CreateEditRecipientPayload:
     *       type: object
     *       properties:
     *         name:
     *           type: string
     *         email:
     *           type: string
     *           format: email
     *         cpf_cnpj:
     *           type: string
     *         key_type:
     *           type: string
     *           enum: *KEY_TYPES 
     *         key_value:
     *           type: string
     *       required:
     *       - name 
     *       - cpf_cnpj 
     *       - key_type
     *       - key_value
    */

    updateRecipient(fastify)
    createRecipient(fastify)
    listRecipients(fastify)
    deleteRecipient(fastify)
    BulkRecipientDeletion(fastify)
};

export default recipient;
