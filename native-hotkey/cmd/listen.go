package main

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"
)

func main() {
	signalChannel := make(chan os.Signal, 2)
	signal.Notify(signalChannel, os.Interrupt, syscall.SIGTERM)
	go func() {
		sig := <-signalChannel
		if sig == syscall.SIGTERM {
			fmt.Fprintln(os.Stderr, "Received SIGTERM, exiting gracefully")
			os.Exit(0)
		}
	}()
}
