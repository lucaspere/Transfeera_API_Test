# Transfeera API
## Observações
Para visualizar o código da primeira versão final entregado no dia 31-03 para revisão, ir para a tag [only_nodejs](https://github.com/lucaspere/Transfeera_API_Test/tree/only_nodejs) ([release](https://github.com/lucaspere/Transfeera_API_Test/releases/tag/only_nodejs)).

Esta versão que está no *main* é uma com integração da API feito em Node.js com o serviço feito em Go, usando o protocolo gRPC. A integração está totalmente funcional, mas há alguns problemas típicos de concorrência que não está totalmente sincronizado como a atualização entre processos diferentes. Contudo, pode ser usado normalmente (O tutorial está na seção *Como Iniciar*).

> Eu já esperava isso, pois usei o LevelDB como Banco de Dados onde ele não foi criado pensando em concorrência. Se substituisse por [Redis](https://redis.io/) ou [Foundationdb](https://www.foundationdb.org/), a sincronização seria perfeita, mas com configuração mais complexas que não faz sentido para este teste.
## Resumo
### Tecnologias
- Linguagem: [Typescript](https://www.typescriptlang.org/) e [Go](https://go.dev/);
- *Framework*: [Fastify](https://www.fastify.io/) e [grpc-go](https://github.com/grpc/grpc-go);
- Banco de Dados: Memória e [leveldb](https://github.com/google/leveldb);
- Testes: [Mocha](https://mochajs.org/) com [Chai](https://www.chaijs.com/) e [testing](https://pkg.go.dev/testing);
- Observabilidade: [Pino](https://github.com/pinojs/pino) (Desenvolvimento) e [LogTail](https://betterstack.com/logtail) (Produção);
- Protocolo de API: [Representational State Transfer (REST)](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm) e [gRPC](https://grpc.io/);
- Interface de API: [OpenAPI 3.0](https://spec.openapis.org/oas/v3.0.3) e [ProtoBuf](https://protobuf.dev/).

### Rotas
![image](https://user-images.githubusercontent.com/46873546/229122352-a48b2183-d2a5-47fc-b431-e2b3c48d7b07.png)

A rota da documentação do ***Swagger** é ``[HOST]/documentation/static/index.html``. Todas as descrições de como interagir com a aplicação estão descritas na especificação.

### Métodos gRPC
  ```proto
  rpc ListRecipients(ListRecipientsRequest) returns (ListRecipientsReply) {}
  rpc CreateRicipient(CreateRecipientRequest) returns (Recipient) {}
  rpc EditRecipient(EditRecipientequest) returns (Recipient) {}
  rpc DeleteRecipient(DeleteRecipientRequest) returns (google.protobuf.Empty) {}
  rpc BulkDeleteRecipients(BulkDeleteRecipientsRequest) returns (BulkDeleteResponse) {}
 ```
 O restante da interface do serviço está descrito no arquivo [*proto*](https://github.com/lucaspere/Transfeera_API_Test/blob/main/grpc_service/service/recipients.proto)
 
### Testes
- Total de testes de integração: **18**;
- Total de testes unitários: **50** (45 Nodejs, 5 Go);
- Total de testes: **63**;

Para o testes de integração foi usado a interface [BDD](https://pt.wikipedia.org/wiki/Behavior_Driven_Development). Já para os unitários foram usados o [TDD](https://pt.wikipedia.org/wiki/Test-driven_development) Nodejs e [Table-Driven Testing](https://engineering.mercari.com/en/blog/entry/20211221-a-deep-dive-into-table-driven-testing-in-golang/) no Golang.

## Como iniciar
> A aplicação foi testado em dois ambientes: Ubuntu 22.04.2 LTS e no Windows usando WSL2. Versão do Node.js v18.14.0 e Go go1.20 linux/amd64.

1. Clona este repositório.
2. Com o *command-line* no diretório, rode o script ``npm install``.

### Inicializando o aplicativo.
Criei dois serviços diferentes um em Node.js usando o estilo **InProcess**, isto é, chamadas de funções gerenciadas pelo Sistema Operacional e, o outro, usando o Protocolo gRPC que é gerenciada pelo protocolo *TCP*.
> Visualizar o Diagrama para melhor entendimento.

#### Node.js com serviço ***InProcessService***.
Há dois *scripts* para rodar a aplicação: `npm run dev` e `npm run dev:memory`.
- ***dev:memory***: vai rodar a aplicação usando a memória como banco de dados (***MemoryRepository***);
- ***dev***: roda a aplicação usando o [leveldb](https://github.com/google/leveldb) como bacno de dados (***LevelRepository***).
  - **Obs:** para o levelDB, é preciso rodar o *script* ``npm run populate`` para popular os dados.

#### Node.js com Integração ***GrpcService***;
 > **Importante:** Como os dois usam o levelDB, é preciso rodar o *script* ``npm run populate`` para popular os dados.
 
 Há dois *scripts* para `npm run dev:grpc` e `npm run start:grpc` .

- ***npm run dev:grpc***: vai inicializar o app Node.js usando o serviço (***GrpcRecipientService***) definido pela variável de ambiente *SERVICE_TYPE*;
- ***npm run start:grpc***: vai inicializar o gRPC *server* usando o binário gerado pelo compilador Go, *bin/server*.;

### Testando o aplicativo.
#### Node.js
Há três *scripts* para testar a aplicação: `npm run test` `npm run test:unit` e `npm run test:integration`. Todos os testes usam dados na memória como Banco de dados (***MemoryRepository***).

- ***test:integration***: Roda apenas os testes de integração apenas nos arquivos ``tests/app.test.ts`` e ``tests/server.test.ts`` ([BDD](https://pt.wikipedia.org/wiki/Behavior_Driven_Development));
- ***test:unit***: Roda aspenas os testes unitários ([TDD](https://pt.wikipedia.org/wiki/Test-driven_development));
- ***test***: Roda todos os testes.

#### Golang
Ir na pasta `grpc_service/server` e rodar
```bash
go test ./... -v
```

## Arquitetura
### Diagrama
#### Primeira Versão (Somente Nodejs)
![image](https://user-images.githubusercontent.com/46873546/229138431-02dafe09-e307-4e91-94b1-87d5f8808002.png)
#### Segunda Versão com gRPC
![Web Client and Server(3)(1)](https://user-images.githubusercontent.com/46873546/229322642-cc033c0d-8e55-4609-a903-7bc9b30b7a52.png)

### Uso da Linguagem
Usei o Typescript, pois para aplicação onde diversas pessoas vão atuar e que precisa de diferentes validações, linguagem típada ajuda bastante na manuntenção da aplicação. Para o Grpc, usei o Golang pois oferece diversas bibliotecas para criar e testar com muita segurança um servidor gRPC. Geralmente nas minhas aplicações eu crio os *servers* gRPC usando Golang e o *client* usando Node.js, [nice-grpc](https://github.com/deeplay-io/nice-grpc), ou Rust, [Tonic](https://github.com/hyperium/tonic)

### Escolha da Framework
Gosto bastante de usar o Fastify nas minhas aplicações Node.js, pois oferece diversos [Plugins](https://www.fastify.io/docs/latest/Reference/Plugins/), é bastante ativo na manuntenção [último Bumped](https://github.com/fastify/fastify/commit/87b644087c5b15bd70766bc4efeb940308d97066) e é a mais rápida, [Benchmark](https://www.fastify.io/benchmarks/).

## Banco de dados
Criei um banco de dados na memória, pois permite um foco maior, inicialmente, para desenvolver as regras de negócio e não na configuração de Bancos de Dados. E também, em ambientes de testes ele é perfeito, pois os dados são voláteis e não precisa de uma limpeza Complexa. Para dados persistentes, usei o LevelDB que é um Banco de dados *key-value*, mas bantante poderoso que persiste os dados em arquivos. Uso ele bastante para criação de camadas cache em ambientes não concorrentes (pois concorrência em arquivos é meio complicado).

Para permitir uma portabilidade legal entre esses dois tipos de Banco de dados, criei uma função (Tipo um padrão [*Factory*](https://pt.wikipedia.org/wiki/Factory_Method)) para [importar dinâmicamente](https://javascript.info/modules-dynamic-imports) o repositório de acordo com a variável de ambiente ***REPOSITORY_TYPE*** (MemoryRepository e LevelRepository).


### Testes
Os testes foram organizados em dois níveis (Unitário e Integração) cada uma com as suas próprias configurações (***mocharc.integration.yaml*** e ***mocharc.unit.yaml***). Eu uso o Mocha como a biblioteca de teste, juntamento com Chai, porque há uma vasta documentação e a configuração é muito poderosa. para os Mocks, usei a biblioteca [Sinon](https://github.com/sinonjs/sinon).

Por exemplo, com Mocha e Chai, eu usei o BDD para os testes de integração já que esse estilo permite maior entendimento com setores não de Engenharia. E usei o TDD para os testes unitários, haja vista que esse estilo é melhor adaptado para os desenvolvedores.

### Observabilidade
Todas as principais fluxos da aplicações estão *logadas* para melhor entendimento da aplicação. Eu gosto do Pino, pois oferece já vem muito bem configurada e, mesmo assim, é bastante aberto para configuração. Há três configurações de *logging* de acordo com o ambiente da aplicação:
- **Desenvolvimento**: A saída dos *logs* é o ``STDOUT`` e usa o formato do [Pino-Pretty](https://github.com/pinojs/pino-pretty);
- **Produção**: Usa o *Transporter** [Logtail](https://github.com/logtail/logtail-js)` para mandar para o aplicativo;
- **Teste**: os *logs* são desabilitados.

### 

