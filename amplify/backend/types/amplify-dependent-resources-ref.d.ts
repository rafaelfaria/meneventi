export type AmplifyDependentResourcesAttributes = {
    "function": {
        "MeneventiAuthCustomMessage": {
            "Name": "string",
            "Arn": "string",
            "LambdaExecutionRole": "string",
            "Region": "string"
        },
        "AdminQueries73809dec": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "auth": {
        "MeneventiAuth": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "api": {
        "AdminQueries": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "MeneventiAPI": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "storage": {
        "meneventiMedia": {
            "BucketName": "string",
            "Region": "string"
        }
    }
}