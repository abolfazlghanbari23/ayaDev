package main

import (
	"bufio"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"
)

type ResponseResult struct {
	Result string
}

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "*")
	(*w).Header().Set("Content-Type", "application/json")

}

func handleSum(w http.ResponseWriter, r *http.Request) {
	var data map[string]interface{}
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
	}
	if r.Method == "POST" {
		var firstNum, err = strconv.ParseInt(data["firstNum"].(string), 10, 64)
		var secondNum, err2 = strconv.ParseInt(data["secondNum"].(string), 10, 64)
		println(err)
		println(err2)
		var sum = firstNum + secondNum
		h := sha256.New()
		h.Write([]byte(string(sum)))
		sha1_hash := hex.EncodeToString(h.Sum(nil))

		fmt.Println(sha1_hash)
		r := ResponseResult{Result: sha1_hash}
		json.NewEncoder(w).Encode(r)
	}
}

func readLine(path string, lineNumber int) (response string) {
	inFile, err := os.Open(path)
	if err != nil {
		fmt.Println(err.Error() + `: ` + path)
		return
	}
	defer inFile.Close()

	scanner := bufio.NewScanner(inFile)
	index := 0
	var line string
	for scanner.Scan() {
		if lineNumber == index+1 {
			line = scanner.Text()
			return line
		}
		index = index + 1
	}
	return line
}

func handleFile(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		param1, err := strconv.Atoi(r.URL.Query().Get("lineNumber"))
		if err != nil {
			r := ResponseResult{Result: "invalid input :("}
			json.NewEncoder(w).Encode(r)
		} else {
			var line = readLine("file.in", param1)
			r := ResponseResult{Result: line}
			json.NewEncoder(w).Encode(r)
		}

	}
}

func main() {
	var root = "/"
	var apiLanguage = "go"
	http.Handle(root, http.FileServer(http.Dir("./../front")))
	http.HandleFunc(root+apiLanguage+"/sha256", handleSum)
	http.HandleFunc(root+apiLanguage+"/write", handleFile)

	if err := http.ListenAndServe(":8080", nil); err != nil {
		panic(err)
	}
}
