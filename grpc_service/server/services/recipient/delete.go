package recipient

import (
	"context"
	rs "github/lucaspere/Transfeera_API_Test/grpc_service/service"
	"log"

	"google.golang.org/protobuf/types/known/emptypb"
)

func (service RecipientsService) DeleteRecipient(ctx context.Context, in *rs.DeleteRecipientRequest) (*emptypb.Empty, error) {
	r, err := service.Repository.Delete(in.Id)
	if err != nil {
		return nil, err
	}
	log.Printf("Recipient with ID %s deleted", r.Id)

	return &emptypb.Empty{}, nil
}
