variable zone_name {}

data "aws_route53_zone" "selected" {
  name         = "${var.zone_name}"
  private_zone = false
}

resource "aws_route53_record" "learnjs" {
  zone_id = "${data.aws_route53_zone.selected.zone_id}"
  name    = "learnjs.${data.aws_route53_zone.selected.name}"
  type    = "CNAME"
  ttl     = "300"
  records = ["${var.bucket}.s3-website-ap-northeast-1.amazonaws.com"]
}
