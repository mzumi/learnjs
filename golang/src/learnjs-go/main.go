package main

import (
	"sort"
	"strconv"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

type LeanJSEvent struct {
	ProblemID int `json:"problemID"`
}

type LeanJSResponse struct {
	Result map[string]int `json:"map"`
}

func PopularAnswer(event LeanJSEvent) (LeanJSResponse, error) {
	problemID := strconv.Itoa(event.ProblemID)
	db := dynamodb.New(session.New(), aws.NewConfig().WithRegion("ap-northeast-1"))
	input := &dynamodb.ScanInput{
		FilterExpression: aws.String("problemId = :problemId"),
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":problemId": {
				N: &problemID,
			},
		},
		TableName: aws.String("answers"),
	}

	result, err := db.Scan(input)

	if err != nil {
		return LeanJSResponse{Result: nil}, err
	}

	return LeanJSResponse{Result: reduceItems(result.Items)}, nil
}

func reduceItems(items []map[string]*dynamodb.AttributeValue) map[string]int {
	memo := map[string]int{}
	for _, item := range items {
		a, ok := item["answer"]
		if !ok {
			continue
		}
		answer := *a.S
		_, o := memo[answer]
		if o {
			memo[answer] = memo[answer] + 1
		} else {
			memo[answer] = 1
		}
	}

	return memo
}

func filterItems(itemCounts map[string]int) map[string]int {
	values := values(itemCounts)
	sort.Sort(sort.Reverse(sort.IntSlice(values)))

	min := 0
	for i, v := range values[0:5] {
		if i == 0 {
			min = values[0]
		} else if v < min {
			min = v
		}
	}

	copy := make(map[string]int)
	for _, count := range values {
		for k, v := range itemCounts {
			if v < min {
				continue
			}

			if v == count {
				copy[k] = v
			}
		}
	}

	return copy
}

func values(m map[string]int) []int {
	vs := []int{}
	for _, v := range m {
		vs = append(vs, v)
	}
	return vs
}

func main() {
	lambda.Start(PopularAnswer)
}
