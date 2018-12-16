resource "aws_dynamodb_table" "answers" {
  name           = "answers"
  read_capacity  = 5
  write_capacity = 5
  hash_key       = "userId"
  range_key      = "problemId"

  attribute {
    name = "userId"
    type = "S"
  }

  attribute {
    name = "problemId"
    type = "N"
  }
}
