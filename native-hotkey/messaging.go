package nativehotkey

import (
	"encoding/binary"
	"fmt"
	"os"
)

func receiveMessages() <-chan []byte {
	outputChan := make(chan []byte)

	go func() {
		var err error
		lengthBuf := make([]byte, 4)
		for {
			_, err = os.Stdin.Read(lengthBuf)
			if err != nil {
				fmt.Fprintln(os.Stderr, err)
				close(outputChan)
				return
			}

			dataLength, _ := binary.Uvarint(lengthBuf)
			dataBuf := make([]byte, dataLength)
			_, err = os.Stdin.Read(dataBuf)
			if err != nil {
				fmt.Fprintln(os.Stderr, err)
				close(outputChan)
				return
			}

			outputChan <- dataBuf
		}
	}()

	return outputChan
}

func sendMessage(message []byte) {
	lengthBuf := make([]byte, 4)
	binary.PutUvarint(lengthBuf, uint64(len(message)))
	os.Stdout.Write(lengthBuf)
	os.Stdout.Write(message)
	os.Stdout.Sync()
}
