package main

import (
	"fmt"
	"net/http"
)

func handleSum(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		fmt.Fprintf(w, "{'Hello':23132}")
	}
}

func main() {
	var root = "/"
	var apiLanguage = "go"
	http.Handle(root, http.FileServer(http.Dir("./../front")))
	http.HandleFunc(root+apiLanguage, handleSum)

	if err := http.ListenAndServe(":8080", nil); err != nil {
		panic(err)
	}
}
