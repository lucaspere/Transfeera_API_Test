/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import * as _m0 from "protobufjs/minimal";
import { Empty } from "../../google/protobuf/empty";

export const protobufPackage = "";

export enum KeyTypes {
  EMAIL = 0,
  CPF = 2,
  CNPJ = 3,
  TELEFONE = 4,
  CHAVE_ALEATORIA = 5,
  UNRECOGNIZED = -1,
}

export function keyTypesFromJSON(object: any): KeyTypes {
  switch (object) {
    case 0:
    case "EMAIL":
      return KeyTypes.EMAIL;
    case 2:
    case "CPF":
      return KeyTypes.CPF;
    case 3:
    case "CNPJ":
      return KeyTypes.CNPJ;
    case 4:
    case "TELEFONE":
      return KeyTypes.TELEFONE;
    case 5:
    case "CHAVE_ALEATORIA":
      return KeyTypes.CHAVE_ALEATORIA;
    case -1:
    case "UNRECOGNIZED":
    default:
      return KeyTypes.UNRECOGNIZED;
  }
}

export function keyTypesToJSON(object: KeyTypes): string {
  switch (object) {
    case KeyTypes.EMAIL:
      return "EMAIL";
    case KeyTypes.CPF:
      return "CPF";
    case KeyTypes.CNPJ:
      return "CNPJ";
    case KeyTypes.TELEFONE:
      return "TELEFONE";
    case KeyTypes.CHAVE_ALEATORIA:
      return "CHAVE_ALEATORIA";
    case KeyTypes.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum Status {
  VALIDADO = 0,
  RASCUNHO = 1,
  UNRECOGNIZED = -1,
}

export function statusFromJSON(object: any): Status {
  switch (object) {
    case 0:
    case "VALIDADO":
      return Status.VALIDADO;
    case 1:
    case "RASCUNHO":
      return Status.RASCUNHO;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Status.UNRECOGNIZED;
  }
}

export function statusToJSON(object: Status): string {
  switch (object) {
    case Status.VALIDADO:
      return "VALIDADO";
    case Status.RASCUNHO:
      return "RASCUNHO";
    case Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ListRecipientsRequest {
  itemsPerPage: number;
  status: string;
  keyType: string;
  keyValue: string;
  name: string;
}

export interface CreateRecipientRequest {
  recipient: Recipient | undefined;
}

export interface EditRecipientequest {
  id: string;
  recipient: Recipient | undefined;
}

export interface DeleteRecipientRequest {
  id: string;
}

export interface BulkDeleteRecipientsRequest {
  ids: string[];
}

export interface ListRecipientsReply {
  total: number;
  data: Recipient[];
}

export interface BulkDeleteResponse {
  total: number;
}

export interface Recipient {
  id: string;
  name: string;
  email: string;
  cpfCnpj: string;
  keyType: string;
  status: string;
  keyValue: string;
  bank: string;
  account: string;
  accountType: string;
  agency: string;
}

function createBaseListRecipientsRequest(): ListRecipientsRequest {
  return { itemsPerPage: 0, status: "", keyType: "", keyValue: "", name: "" };
}

export const ListRecipientsRequest = {
  encode(message: ListRecipientsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.itemsPerPage !== 0) {
      writer.uint32(8).int32(message.itemsPerPage);
    }
    if (message.status !== "") {
      writer.uint32(18).string(message.status);
    }
    if (message.keyType !== "") {
      writer.uint32(26).string(message.keyType);
    }
    if (message.keyValue !== "") {
      writer.uint32(34).string(message.keyValue);
    }
    if (message.name !== "") {
      writer.uint32(42).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListRecipientsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListRecipientsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.itemsPerPage = reader.int32();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.status = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.keyType = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.keyValue = reader.string();
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListRecipientsRequest {
    return {
      itemsPerPage: isSet(object.itemsPerPage) ? Number(object.itemsPerPage) : 0,
      status: isSet(object.status) ? String(object.status) : "",
      keyType: isSet(object.keyType) ? String(object.keyType) : "",
      keyValue: isSet(object.keyValue) ? String(object.keyValue) : "",
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: ListRecipientsRequest): unknown {
    const obj: any = {};
    message.itemsPerPage !== undefined && (obj.itemsPerPage = Math.round(message.itemsPerPage));
    message.status !== undefined && (obj.status = message.status);
    message.keyType !== undefined && (obj.keyType = message.keyType);
    message.keyValue !== undefined && (obj.keyValue = message.keyValue);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  create(base?: DeepPartial<ListRecipientsRequest>): ListRecipientsRequest {
    return ListRecipientsRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ListRecipientsRequest>): ListRecipientsRequest {
    const message = createBaseListRecipientsRequest();
    message.itemsPerPage = object.itemsPerPage ?? 0;
    message.status = object.status ?? "";
    message.keyType = object.keyType ?? "";
    message.keyValue = object.keyValue ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseCreateRecipientRequest(): CreateRecipientRequest {
  return { recipient: undefined };
}

export const CreateRecipientRequest = {
  encode(message: CreateRecipientRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.recipient !== undefined) {
      Recipient.encode(message.recipient, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateRecipientRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateRecipientRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.recipient = Recipient.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateRecipientRequest {
    return { recipient: isSet(object.recipient) ? Recipient.fromJSON(object.recipient) : undefined };
  },

  toJSON(message: CreateRecipientRequest): unknown {
    const obj: any = {};
    message.recipient !== undefined &&
      (obj.recipient = message.recipient ? Recipient.toJSON(message.recipient) : undefined);
    return obj;
  },

  create(base?: DeepPartial<CreateRecipientRequest>): CreateRecipientRequest {
    return CreateRecipientRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CreateRecipientRequest>): CreateRecipientRequest {
    const message = createBaseCreateRecipientRequest();
    message.recipient = (object.recipient !== undefined && object.recipient !== null)
      ? Recipient.fromPartial(object.recipient)
      : undefined;
    return message;
  },
};

function createBaseEditRecipientequest(): EditRecipientequest {
  return { id: "", recipient: undefined };
}

export const EditRecipientequest = {
  encode(message: EditRecipientequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.recipient !== undefined) {
      Recipient.encode(message.recipient, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EditRecipientequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEditRecipientequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.recipient = Recipient.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EditRecipientequest {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      recipient: isSet(object.recipient) ? Recipient.fromJSON(object.recipient) : undefined,
    };
  },

  toJSON(message: EditRecipientequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.recipient !== undefined &&
      (obj.recipient = message.recipient ? Recipient.toJSON(message.recipient) : undefined);
    return obj;
  },

  create(base?: DeepPartial<EditRecipientequest>): EditRecipientequest {
    return EditRecipientequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<EditRecipientequest>): EditRecipientequest {
    const message = createBaseEditRecipientequest();
    message.id = object.id ?? "";
    message.recipient = (object.recipient !== undefined && object.recipient !== null)
      ? Recipient.fromPartial(object.recipient)
      : undefined;
    return message;
  },
};

function createBaseDeleteRecipientRequest(): DeleteRecipientRequest {
  return { id: "" };
}

export const DeleteRecipientRequest = {
  encode(message: DeleteRecipientRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteRecipientRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteRecipientRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteRecipientRequest {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: DeleteRecipientRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  create(base?: DeepPartial<DeleteRecipientRequest>): DeleteRecipientRequest {
    return DeleteRecipientRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<DeleteRecipientRequest>): DeleteRecipientRequest {
    const message = createBaseDeleteRecipientRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseBulkDeleteRecipientsRequest(): BulkDeleteRecipientsRequest {
  return { ids: [] };
}

export const BulkDeleteRecipientsRequest = {
  encode(message: BulkDeleteRecipientsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BulkDeleteRecipientsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBulkDeleteRecipientsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.ids.push(reader.string());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BulkDeleteRecipientsRequest {
    return { ids: Array.isArray(object?.ids) ? object.ids.map((e: any) => String(e)) : [] };
  },

  toJSON(message: BulkDeleteRecipientsRequest): unknown {
    const obj: any = {};
    if (message.ids) {
      obj.ids = message.ids.map((e) => e);
    } else {
      obj.ids = [];
    }
    return obj;
  },

  create(base?: DeepPartial<BulkDeleteRecipientsRequest>): BulkDeleteRecipientsRequest {
    return BulkDeleteRecipientsRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BulkDeleteRecipientsRequest>): BulkDeleteRecipientsRequest {
    const message = createBaseBulkDeleteRecipientsRequest();
    message.ids = object.ids?.map((e) => e) || [];
    return message;
  },
};

function createBaseListRecipientsReply(): ListRecipientsReply {
  return { total: 0, data: [] };
}

export const ListRecipientsReply = {
  encode(message: ListRecipientsReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.total !== 0) {
      writer.uint32(8).int32(message.total);
    }
    for (const v of message.data) {
      Recipient.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListRecipientsReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListRecipientsReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.total = reader.int32();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.data.push(Recipient.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListRecipientsReply {
    return {
      total: isSet(object.total) ? Number(object.total) : 0,
      data: Array.isArray(object?.data) ? object.data.map((e: any) => Recipient.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListRecipientsReply): unknown {
    const obj: any = {};
    message.total !== undefined && (obj.total = Math.round(message.total));
    if (message.data) {
      obj.data = message.data.map((e) => e ? Recipient.toJSON(e) : undefined);
    } else {
      obj.data = [];
    }
    return obj;
  },

  create(base?: DeepPartial<ListRecipientsReply>): ListRecipientsReply {
    return ListRecipientsReply.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ListRecipientsReply>): ListRecipientsReply {
    const message = createBaseListRecipientsReply();
    message.total = object.total ?? 0;
    message.data = object.data?.map((e) => Recipient.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBulkDeleteResponse(): BulkDeleteResponse {
  return { total: 0 };
}

export const BulkDeleteResponse = {
  encode(message: BulkDeleteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.total !== 0) {
      writer.uint32(8).int32(message.total);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BulkDeleteResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBulkDeleteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.total = reader.int32();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BulkDeleteResponse {
    return { total: isSet(object.total) ? Number(object.total) : 0 };
  },

  toJSON(message: BulkDeleteResponse): unknown {
    const obj: any = {};
    message.total !== undefined && (obj.total = Math.round(message.total));
    return obj;
  },

  create(base?: DeepPartial<BulkDeleteResponse>): BulkDeleteResponse {
    return BulkDeleteResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BulkDeleteResponse>): BulkDeleteResponse {
    const message = createBaseBulkDeleteResponse();
    message.total = object.total ?? 0;
    return message;
  },
};

function createBaseRecipient(): Recipient {
  return {
    id: "",
    name: "",
    email: "",
    cpfCnpj: "",
    keyType: "",
    status: "",
    keyValue: "",
    bank: "",
    account: "",
    accountType: "",
    agency: "",
  };
}

export const Recipient = {
  encode(message: Recipient, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.email !== "") {
      writer.uint32(26).string(message.email);
    }
    if (message.cpfCnpj !== "") {
      writer.uint32(34).string(message.cpfCnpj);
    }
    if (message.keyType !== "") {
      writer.uint32(42).string(message.keyType);
    }
    if (message.status !== "") {
      writer.uint32(50).string(message.status);
    }
    if (message.keyValue !== "") {
      writer.uint32(58).string(message.keyValue);
    }
    if (message.bank !== "") {
      writer.uint32(66).string(message.bank);
    }
    if (message.account !== "") {
      writer.uint32(74).string(message.account);
    }
    if (message.accountType !== "") {
      writer.uint32(82).string(message.accountType);
    }
    if (message.agency !== "") {
      writer.uint32(90).string(message.agency);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Recipient {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecipient();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.email = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.cpfCnpj = reader.string();
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.keyType = reader.string();
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.status = reader.string();
          continue;
        case 7:
          if (tag != 58) {
            break;
          }

          message.keyValue = reader.string();
          continue;
        case 8:
          if (tag != 66) {
            break;
          }

          message.bank = reader.string();
          continue;
        case 9:
          if (tag != 74) {
            break;
          }

          message.account = reader.string();
          continue;
        case 10:
          if (tag != 82) {
            break;
          }

          message.accountType = reader.string();
          continue;
        case 11:
          if (tag != 90) {
            break;
          }

          message.agency = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Recipient {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      email: isSet(object.email) ? String(object.email) : "",
      cpfCnpj: isSet(object.cpfCnpj) ? String(object.cpfCnpj) : "",
      keyType: isSet(object.keyType) ? String(object.keyType) : "",
      status: isSet(object.status) ? String(object.status) : "",
      keyValue: isSet(object.keyValue) ? String(object.keyValue) : "",
      bank: isSet(object.bank) ? String(object.bank) : "",
      account: isSet(object.account) ? String(object.account) : "",
      accountType: isSet(object.accountType) ? String(object.accountType) : "",
      agency: isSet(object.agency) ? String(object.agency) : "",
    };
  },

  toJSON(message: Recipient): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.email !== undefined && (obj.email = message.email);
    message.cpfCnpj !== undefined && (obj.cpfCnpj = message.cpfCnpj);
    message.keyType !== undefined && (obj.keyType = message.keyType);
    message.status !== undefined && (obj.status = message.status);
    message.keyValue !== undefined && (obj.keyValue = message.keyValue);
    message.bank !== undefined && (obj.bank = message.bank);
    message.account !== undefined && (obj.account = message.account);
    message.accountType !== undefined && (obj.accountType = message.accountType);
    message.agency !== undefined && (obj.agency = message.agency);
    return obj;
  },

  create(base?: DeepPartial<Recipient>): Recipient {
    return Recipient.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Recipient>): Recipient {
    const message = createBaseRecipient();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.email = object.email ?? "";
    message.cpfCnpj = object.cpfCnpj ?? "";
    message.keyType = object.keyType ?? "";
    message.status = object.status ?? "";
    message.keyValue = object.keyValue ?? "";
    message.bank = object.bank ?? "";
    message.account = object.account ?? "";
    message.accountType = object.accountType ?? "";
    message.agency = object.agency ?? "";
    return message;
  },
};

export type RecipientsDefinition = typeof RecipientsDefinition;
export const RecipientsDefinition = {
  name: "Recipients",
  fullName: "Recipients",
  methods: {
    listRecipients: {
      name: "ListRecipients",
      requestType: ListRecipientsRequest,
      requestStream: false,
      responseType: ListRecipientsReply,
      responseStream: false,
      options: {},
    },
    createRicipient: {
      name: "CreateRicipient",
      requestType: CreateRecipientRequest,
      requestStream: false,
      responseType: Recipient,
      responseStream: false,
      options: {},
    },
    editRecipient: {
      name: "EditRecipient",
      requestType: EditRecipientequest,
      requestStream: false,
      responseType: Recipient,
      responseStream: false,
      options: {},
    },
    delteRecipient: {
      name: "DelteRecipient",
      requestType: DeleteRecipientRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    bulkDeleteRecipients: {
      name: "BulkDeleteRecipients",
      requestType: ListRecipientsRequest,
      requestStream: false,
      responseType: BulkDeleteResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface RecipientsServiceImplementation<CallContextExt = {}> {
  listRecipients(
    request: ListRecipientsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ListRecipientsReply>>;
  createRicipient(
    request: CreateRecipientRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<Recipient>>;
  editRecipient(request: EditRecipientequest, context: CallContext & CallContextExt): Promise<DeepPartial<Recipient>>;
  delteRecipient(request: DeleteRecipientRequest, context: CallContext & CallContextExt): Promise<DeepPartial<Empty>>;
  bulkDeleteRecipients(
    request: ListRecipientsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BulkDeleteResponse>>;
}

export interface RecipientsClient<CallOptionsExt = {}> {
  listRecipients(
    request: DeepPartial<ListRecipientsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ListRecipientsReply>;
  createRicipient(
    request: DeepPartial<CreateRecipientRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<Recipient>;
  editRecipient(request: DeepPartial<EditRecipientequest>, options?: CallOptions & CallOptionsExt): Promise<Recipient>;
  delteRecipient(request: DeepPartial<DeleteRecipientRequest>, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  bulkDeleteRecipients(
    request: DeepPartial<ListRecipientsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BulkDeleteResponse>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
