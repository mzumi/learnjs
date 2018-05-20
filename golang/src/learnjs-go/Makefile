GOCMD=go
GOBUILD=$(GOCMD) build
GOCLEAN=$(GOCMD) clean
GOTEST=$(GOCMD) test
GOGET=$(GOCMD) get
BINARY_NAME=popularAnswer

clean:
	$(GOCLEAN)
	rm -f $(BINARY_NAME)
	rm -f $(BINARY_NAME).zip

build-linux:
	GOOS=linux GOARCH=amd64 go build -o $(BINARY_NAME)

release:
	zip $(BINARY_NAME).zip $(BINARY_NAME)
	mv $(BINARY_NAME).zip ../../../terraform/
