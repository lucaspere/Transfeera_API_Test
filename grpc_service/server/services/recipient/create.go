package recipient

import (
	"context"
	"fmt"
	rs "github/lucaspere/Transfeera_API_Test/grpc_service/service"
	"log"
)

func (service RecipientsService) CreateRicipient(ctx context.Context, in *rs.CreateRecipientRequest) (*rs.Recipient, error) {
	fmt.Println(in)
	recipient := &rs.Recipient{
		Id:          in.Recipient.Id,
		CpfCnpj:     in.Recipient.CpfCnpj,
		Email:       in.Recipient.Email,
		Name:        in.Recipient.Name,
		Status:      DEFAULT_STATUS,
		KeyType:     in.Recipient.KeyType,
		KeyValue:    in.Recipient.KeyValue,
		AccountType: "POUPANÇA",
		Account:     "00000-1",
		Agency:      "111",
		Bank:        "SANTANDER",
	}
	log.Println("request to save a new recipient with ", recipient)
	data, err := service.Repository.Create(recipient)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	return data, nil
}
