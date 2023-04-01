package repositories

import (
	"encoding/json"
	"fmt"
	"github/lucaspere/Transfeera_API_Test/grpc_service/service"
	"io/ioutil"
	"log"
	"os"
	"testing"

	"github.com/syndtr/goleveldb/leveldb"
	"google.golang.org/protobuf/encoding/protojson"
)

func getMockData() Recipients {
	md := `[{"id":"01a12cd1-738f-41ab-989b-5a75e8eba27a","name":"Ariadne Darrigoe","email":"adarrigoel@taobao.com","cpf_cnpj":"36145118121","status":"RASCUNHO","key_type":"CHAVE_ALEATORIA","key_value":"adarrigoel@ucoz.com","account":"96338-1","account_type":"POUPANÇA","bank":"INTER","agency":"244"},{"id":"1a17015b-6ec6-450c-a68e-df660d5de1c8","name":"Rosmunda Klimkov","email":"rklimkov0@sbwire.com","cpf_cnpj":"36145118121","status":"RASCUNHO","key_type":"EMAIL","key_value":"rklimkov0@netlog.com","account":"43644-0","account_type":"CORRENTE","bank":"SANTANDER","agency":"562"},{"id":"1a5e365a-3fa8-441f-8d31-e628229a6c63","name":"Burke Lindbergh","email":"blindberghm@merriam-webster.com","cpf_cnpj":"36145118121","status":"VALIDADO","key_type":"CHAVE_ALEATORIA","key_value":"blindberghm@webs.com","account":"90695-8","account_type":"POUPANÇA","bank":"ITAU","agency":"286"},{"id":"242c8189-cb3d-4fcc-9627-935ab066b4ec","name":"Sonia Kenwin","email":"skenwint@constantcontact.com","cpf_cnpj":"76597569653","status":"VALIDADO","key_type":"EMAIL","key_value":"skenwint@google.com.au","account":"89727-9","account_type":"CORRENTE","bank":"INTER","agency":"948"},{"id":"28b2f961-bcae-49ed-963d-d06cb6b75995","name":"Dunc Bairstow","email":"dbairstow6@umich.edu","cpf_cnpj":"36145118121","status":"RASCUNHO","key_type":"EMAIL","key_value":"dbairstow6@mayoclinic.com","account":"47325-8","account_type":"CORRENTE","bank":"INTER","agency":"000"},{"id":"29b3c625-f948-47c2-bdbc-444d591dd1d5","name":"Tris Book","email":"tbookd@theatlantic.com","cpf_cnpj":"56914618075821","status":"VALIDADO","key_type":"CPF","key_value":"123456789123","account":"25452-1","account_type":"CORRENTE","bank":"ITAU","agency":"644"},{"id":"30ca72e0-ff1b-4a8c-a9a2-b4326646939f","cpf_cnpj":"02038550603","email":"user@example.com","name":"string","status":"RASCUNHO","key_type":"CPF","key_value":"02038550603","account_type":"POUPANÇA","account":"00000-1","agency":"111","bank":"SANTANDER"},{"id":"341a3cb2-b355-4cb7-8f82-04eedeb5aa00","name":"Conney Verrillo","email":"cverrillop@free.fr","cpf_cnpj":"36145118121","status":"RASCUNHO","key_type":"EMAIL","key_value":"cverrillop@test.com","account":"11307-9","account_type":"POUPANÇA","bank":"ITAU","agency":"839"},{"id":"3a1fcee3-b8d6-489a-8f0a-bace20589686","cpf_cnpj":"02038550603","email":"user@example.com","name":"string","status":"RASCUNHO","key_type":"CPF","key_value":"02038550603","account_type":"POUPANÇA","account":"00000-1","agency":"111","bank":"SANTANDER"},{"id":"3fc64930-40d7-4197-aa18-b745f72f1e30","name":"Billy Levensky","email":"blevenskyc@skyrock.com","cpf_cnpj":"36145118121","status":"VALIDADO","key_type":"CPF","key_value":"blevenskyc@dot.gov","account":"30832-9","account_type":"CORRENTE","bank":"SANTANDER","agency":"107"}]`
	recipients := Recipients{}
	json.Unmarshal([]byte(md), &recipients)

	return recipients
}

func populateMockData(m Recipients) {
	db, err := open()
	if err != nil {
		log.Fatalf("Failed to open database: %v", err)
	}
	batch := new(leveldb.Batch)
	for _, b := range m {
		buf, _ := protojson.Marshal(b)
		batch.Put([]byte(b.Id), buf)
	}
	if err := db.Write(batch, nil); err != nil {
		log.Fatalf("Failed to write mock data %s", err)
	}
	db.Close()
}

func TestListRecipients(t *testing.T) {
	expected := getMockData()
	tempdir, err := ioutil.TempDir("", "leveldb")
	if err != nil {
		t.Fatalf("Failed to create temporary directory: %v", err)
	}
	defer os.RemoveAll(tempdir)
	os.Setenv("LEVELDB_LOCATION", tempdir+"/db")
	populateMockData(expected)

	in := &service.ListRecipientsRequest{ItemsPerPage: 50}
	recipients, err := RecipientRepository.List(in)
	if err != nil {
		t.Fatalf("failed to list recipients with %s", in)
	}

	if len(expected) != len(*recipients) {
		t.Errorf("Expected get back %d recipients, Got: %d", len(expected), len(*recipients))
	}
}

func TestFilterItemsPerPage(t *testing.T) {
	recipients := getMockData()

	filterItemsPerPage(&recipients, 3)

	if len(recipients) != 3 {
		t.Errorf("Expected get back 3 recipients, Got %d", len(recipients))
	}
}

func TestFilterRecipientsWithStatusValidado(t *testing.T) {
	recipients := getMockData()
	expected := `[id:"1a5e365a-3fa8-441f-8d31-e628229a6c63" name:"Burke Lindbergh" email:"blindberghm@merriam-webster.com" cpf_cnpj:"36145118121" key_type:"CHAVE_ALEATORIA" status:"VALIDADO" key_value:"blindberghm@webs.com" bank:"ITAU" account:"90695-8" account_type:"POUPANÇA" agency:"286" id:"242c8189-cb3d-4fcc-9627-935ab066b4ec" name:"Sonia Kenwin" email:"skenwint@constantcontact.com" cpf_cnpj:"76597569653" key_type:"EMAIL" status:"VALIDADO" key_value:"skenwint@google.com.au" bank:"INTER" account:"89727-9" account_type:"CORRENTE" agency:"948" id:"29b3c625-f948-47c2-bdbc-444d591dd1d5" name:"Tris Book" email:"tbookd@theatlantic.com" cpf_cnpj:"56914618075821" key_type:"CPF" status:"VALIDADO" key_value:"tbookd@ibm.com" bank:"ITAU" account:"25452-1" account_type:"CORRENTE" agency:"644" id:"3fc64930-40d7-4197-aa18-b745f72f1e30" name:"Billy Levensky" email:"blevenskyc@skyrock.com" cpf_cnpj:"36145118121" key_type:"CPF" status:"VALIDADO" key_value:"blevenskyc@dot.gov" bank:"SANTANDER" account:"30832-9" account_type:"CORRENTE" agency:"107"]`

	filterRecipients(&recipients, &service.ListRecipientsRequest{Status: "VALIDADO"})

	if fmt.Sprint(recipients) != expected {
		t.Errorf("Expected get back %s\nGot %s", expected, recipients)
	}
}

func TestFilterRecipientsWithStatusRascunhoAndKeyTypeEmail(t *testing.T) {
	recipients := getMockData()
	expected := `[id:"242c8189-cb3d-4fcc-9627-935ab066b4ec"  name:"Sonia Kenwin"  email:"skenwint@constantcontact.com"  cpf_cnpj:"76597569653"  key_type:"EMAIL"  status:"VALIDADO"  key_value:"skenwint@google.com.au"  bank:"INTER"  account:"89727-9"  account_type:"CORRENTE"  agency:"948"]`

	filterRecipients(&recipients, &service.ListRecipientsRequest{Status: "VALIDADO", KeyType: "EMAIL"})

	if fmt.Sprint(recipients) != expected {
		t.Errorf("\nExpected get back %s\nGot: %s", expected, recipients)
	}
}

func TestFilterRecipientsWithName(t *testing.T) {
	recipients := getMockData()
	expected := `[id:"1a5e365a-3fa8-441f-8d31-e628229a6c63" name:"Burke Lindbergh" email:"blindberghm@merriam-webster.com" cpf_cnpj:"36145118121" key_type:"CHAVE_ALEATORIA" status:"VALIDADO" key_value:"blindberghm@webs.com" bank:"ITAU" account:"90695-8" account_type:"POUPANÇA" agency:"286"]`

	filterRecipients(&recipients, &service.ListRecipientsRequest{Name: "Bur"})

	if fmt.Sprint(recipients) != expected {
		t.Errorf("\nExpected get back %s\nGot: %s", expected, recipients)
	}
}

func TestFilterRecipientsWithKeyValue(t *testing.T) {
	recipients := getMockData()
	expected := `[id:"29b3c625-f948-47c2-bdbc-444d591dd1d5" name:"Tris Book" email:"tbookd@theatlantic.com" cpf_cnpj:"56914618075821" key_type:"CPF" status:"VALIDADO" key_value:"123456789123" bank:"ITAU" account:"25452-1" account_type:"CORRENTE" agency:"644"]`

	filterRecipients(&recipients, &service.ListRecipientsRequest{KeyValue: "123456789123"})

	if fmt.Sprint(recipients) != expected {
		t.Errorf("\nExpected get back %s\nGot: %s", expected, recipients)
	}
}
