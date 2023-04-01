package repositories

import (
	"encoding/json"
	"fmt"
	rs "github/lucaspere/Transfeera_API_Test/grpc_service/service"
	"log"
	"os"
	"strings"

	"github.com/syndtr/goleveldb/leveldb"
	"google.golang.org/protobuf/encoding/protojson"
)

var RecipientRepository Repository = &recipientRepository{}

type Recipients = []*rs.Recipient
type Repository interface {
	List(f *rs.ListRecipientsRequest) (*Recipients, error)
	Create(f *rs.Recipient) (*rs.Recipient, error)
}
type recipientRepository struct{}

func open() (*leveldb.DB, error) {
	var levelDBLocation string
	if levelDBLocation = os.Getenv("LEVELDB_LOCATION"); levelDBLocation == "" {
		levelDBLocation = "../../recipients.level"
	}
	db, err := leveldb.OpenFile(levelDBLocation, nil)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	return db, nil
}

func (rr *recipientRepository) List(f *rs.ListRecipientsRequest) (*Recipients, error) {
	db, err := open()
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	defer db.Close()

	recipients := &Recipients{}
	iter := db.NewIterator(nil, nil)

	for iter.Next() {
		_, value := iter.Key(), iter.Value()
		r := rs.Recipient{}
		err := json.Unmarshal(value, &r)
		if err != nil {
			log.Fatal(err)
		}

		*recipients = append(*recipients, &r)
	}

	iter.Release()
	if err := iter.Error(); err != nil {
		return nil, err
	}

	filterRecipients(recipients, f)
	filterItemsPerPage(recipients, f.ItemsPerPage)

	return recipients, nil
}

func (rr *recipientRepository) Create(r *rs.Recipient) (*rs.Recipient, error) {
	db, err := open()
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	defer db.Close()

	rBuf, err := protojson.Marshal(r)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	if err := db.Put([]byte(r.Id), rBuf, nil); err != nil {
		log.Fatal(err)
	}

	rBuf, err = db.Get([]byte(r.Id), nil)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	recipient := &rs.Recipient{}
	err = protojson.Unmarshal(rBuf, recipient)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	return recipient, nil
}

func filterRecipients(recipients *Recipients, f *rs.ListRecipientsRequest) {
	aux := Recipients{}
	for _, r := range *recipients {
		if strings.HasPrefix(r.Status, f.Status) &&
			strings.HasPrefix(strings.ToLower(r.Name), strings.ToLower(f.Name)) &&
			strings.HasPrefix(r.KeyType, f.KeyType) &&
			strings.HasPrefix(strings.ToLower(r.KeyValue), strings.ToLower(f.KeyValue)) {
			aux = append(aux, r)
		}
	}

	*recipients = aux
}
func filterItemsPerPage(array *Recipients, limit int32) {
	aux := Recipients{}
	for i := 0; i < len(*array) && i < int(limit); i++ {
		aux = append(aux, (*array)[i])
	}

	if len(aux) > 0 {
		*array = aux
	}
}
