package main

import (
	"log"
	"net"
	"os"

	rs "github/lucaspere/Transfeera_API_Test/grpc_service/service"

	"github/lucaspere/Transfeera_API_Test/grpc_service/server/repositories"
	"github/lucaspere/Transfeera_API_Test/grpc_service/server/services/recipient"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

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

	rs.RegisterRecipientsServer(s, recipient.RecipientsService{Repository: repositories.RecipientRepository})
	reflection.Register(s)
	log.Println("gRPC server listening at " + address)
	log.Fatal(s.Serve(l))
}
