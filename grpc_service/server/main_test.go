package main

import (
	"context"
	rs "github/lucaspere/Transfeera_API_Test/grpc_service/service"
	"log"
	"net"
	"testing"

	"google.golang.org/grpc"
	"google.golang.org/grpc/test/bufconn"
)

func startTestGrpcServer() (*grpc.Server, *bufconn.Listener) {
	l := bufconn.Listen(10)
	s := grpc.NewServer()
	rs.RegisterRecipientsServer(s, &recipientsService{})
	go func() {
		err := s.Serve(l)
		if err != nil {
			log.Fatal(err)
		}

	}()

	return s, l
}

func TestListRecipients(t *testing.T) {
	s, l := startTestGrpcServer()
	defer s.GracefulStop()

	client, err := grpc.DialContext(
		context.Background(), "",
		grpc.WithInsecure(),
		grpc.WithContextDialer(func(ctx context.Context, s string) (net.Conn, error) { return l.Dial() }),
	)
	if err != nil {
		t.Fatal(err)
	}

	recipientsClient := rs.NewRecipientsClient(client)

	list, err := recipientsClient.ListRecipients(context.Background(), &rs.ListRecipientsRequest{ItemsPerPage: 2})
	if err != nil {
		t.Fatal(err)
	}

	if list.Total != 2 {
		t.Fatalf("Expected to get back 2 recipients, got back: %d recipients", list.Total)
	}
	if len(list.Data) != 2 {
		t.Fatalf("Expected to get back 2 recipients, got back: %d recipients", len(list.Data))
	}
}
