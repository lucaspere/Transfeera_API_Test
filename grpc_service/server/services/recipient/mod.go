package recipient

import (
	"github/lucaspere/Transfeera_API_Test/grpc_service/server/repositories"
	rs "github/lucaspere/Transfeera_API_Test/grpc_service/service"
)

const DEFAULT_STATUS = "RASCUNHO"

type RecipientsService struct {
	rs.UnimplementedRecipientsServer
	Repository repositories.Repository
}
