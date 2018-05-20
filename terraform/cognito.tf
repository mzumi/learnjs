variable "google_client_id" {}

resource "aws_cognito_identity_pool" "main" {
  identity_pool_name               = "learnjs"
  allow_unauthenticated_identities = false

  supported_login_providers {
    "accounts.google.com" = "${var.google_client_id}"
  }
}

resource "aws_cognito_identity_pool_roles_attachment" "main" {
  identity_pool_id = "${aws_cognito_identity_pool.main.id}"

  roles {
    "authenticated" = "${aws_iam_role.authenticated.arn}"
  }
}
