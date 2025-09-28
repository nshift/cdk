"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiStage = exports.createApiDeployment = exports.createApiRoute = exports.createAuthorizer = exports.createApiIntegration = exports.createApiGateway = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const environment_1 = require("./environment");
const naming_1 = require("./naming");
const createApiGateway = (name, stack, _allowHeaders) => new cdk.aws_apigatewayv2.CfnApi(stack, (0, naming_1.makeId)(name), {
    name: (0, naming_1.makeName)(name),
    protocolType: 'HTTP',
    corsConfiguration: {
        allowHeaders: ['*'],
        allowMethods: ['*'],
        allowOrigins: ['*'],
    },
});
exports.createApiGateway = createApiGateway;
const createApiIntegration = (name, props) => new cdk.aws_apigatewayv2.CfnIntegration(props.stack, (0, naming_1.makeId)(name), {
    apiId: cdk.Fn.ref(props.api.logicalId),
    integrationType: 'AWS_PROXY',
    integrationUri: `arn:aws:apigateway:${environment_1.Environment.region()}:lambda:path/2015-03-31/functions/${props.lambda.functionArn}/invocations`,
    integrationMethod: 'POST',
    payloadFormatVersion: '2.0',
});
exports.createApiIntegration = createApiIntegration;
const createAuthorizer = (name, props) => new cdk.aws_apigatewayv2.CfnAuthorizer(props.stack, (0, naming_1.makeId)(name), {
    name: (0, naming_1.makeName)(name),
    apiId: cdk.Fn.ref(props.api.logicalId),
    authorizerType: 'JWT',
    identitySource: ['$request.header.Authorization'],
    jwtConfiguration: {
        audience: [props.userPoolClient.userPoolClientId],
        issuer: props.userPool.userPoolProviderUrl,
    },
});
exports.createAuthorizer = createAuthorizer;
const createApiRoute = (name, props) => {
    var _a;
    return new cdk.aws_apigatewayv2.CfnRoute(props.stack, (0, naming_1.makeId)(name), {
        apiId: cdk.Fn.ref(props.api.logicalId),
        routeKey: props.routeKey,
        authorizationType: props.authorizer ? 'JWT' : 'NONE',
        authorizerId: (_a = props.authorizer) === null || _a === void 0 ? void 0 : _a.ref,
        target: `integrations/${cdk.Fn.ref(props.integration.logicalId)}`,
    });
};
exports.createApiRoute = createApiRoute;
const createApiDeployment = (name, stack, api) => new cdk.aws_apigatewayv2.CfnDeployment(stack, (0, naming_1.makeId)(name), {
    apiId: cdk.Fn.ref(api.logicalId),
});
exports.createApiDeployment = createApiDeployment;
const createApiStage = (name, props) => {
    const apiStage = new cdk.aws_apigatewayv2.CfnStage(props.stack, (0, naming_1.makeId)(name), {
        apiId: cdk.Fn.ref(props.api.logicalId),
        stageName: (0, naming_1.makeName)(name),
        autoDeploy: true,
        deploymentId: cdk.Fn.ref(props.apiDevelopment.logicalId),
        accessLogSettings: {
            destinationArn: props.logGroup.attrArn,
            format: '{ "requestId": "$context.requestId", "path": "$context.path", "routeKey": "$context.routeKey", "ip": "$context.identity.sourceIp", "requestTime": "$context.requestTime", "httpMethod": "$context.httpMethod","statusCode": $context.status }',
        },
    });
    apiStage.addDependency(props.apiDevelopment);
    apiStage.addDependency(props.logGroup);
    return apiStage;
};
exports.createApiStage = createApiStage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmdhdGV3YXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvYXBpLmdhdGV3YXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBa0M7QUFDbEMsK0NBQTJDO0FBQzNDLHFDQUEyQztBQUVwQyxNQUFNLGdCQUFnQixHQUFHLENBQUMsSUFBWSxFQUFFLEtBQWdCLEVBQUUsYUFBdUIsRUFBRSxFQUFFLENBQzFGLElBQUksR0FBRyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBQSxlQUFNLEVBQUMsSUFBSSxDQUFDLEVBQUU7SUFDbkQsSUFBSSxFQUFFLElBQUEsaUJBQVEsRUFBQyxJQUFJLENBQUM7SUFDcEIsWUFBWSxFQUFFLE1BQU07SUFDcEIsaUJBQWlCLEVBQUU7UUFDakIsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDO1FBQ25CLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQztRQUNuQixZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUM7S0FDcEI7Q0FDRixDQUFDLENBQUE7QUFUUyxRQUFBLGdCQUFnQixvQkFTekI7QUFFRyxNQUFNLG9CQUFvQixHQUFHLENBQ2xDLElBQVksRUFDWixLQUtDLEVBQ0QsRUFBRSxDQUNGLElBQUksR0FBRyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLElBQUksQ0FBQyxFQUFFO0lBQ2pFLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUN0QyxlQUFlLEVBQUUsV0FBVztJQUM1QixjQUFjLEVBQUUsc0JBQXNCLHlCQUFXLENBQUMsTUFBTSxFQUFFLHFDQUN4RCxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQ2YsY0FBYztJQUNkLGlCQUFpQixFQUFFLE1BQU07SUFDekIsb0JB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QyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDNUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDdEMsT0FBTyxRQUFRLENBQUE7QUFDakIsQ0FBQyxDQUFBO0FBdkJZLFFBQUEsY0FBYyxrQkF1QjFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJ1xuaW1wb3J0IHsgRW52aXJvbm1lbnQgfSBmcm9tICcuL2Vudmlyb25tZW50J1xuaW1wb3J0IHsgbWFrZUlkLCBtYWtlTmFtZSB9IGZyb20gJy4vbmFtaW5nJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQXBpR2F0ZXdheSA9IChuYW1lOiBzdHJpbmcsIHN0YWNrOiBjZGsuU3RhY2ssIF9hbGxvd0hlYWRlcnM6IHN0cmluZ1tdKSA9PlxuICBuZXcgY2RrLmF3c19hcGlnYXRld2F5djIuQ2ZuQXBpKHN0YWNrLCBtYWtlSWQobmFtZSksIHtcbiAgICBuYW1lOiBtYWtlTmFtZShuYW1lKSxcbiAgICBwcm90b2NvbFR5cGU6ICdIVFRQJyxcbiAgICBjb3JzQ29uZmlndXJhdGlvbjoge1xuICAgICAgYWxsb3dIZWFkZXJzOiBbJyonXSxcbiAgICAgIGFsbG93TWV0aG9kczogWycqJ10sXG4gICAgICBhbGxvd09yaWdpbnM6IFsnKiddLFxuICAgIH0sXG4gIH0pXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVBcGlJbnRlZ3JhdGlvbiA9IChcbiAgbmFtZTogc3RyaW5nLFxuICBwcm9wczoge1xuICAgIHN0YWNrOiBjZGsuU3RhY2tcbiAgICBpbnRlZ3JhdGlvbk1ldGhvZDogc3RyaW5nXG4gICAgYXBpOiBjZGsuYXdzX2FwaWdhdGV3YXl2Mi5DZm5BcGlcbiAgICBsYW1iZGE6IGNkay5hd3NfbGFtYmRhLkZ1bmN0aW9uXG4gIH1cbikgPT5cbiAgbmV3IGNkay5hd3NfYXBpZ2F0ZXdheXYyLkNmbkludGVncmF0aW9uKHByb3BzLnN0YWNrLCBtYWtlSWQobmFtZSksIHtcbiAgICBhcGlJZDogY2RrLkZuLnJlZihwcm9wcy5hcGkubG9naWNhbElkKSxcbiAgICBpbnRlZ3JhdGlvblR5cGU6ICdBV1NfUFJPWFknLFxuICAgIGludGVncmF0aW9uVXJpOiBgYXJuOmF3czphcGlnYXRld2F5OiR7RW52aXJvbm1lbnQucmVnaW9uKCl9OmxhbWJkYTpwYXRoLzIwMTUtMDMtMzEvZnVuY3Rpb25zLyR7XG4gICAgICBwcm9wcy5sYW1iZGEuZnVuY3Rpb25Bcm5cbiAgICB9L2ludm9jYXRpb25zYCxcbiAgICBpbnRlZ3JhdGlvbk1ldGhvZDogJ1BPU1QnLFxuICAgIHBheWxvYWRGb3JtYXRWZXJzaW9uOiAnMi4wJyxcbiAgfSlcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUF1dGhvcml6ZXIgPSAoXG4gIG5hbWU6IHN0cmluZyxcbiAgcHJvcHM6IHtcbiAgICBzdGFjazogY2RrLlN0YWNrXG4gICAgYXBpOiBjZGsuYXdzX2FwaWdhdGV3YXl2Mi5DZm5BcGlcbiAgICB1c2VyUG9vbDogY2RrLmF3c19jb2duaXRvLlVzZXJQb29sXG4gICAgdXNlclBvb2xDbGllbnQ6IGNkay5hd3NfY29nbml0by5Vc2VyUG9vbENsaWVudFxuICB9XG4pID0+XG4gIG5ldyBjZGsuYXdzX2FwaWdhdGV3YXl2Mi5DZm5BdXRob3JpemVyKHByb3BzLnN0YWNrLCBtYWtlSWQobmFtZSksIHtcbiAgICBuYW1lOiBtYWtlTmFtZShuYW1lKSxcbiAgICBhcGlJZDogY2RrLkZuLnJlZihwcm9wcy5hcGkubG9naWNhbElkKSxcbiAgICBhdXRob3JpemVyVHlwZTogJ0pXVCcsXG4gICAgaWRlbnRpdHlTb3VyY2U6IFsnJHJlcXVlc3QuaGVhZGVyLkF1dGhvcml6YXRpb24nXSxcbiAgICBqd3RDb25maWd1cmF0aW9uOiB7XG4gICAgICBhdWRpZW5jZTogW3Byb3BzLnVzZXJQb29sQ2xpZW50LnVzZXJQb29sQ2xpZW50SWRdLFxuICAgICAgaXNzdWVyOiBwcm9wcy51c2VyUG9vbC51c2VyUG9vbFByb3ZpZGVyVXJsLFxuICAgIH0sXG4gIH0pXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVBcGlSb3V0ZSA9IChcbiAgbmFtZTogc3RyaW5nLFxuICBwcm9wczoge1xuICAgIHN0YWNrOiBjZGsuU3RhY2tcbiAgICByb3V0ZUtleTogc3RyaW5nXG4gICAgYXBpOiBjZGsuYXdzX2FwaWdhdGV3YXl2Mi5DZm5BcGlcbiAgICBpbnRlZ3JhdGlvbjogY2RrLmF3c19hcGlnYXRld2F5djIuQ2ZuSW50ZWdyYXRpb25cbiAgICBhdXRob3JpemVyPzogY2RrLmF3c19hcGlnYXRld2F5djIuQ2ZuQXV0aG9yaXplclxuICB9XG4pID0+XG4gIG5ldyBjZGsuYXdzX2FwaWdhdGV3YXl2Mi5DZm5Sb3V0ZShwcm9wcy5zdGFjaywgbWFrZUlkKG5hbWUpLCB7XG4gICAgYXBpSWQ6IGNkay5Gbi5yZWYocHJvcHMuYXBpLmxvZ2ljYWxJZCksXG4gICAgcm91dGVLZXk6IHByb3BzLnJvdXRlS2V5LFxuICAgIGF1dGhvcml6YXRpb25UeXBlOiBwcm9wcy5hdXRob3JpemVyID8gJ0pXVCcgOiAnTk9ORScsXG4gICAgYXV0aG9yaXplcklkOiBwcm9wcy5hdXRob3JpemVyPy5yZWYsXG4gICAgdGFyZ2V0OiBgaW50ZWdyYXRpb25zLyR7Y2RrLkZuLnJlZihwcm9wcy5pbnRlZ3JhdGlvbi5sb2dpY2FsSWQpfWAsXG4gIH0pXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVBcGlEZXBsb3ltZW50ID0gKG5hbWU6IHN0cmluZywgc3RhY2s6IGNkay5TdGFjaywgYXBpOiBjZGsuYXdzX2FwaWdhdGV3YXl2Mi5DZm5BcGkpID0+XG4gIG5ldyBjZGsuYXdzX2FwaWdhdGV3YXl2Mi5DZm5EZXBsb3ltZW50KHN0YWNrLCBtYWtlSWQobmFtZSksIHtcbiAgICBhcGlJZDogY2RrLkZuLnJlZihhcGkubG9naWNhbElkKSxcbiAgfSlcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUFwaVN0YWdlID0gKFxuICBuYW1lOiBzdHJpbmcsXG4gIHByb3BzOiB7XG4gICAgc3RhY2s6IGNkay5TdGFja1xuICAgIGFwaTogY2RrLmF3c19hcGlnYXRld2F5djIuQ2ZuQXBpXG4gICAgYXBpRGV2ZWxvcG1lbnQ6IGNkay5hd3NfYXBpZ2F0ZXdheXYyLkNmbkRlcGxveW1lbnRcbiAgICBsb2dHcm91cDogY2RrLmF3c19sb2dzLkNmbkxvZ0dyb3VwXG4gIH1cbikgPT4ge1xuICBjb25zdCBhcGlTdGFnZSA9IG5ldyBjZGsuYXdzX2FwaWdhdGV3YXl2Mi5DZm5TdGFnZShwcm9wcy5zdGFjaywgbWFrZUlkKG5hbWUpLCB7XG4gICAgYXBpSWQ6IGNkay5Gbi5yZWYocHJvcHMuYXBpLmxvZ2ljYWxJZCksXG4gICAgc3RhZ2VOYW1lOiBtYWtlTmFtZShuYW1lKSxcbiAgICBhdXRvRGVwbG95OiB0cnVlLFxuICAgIGRlcGxveW1lbnRJZDogY2RrLkZuLnJlZihwcm9wcy5hcGlEZXZlbG9wbWVudC5sb2dpY2FsSWQpLFxuICAgIGFjY2Vzc0xvZ1NldHRpbmdzOiB7XG4gICAgICBkZXN0aW5hdGlvbkFybjogcHJvcHMubG9nR3JvdXAuYXR0ckFybixcbiAgICAgIGZvcm1hdDpcbiAgICAgICAgJ3sgXCJyZXF1ZXN0SWRcIjogXCIkY29udGV4dC5yZXF1ZXN0SWRcIiwgXCJwYXRoXCI6IFwiJGNvbnRleHQucGF0aFwiLCBcInJvdXRlS2V5XCI6IFwiJGNvbnRleHQucm91dGVLZXlcIiwgXCJpcFwiOiBcIiRjb250ZXh0LmlkZW50aXR5LnNvdXJjZUlwXCIsIFwicmVxdWVzdFRpbWVcIjogXCIkY29udGV4dC5yZXF1ZXN0VGltZVwiLCBcImh0dHBNZXRob2RcIjogXCIkY29udGV4dC5odHRwTWV0aG9kXCIsXCJzdGF0dXNDb2RlXCI6ICRjb250ZXh0LnN0YXR1cyB9JyxcbiAgICB9LFxuICB9KVxuICBhcGlTdGFnZS5hZGREZXBlbmRlbmN5KHByb3BzLmFwaURldmVsb3BtZW50KVxuICBhcGlTdGFnZS5hZGREZXBlbmRlbmN5KHByb3BzLmxvZ0dyb3VwKVxuICByZXR1cm4gYXBpU3RhZ2Vcbn1cbiJdfQ==