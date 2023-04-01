package repositories

import (
	"encoding/json"
	"fmt"
	rs "github/lucaspere/Transfeera_API_Test/grpc_service/service"
	"log"
	"os"
	"strings"

	"github.com/syndtr/goleveldb/leveldb"
)

type Recipients = []*rs.Recipient

func open() (*leveldb.DB, error) {
	var levelDBLocation string
	if levelDBLocation = os.Getenv("LEVELDB_LOCATION"); levelDBLocation == "" {
		levelDBLocation = "../../../recipients.level"
	}
	db, err := leveldb.OpenFile(levelDBLocation, nil)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	return db, nil
}

func ListRecipients(f *rs.ListRecipientsRequest) (*Recipients, error) {
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
