package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"

	rs "github/lucaspere/Transfeera_API_Test/grpc_service/service"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	"google.golang.org/protobuf/encoding/protojson"
)

var recipientsJson = `{
  "total": 30,
  "data": [
    {
      "id": "01a12cd1-738f-41ab-989b-5a75e8eba27a",
      "name": "Ariadne Darrigoe",
      "email": "adarrigoel@taobao.com",
      "cpf_cnpj": "36145118121",
      "status": "RASCUNHO",
      "key_type": "CHAVE_ALEATORIA",
      "key_value": "adarrigoel@ucoz.com",
      "account": "96338-1",
      "account_type": "POUPANÇA",
      "bank": "INTER",
      "agency": "244"
    },
    {
      "id": "1a17015b-6ec6-450c-a68e-df660d5de1c8",
      "name": "Rosmunda Klimkov",
      "email": "rklimkov0@sbwire.com",
      "cpf_cnpj": "36145118121",
      "status": "RASCUNHO",
      "key_type": "EMAIL",
      "key_value": "rklimkov0@netlog.com",
      "account": "43644-0",
      "account_type": "CORRENTE",
      "bank": "SANTANDER",
      "agency": "562"
    },
    {
      "id": "1a5e365a-3fa8-441f-8d31-e628229a6c63",
      "name": "Burke Lindbergh",
      "email": "blindberghm@merriam-webster.com",
      "cpf_cnpj": "36145118121",
      "status": "VALIDADO",
      "key_type": "CHAVE_ALEATORIA",
      "key_value": "blindberghm@webs.com",
      "account": "90695-8",
      "account_type": "POUPANÇA",
      "bank": "ITAU",
      "agency": "286"
    },
    {
      "id": "242c8189-cb3d-4fcc-9627-935ab066b4ec",
      "name": "Sonia Kenwin",
      "email": "skenwint@constantcontact.com",
      "cpf_cnpj": "76597569653",
      "status": "VALIDADO",
      "key_type": "EMAIL",
      "key_value": "skenwint@google.com.au",
      "account": "89727-9",
      "account_type": "CORRENTE",
      "bank": "INTER",
      "agency": "948"
    },
    {
      "id": "28b2f961-bcae-49ed-963d-d06cb6b75995",
      "name": "Dunc Bairstow",
      "email": "dbairstow6@umich.edu",
      "cpf_cnpj": "36145118121",
      "status": "RASCUNHO",
      "key_type": "EMAIL",
      "key_value": "dbairstow6@mayoclinic.com",
      "account": "47325-8",
      "account_type": "CORRENTE",
      "bank": "INTER",
      "agency": "000"
    },
    {
      "id": "29b3c625-f948-47c2-bdbc-444d591dd1d5",
      "name": "Tris Book",
      "email": "tbookd@theatlantic.com",
      "cpf_cnpj": "56914618075821",
      "status": "VALIDADO",
      "key_type": "CPF",
      "key_value": "tbookd@ibm.com",
      "account": "25452-1",
      "account_type": "CORRENTE",
      "bank": "ITAU",
      "agency": "644"
    },
    {
      "id": "341a3cb2-b355-4cb7-8f82-04eedeb5aa00",
      "name": "Conney Verrillo",
      "email": "cverrillop@free.fr",
      "cpf_cnpj": "36145118121",
      "status": "RASCUNHO",
      "key_type": "EMAIL",
      "key_value": "cverrillop@test.com",
      "account": "11307-9",
      "account_type": "POUPANÇA",
      "bank": "ITAU",
      "agency": "839"
    },
    {
      "id": "3fc64930-40d7-4197-aa18-b745f72f1e30",
      "name": "Billy Levensky",
      "email": "blevenskyc@skyrock.com",
      "cpf_cnpj": "36145118121",
      "status": "VALIDADO",
      "key_type": "CPF",
      "key_value": "blevenskyc@dot.gov",
      "account": "30832-9",
      "account_type": "CORRENTE",
      "bank": "SANTANDER",
      "agency": "107"
    },
    {
      "id": "4efbe38b-2dbf-4bce-849b-b8082a4097eb",
      "name": "Adelle Meth",
      "email": "ameth1@vinaora.com",
      "cpf_cnpj": "36145118121",
      "status": "VALIDADO",
      "key_type": "EMAIL",
      "key_value": "ameth1@mapquest.com",
      "account": "70829-8",
      "account_type": "CORRENTE",
      "bank": "ITAU",
      "agency": "655"
    },
    {
      "id": "50a9ab88-a873-47ad-a68b-10172f60abf2",
      "name": "Kaylee Wilcox",
      "email": "kwilcoxf@hostgator.com",
      "cpf_cnpj": "36145118121",
      "status": "RASCUNHO",
      "key_type": "CPF",
      "key_value": "kwilcoxf@theatlantic.com",
      "account": "14891-7",
      "account_type": "CORRENTE",
      "bank": "INTER",
      "agency": "948"
    },
    {
      "id": "6528c7bb-9c8b-4831-8830-de63b647e9aa",
      "name": "Jenifer Reicherz",
      "email": "jreicherze@prnewswire.com",
      "cpf_cnpj": "36145118121",
      "status": "VALIDADO",
      "key_type": "CPF",
      "key_value": "jreicherze@slashdot.org",
      "account": "32303-4",
      "account_type": "CORRENTE",
      "bank": "INTER",
      "agency": "575"
    },
    {
      "id": "898789cd-df2d-4423-b93c-5c92bd534f6b",
      "name": "Sada Pedden",
      "email": "speddenn@wikimedia.org",
      "cpf_cnpj": "36145118121",
      "status": "VALIDADO",
      "key_type": "CHAVE_ALEATORIA",
      "key_value": "speddenn@springer.com",
      "account": "67624-0",
      "account_type": "POUPANÇA",
      "bank": "ITAU",
      "agency": "133"
    },
    {
      "id": "9058ac22-8c18-400f-8fab-bf4d3638579d",
      "name": "Lynn Born",
      "email": "lbornq@parallels.com",
      "cpf_cnpj": "56914618075821",
      "status": "RASCUNHO",
      "key_type": "EMAIL",
      "key_value": "lbornq@fotki.com",
      "account": "87478-0",
      "account_type": "CORRENTE",
      "bank": "ITAU",
      "agency": "611"
    },
    {
      "id": "9409611a-3c0b-4d4f-84e1-f566d013d54d",
      "name": "Hertha Meredith",
      "email": "hmeredithk@google.it",
      "cpf_cnpj": "79470337687944",
      "status": "VALIDADO",
      "key_type": "CHAVE_ALEATORIA",
      "key_value": "hmeredithk@wunderground.com",
      "account": "66471-2",
      "account_type": "POUPANÇA",
      "bank": "ITAU",
      "agency": "277"
    },
    {
      "id": "a24a0ca5-345f-4309-877d-2f9f805917ae",
      "name": "Rochell Barlie",
      "email": "rbarlie2@wp.com",
      "cpf_cnpj": "56914618075821",
      "status": "VALIDADO",
      "key_type": "EMAIL",
      "key_value": "rbarlie2@nyu.edu",
      "account": "90151-1",
      "account_type": "CORRENTE",
      "bank": "ITAU",
      "agency": "701"
    },
    {
      "id": "a7241d75-d5b6-4cd7-bacf-b9a1b402da53",
      "name": "Mignon Oates",
      "email": "moates9@php.net",
      "cpf_cnpj": "05398774075",
      "status": "RASCUNHO",
      "key_type": "TELEFONE",
      "key_value": "moates9@google.ru",
      "account": "58906-7",
      "account_type": "CORRENTE",
      "bank": "SANTANDER",
      "agency": "976"
    },
    {
      "id": "b09e4695-3f20-47db-8c71-691fed0164f6",
      "name": "Juliet Fawkes",
      "email": "jfawkess@wikispaces.com",
      "cpf_cnpj": "36145118121",
      "status": "RASCUNHO",
      "key_type": "EMAIL",
      "key_value": "jfawkess@test.com",
      "account": "25433-2",
      "account_type": "CORRENTE",
      "bank": "SANTANDER",
      "agency": "147"
    },
    {
      "id": "b6105a06-f06f-4769-9445-7a5afe38cd11",
      "name": "Kent Batchelor",
      "email": "kbatcheloro@webnode.com",
      "cpf_cnpj": "36145118121",
      "status": "VALIDADO",
      "key_type": "CHAVE_ALEATORIA",
      "key_value": "kbatcheloro@fc2.com",
      "account": "14345-6",
      "account_type": "POUPANÇA",
      "bank": "ITAU",
      "agency": "275"
    },
    {
      "id": "bba1c4ad-b445-4d79-bc88-bfdc62fd07a5",
      "name": "Hallsy Spensley",
      "email": "hspensley8@sbwire.com",
      "cpf_cnpj": "79470337687944",
      "status": "VALIDADO",
      "key_type": "TELEFONE",
      "key_value": "hspensley8@cbslocal.com",
      "account": "91830-2",
      "account_type": "CORRENTE",
      "bank": "ITAU",
      "agency": "976"
    },
    {
      "id": "c2d28f22-ab3a-4246-b0a1-979255398dee",
      "name": "Brett Becerra",
      "email": "bbecerrar@odnoklassniki.ru",
      "cpf_cnpj": "36145118121",
      "status": "RASCUNHO",
      "key_type": "EMAIL",
      "key_value": "bbecerrar@foxnews.com",
      "account": "85493-1",
      "account_type": "CORRENTE",
      "bank": "ITAU",
      "agency": "518"
    },
    {
      "id": "ce08e132-a0bb-4adc-ab74-0a312c22c9fa",
      "name": "Gert Shireff",
      "email": "gshireffh@tinyurl.com",
      "cpf_cnpj": "05398774075",
      "status": "VALIDADO",
      "key_type": "CNPJ",
      "key_value": "gshireffh@domainmarket.com",
      "account": "75194-7",
      "account_type": "POUPANÇA",
      "bank": "INTER",
      "agency": "693"
    },
    {
      "id": "ce4daea9-0227-4627-af36-2fb2548337e7",
      "name": "Harlie Cecely",
      "email": "hcecelyb@weibo.com",
      "cpf_cnpj": "05398774075",
      "status": "RASCUNHO",
      "key_type": "TELEFONE",
      "key_value": "hcecelyb@mapy.cz",
      "account": "90460-4",
      "account_type": "CORRENTE",
      "bank": "ITAU",
      "agency": "995"
    },
    {
      "id": "d30fc241-24a8-44e3-853f-74b1fc61944d",
      "name": "Emlynne Jeal",
      "email": "ejealj@cyberchimps.com",
      "cpf_cnpj": "79470337687944",
      "status": "RASCUNHO",
      "key_type": "CNPJ",
      "key_value": "ejealj@ustream.tv",
      "account": "92951-0",
      "account_type": "POUPANÇA",
      "bank": "INTER",
      "agency": "338"
    },
    {
      "id": "da6552da-b8a9-419a-b33a-b54c34c30557",
      "name": "Kyle Aulton",
      "email": "kaultona@constantcontact.com",
      "cpf_cnpj": "[0-9]][0-9]]][0-9]]][/[0-9]]]][-[0-9]]",
      "status": "RASCUNHO",
      "key_type": "TELEFONE",
      "key_value": "kaultona@newyorker.com",
      "account": "04731-1",
      "account_type": "CORRENTE",
      "bank": "INTER",
      "agency": "893"
    },
    {
      "id": "dab0131d-8453-4a76-b0e2-8a8e2981acc9",
      "name": "Patrizia M'Chirrie",
      "email": "pmchirrie3@hp.com",
      "cpf_cnpj": "36145118121",
      "status": "RASCUNHO",
      "key_type": "EMAIL",
      "key_value": "pmchirrie3@hhs.gov",
      "account": "02404-3",
      "account_type": "CORRENTE",
      "bank": "SANTANDER",
      "agency": "954"
    },
    {
      "id": "ed1f40ad-bf07-4183-ad72-ec5f80ad08a2",
      "name": "Hobie Pedder",
      "email": "hpedder4@mashable.com",
      "cpf_cnpj": "36145118121",
      "status": "VALIDADO",
      "key_type": "EMAIL",
      "key_value": "hpedder4@youtube.com",
      "account": "18150-6",
      "account_type": "CORRENTE",
      "bank": "SANTANDER",
      "agency": "414"
    },
    {
      "id": "f2f7ef27-38cb-4b86-a42e-e8d1053e149b",
      "name": "Minni M'Barron",
      "email": "mmbarron7@earthlink.net",
      "cpf_cnpj": "56914618075821",
      "status": "RASCUNHO",
      "key_type": "TELEFONE",
      "key_value": "mmbarron7@ifeng.com",
      "account": "13862-7",
      "account_type": "CORRENTE",
      "bank": "ITAU",
      "agency": "028"
    },
    {
      "id": "f694e526-0f01-4ddd-bc35-e473a219a645",
      "name": "Rochelle Barthropp",
      "email": "rbarthropp5@eventbrite.com",
      "cpf_cnpj": "36145118121",
      "status": "VALIDADO",
      "key_type": "EMAIL",
      "key_value": "rbarthropp5@eepurl.com",
      "account": "76326-6",
      "account_type": "CORRENTE",
      "bank": "INTER",
      "agency": "209"
    },
    {
      "id": "fa7c4c8c-dc10-48c9-8455-3b63be1c722a",
      "name": "Ellissa Stithe",
      "email": "estithei@weibo.com",
      "cpf_cnpj": "05398774075",
      "status": "RASCUNHO",
      "key_type": "CNPJ",
      "key_value": "estithei@house.gov",
      "account": "19751-9",
      "account_type": "POUPANÇA",
      "bank": "INTER",
      "agency": "161"
    },
    {
      "id": "fd59dcae-fd0b-44af-a660-a0fb7b06e4d3",
      "name": "Othilia Witcherley",
      "email": "owitcherleyg@springer.com",
      "cpf_cnpj": "36145118121",
      "status": "RASCUNHO",
      "key_type": "CNPJ",
      "key_value": "owitcherleyg@bbc.co.uk",
      "account": "40085-3",
      "account_type": "CORRENTE",
      "bank": "SANTANDER",
      "agency": "392"
    }
  ]
}`

var listReply rs.ListRecipientsReply

func init() {
	err := protojson.Unmarshal([]byte(recipientsJson), &listReply)
	if err != nil {
		fmt.Println(err)
	}
}

type recipientsService struct {
	rs.UnimplementedRecipientsServer
}

func (service recipientsService) ListRecipients(ctx context.Context, in *rs.ListRecipientsRequest) (*rs.ListRecipientsReply, error) {
	if in.ItemsPerPage == 0 {
		in.ItemsPerPage = 10
	}
	reply := rs.ListRecipientsReply{Total: 0, Data: make([]*rs.Recipient, 0)}

	for i := 0; i < len(listReply.Data) && i < int(in.ItemsPerPage); i++ {
		reply.Data = append(reply.Data, listReply.Data[i])
		reply.Total += 1
	}

	return &reply, nil
}

func main() {
	address := os.Getenv("GRPC_ADDRESS")
	if address == "" {
		address = ":50021"
	}

	l, err := net.Listen("tcp", address)
	if err != nil {
		log.Fatal(err)
	}

	s := grpc.NewServer()

	rs.RegisterRecipientsServer(s, recipientsService{})
	reflection.Register(s)
	log.Println("gRPC server listening at " + address)
	log.Fatal(s.Serve(l))
}