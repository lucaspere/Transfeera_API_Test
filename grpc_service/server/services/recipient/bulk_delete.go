package recipient

import (
	"context"
	rs "github/lucaspere/Transfeera_API_Test/grpc_service/service"
	"log"
)

func (service RecipientsService) BulkDeleteRecipients(ctx context.Context, in *rs.BulkDeleteRecipientsRequest) (*rs.BulkDeleteResponse, error) {
	reply, err := service.Repository.BulkDelete(in)
	if err != nil {
		return nil, err
	}
	log.Printf("total of recipients deleted %d", reply.Total)

	return reply, nil
}
