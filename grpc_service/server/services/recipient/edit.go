package recipient

import (
	"context"
	"errors"
	rs "github/lucaspere/Transfeera_API_Test/grpc_service/service"
	"log"

	"github.com/syndtr/goleveldb/leveldb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (service RecipientsService) EditRecipient(ctx context.Context, in *rs.EditRecipientequest) (*rs.Recipient, error) {
	var updateRecipient *rs.Recipient
	log.Println("request to find recipient with id ", in.Id)
	recipient, err := service.Repository.Find(in.Id)
	if err != nil {
		if errors.Is(err, leveldb.ErrNotFound) {
			log.Fatalf("not found recipient with id %s", in.Id)
		} else {
			log.Fatal(err)
		}
		return nil, status.Error(codes.NotFound, "recipient not found")
	}

	log.Println("found recipient ", recipient)

	updateRecipient = recipient
	if recipient.Status == "VALIDADO" {
		log.Println("recipient status is VALIDADO, assign only email.")
		if in.Recipient.Email != "" {
			updateRecipient.Email = in.Recipient.Email
		}
	} else {
		if in.Recipient.Account != "" {
			updateRecipient.Account = in.Recipient.Account
		}
		if in.Recipient.AccountType != "" {
			updateRecipient.AccountType = in.Recipient.AccountType
		}
		if in.Recipient.Email != "" {
			updateRecipient.Email = in.Recipient.Email
		}
		if in.Recipient.Agency != "" {
			updateRecipient.Agency = in.Recipient.Agency
		}
		if in.Recipient.CpfCnpj != "" {
			updateRecipient.CpfCnpj = in.Recipient.CpfCnpj
		}
		if in.Recipient.Name != "" {
			updateRecipient.Name = in.Recipient.Name
		}
		if in.Recipient.KeyValue != "" {
			updateRecipient.KeyValue = in.Recipient.KeyValue
		}
		if in.Recipient.KeyType != "" {
			updateRecipient.KeyType = in.Recipient.KeyType
		}
		if in.Recipient.Bank != "" {
			updateRecipient.Bank = in.Recipient.Bank
		}
	}

	log.Printf("request to update recipient with id %s and data %v", recipient.Id, recipient)
	data, err := service.Repository.Update(updateRecipient)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	return data, nil
}
