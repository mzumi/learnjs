package main

import (
	"testing"
)

func TestFilterItems(t *testing.T) {
	values := map[string]int{"a": 6, "b": 6, "c": 3, "d": 3, "e": 4, "f": 5}
	result := filterItems(values)

	t.Log(result["x"])
}

func TestValues(t *testing.T) {
	v := map[string]int{"a": 1, "b": 2, "c": 3}
	result := values(v)
	if len(result) != 3 {
		t.Failed()
	}
}
