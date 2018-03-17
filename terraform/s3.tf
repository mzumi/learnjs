variable bucket {}

resource "aws_s3_bucket" "s3_bucket" {
  bucket = "${var.bucket}"
  acl    = "public-read"

  website {
    index_document = "index.html"
  }
}
