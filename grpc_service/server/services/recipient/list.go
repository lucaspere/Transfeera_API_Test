package recipient

import (
	"context"
	rs "github/lucaspere/Transfeera_API_Test/grpc_service/service"
	"log"
)

func (service RecipientsService) ListRecipients(ctx context.Context, in *rs.ListRecipientsRequest) (*rs.ListRecipientsReply, error) {
	if in.ItemsPerPage == 0 {
		in.ItemsPerPage = 10
	}

	data, err := service.Repository.List(in)
	if err != nil {
		log.Fatal(err)
	}
	reply := rs.ListRecipientsReply{Total: int32(len(*data)), Data: *data}

	return &reply, nil
}
