data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    effect = "Allow"

    principals {
      type        = "Federated"
      identifiers = ["cognito-identity.amazonaws.com"]
    }

    actions = [
      "sts:AssumeRoleWithWebIdentity",
    ]

    condition {
      test     = "StringEquals"
      variable = "cognito-identity.amazonaws.com:aud"

      values = [
        "${aws_cognito_identity_pool.main.id}",
      ]
    }

    condition {
      test     = "ForAnyValue:StringLike"
      variable = "cognito-identity.amazonaws.com:amr"

      values = [
        "authenticated",
      ]
    }
  }
}

resource "aws_iam_role" "authenticated" {
  name = "cognito_authenticated"

  assume_role_policy = "${data.aws_iam_policy_document.assume_role_policy.json}"
}

data "aws_iam_policy_document" "dynamodb_role_policy" {
  statement {
    effect = "Allow"

    actions = [
      "dynamodb:BatchGetItem",
      "dynamodb:BatchWriteItem",
      "dynamodb:DeleteItem",
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:Query",
      "dynamodb:UpdateItem",
    ]

    resources = [
      "${aws_dynamodb_table.answers.arn}",
    ]

    condition {
      test     = "ForAllValues:StringEquals"
      variable = "dynamodb:LeadingKeys"

      values = [
        "$${cognito-identity.amazonaws.com:sub}",
      ]
    }
  }
}

resource "aws_iam_policy" "table_access" {
  name = "learnjs_table_access"

  policy = "${data.aws_iam_policy_document.dynamodb_role_policy.json}"
}

resource "aws_iam_policy_attachment" "table_access_attach" {
  name       = "dynamodb-attachment"
  roles      = ["${aws_iam_role.authenticated.name}"]
  policy_arn = "${aws_iam_policy.table_access.arn}"
}
