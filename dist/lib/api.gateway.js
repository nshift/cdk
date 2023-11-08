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
exports.createApiStage = exports.createApiDeployment = exports.createApiRoute = exports.createApiIntegration = exports.createApiGateway = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const environment_1 = require("./environment");
const naming_1 = require("./naming");
const createApiGateway = (name, stack) => new cdk.aws_apigatewayv2.CfnApi(stack, (0, naming_1.makeId)(name), {
    name: (0, naming_1.makeName)(name),
    protocolType: 'HTTP',
    corsConfiguration: {
        allowHeaders: ['Authorization'],
        allowMethods: ['GET', 'POST'],
        allowOrigins: ['*'],
    },
});
exports.createApiGateway = createApiGateway;
const createApiIntegration = (name, props) => new cdk.aws_apigatewayv2.CfnIntegration(props.stack, (0, naming_1.makeId)(name), {
    apiId: cdk.Fn.ref(props.api.logicalId),
    integrationType: 'AWS_PROXY',
    integrationUri: `arn:aws:apigateway:${environment_1.Environment.region()}:lambda:path/2015-03-31/functions/${props.lambda.functionArn}/invocations`,
    integrationMethod: props.integrationMethod,
    payloadFormatVersion: '2.0',
});
exports.createApiIntegration = createApiIntegration;
const createApiRoute = (name, props) => new cdk.aws_apigatewayv2.CfnRoute(props.stack, (0, naming_1.makeId)(name), {
    apiId: cdk.Fn.ref(props.api.logicalId),
    routeKey: props.routeKey,
    authorizationType: 'NONE',
    target: `integrations/${cdk.Fn.ref(props.integration.logicalId)}`,
});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmdhdGV3YXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvYXBpLmdhdGV3YXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBa0M7QUFDbEMsK0NBQTJDO0FBQzNDLHFDQUEyQztBQUVwQyxNQUFNLGdCQUFnQixHQUFHLENBQUMsSUFBWSxFQUFFLEtBQWdCLEVBQUUsRUFBRSxDQUNqRSxJQUFJLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLElBQUksQ0FBQyxFQUFFO0lBQ25ELElBQUksRUFBRSxJQUFBLGlCQUFRLEVBQUMsSUFBSSxDQUFDO0lBQ3BCLFlBQVksRUFBRSxNQUFNO0lBQ3BCLGlCQUFpQixFQUFFO1FBQ2pCLFlBQVksRUFBRSxDQUFDLGVBQWUsQ0FBQztRQUMvQixZQUFZLEVBQUUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO1FBQzdCLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQztLQUNwQjtDQUNGLENBQUMsQ0FBQTtBQVRTLFFBQUEsZ0JBQWdCLG9CQVN6QjtBQUVHLE1BQU0sb0JBQW9CLEdBQUcsQ0FDbEMsSUFBWSxFQUNaLEtBS0MsRUFDRCxFQUFFLENBQ0YsSUFBSSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBQSxlQUFNLEVBQUMsSUFBSSxDQUFDLEVBQUU7SUFDakUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBQ3RDLGVBQWUsRUFBRSxXQUFXO0lBQzVCLGNBQWMsRUFBRSxzQkFBc0IseUJBQVcsQ0FBQyxNQUFNLEVBQUUscUNBQ3hELEtBQUssQ0FBQyxNQUFNLENBQUMsV0FDZixjQUFjO0lBQ2QsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLGlCQUFpQjtJQUMxQyxvQkFBb0IsRUFBRSxLQUFLO0NBQzVCLENBQUMsQ0FBQTtBQWpCUyxRQUFBLG9CQUFvQix3QkFpQjdCO0FBRUcsTUFBTSxjQUFjLEdBQUcsQ0FDNUIsSUFBWSxFQUNaLEtBS0MsRUFDRCxFQUFFLENBQ0YsSUFBSSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBQSxlQUFNLEVBQUMsSUFBSSxDQUFDLEVBQUU7SUFDM0QsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBQ3RDLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtJQUN4QixpQkFBaUIsRUFBRSxNQUFNO0lBQ3pCLE1BQU0sRUFBRSxnQkFBZ0IsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsRUFBRTtDQUNsRSxDQUFDLENBQUE7QUFkUyxRQUFBLGNBQWMsa0JBY3ZCO0FBRUcsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLElBQVksRUFBRSxLQUFnQixFQUFFLEdBQWdDLEVBQUUsRUFBRSxDQUN0RyxJQUFJLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLElBQUksQ0FBQyxFQUFFO0lBQzFELEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO0NBQ2pDLENBQUMsQ0FBQTtBQUhTLFFBQUEsbUJBQW1CLHVCQUc1QjtBQUVHLE1BQU0sY0FBYyxHQUFHLENBQzVCLElBQVksRUFDWixLQUtDLEVBQ0QsRUFBRTtJQUNGLE1BQU0sUUFBUSxHQUFHLElBQUksR0FBRyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLElBQUksQ0FBQyxFQUFFO1FBQzVFLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztRQUN0QyxTQUFTLEVBQUUsSUFBQSxpQkFBUSxFQUFDLElBQUksQ0FBQztRQUN6QixVQUFVLEVBQUUsSUFBSTtRQUNoQixZQUFZLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7UUFDeEQsaUJBQWlCLEVBQUU7WUFDakIsY0FBYyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTztZQUN0QyxNQUFNLEVBQ0osK09BQStPO1NBQ2xQO0tBQ0YsQ0FBQyxDQUFBO0lBQ0YsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDNUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDdEMsT0FBTyxRQUFRLENBQUE7QUFDakIsQ0FBQyxDQUFBO0FBdkJZLFFBQUEsY0FBYyxrQkF1QjFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJ1xuaW1wb3J0IHsgRW52aXJvbm1lbnQgfSBmcm9tICcuL2Vudmlyb25tZW50J1xuaW1wb3J0IHsgbWFrZUlkLCBtYWtlTmFtZSB9IGZyb20gJy4vbmFtaW5nJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQXBpR2F0ZXdheSA9IChuYW1lOiBzdHJpbmcsIHN0YWNrOiBjZGsuU3RhY2spID0+XG4gIG5ldyBjZGsuYXdzX2FwaWdhdGV3YXl2Mi5DZm5BcGkoc3RhY2ssIG1ha2VJZChuYW1lKSwge1xuICAgIG5hbWU6IG1ha2VOYW1lKG5hbWUpLFxuICAgIHByb3RvY29sVHlwZTogJ0hUVFAnLFxuICAgIGNvcnNDb25maWd1cmF0aW9uOiB7XG4gICAgICBhbGxvd0hlYWRlcnM6IFsnQXV0aG9yaXphdGlvbiddLFxuICAgICAgYWxsb3dNZXRob2RzOiBbJ0dFVCcsICdQT1NUJ10sXG4gICAgICBhbGxvd09yaWdpbnM6IFsnKiddLFxuICAgIH0sXG4gIH0pXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVBcGlJbnRlZ3JhdGlvbiA9IChcbiAgbmFtZTogc3RyaW5nLFxuICBwcm9wczoge1xuICAgIHN0YWNrOiBjZGsuU3RhY2tcbiAgICBpbnRlZ3JhdGlvbk1ldGhvZDogc3RyaW5nXG4gICAgYXBpOiBjZGsuYXdzX2FwaWdhdGV3YXl2Mi5DZm5BcGlcbiAgICBsYW1iZGE6IGNkay5hd3NfbGFtYmRhLkZ1bmN0aW9uXG4gIH1cbikgPT5cbiAgbmV3IGNkay5hd3NfYXBpZ2F0ZXdheXYyLkNmbkludGVncmF0aW9uKHByb3BzLnN0YWNrLCBtYWtlSWQobmFtZSksIHtcbiAgICBhcGlJZDogY2RrLkZuLnJlZihwcm9wcy5hcGkubG9naWNhbElkKSxcbiAgICBpbnRlZ3JhdGlvblR5cGU6ICdBV1NfUFJPWFknLFxuICAgIGludGVncmF0aW9uVXJpOiBgYXJuOmF3czphcGlnYXRld2F5OiR7RW52aXJvbm1lbnQucmVnaW9uKCl9OmxhbWJkYTpwYXRoLzIwMTUtMDMtMzEvZnVuY3Rpb25zLyR7XG4gICAgICBwcm9wcy5sYW1iZGEuZnVuY3Rpb25Bcm5cbiAgICB9L2ludm9jYXRpb25zYCxcbiAgICBpbnRlZ3JhdGlvbk1ldGhvZDogcHJvcHMuaW50ZWdyYXRpb25NZXRob2QsXG4gICAgcGF5bG9hZEZvcm1hdFZlcnNpb246ICcyLjAnLFxuICB9KVxuXG5leHBvcnQgY29uc3QgY3JlYXRlQXBpUm91dGUgPSAoXG4gIG5hbWU6IHN0cmluZyxcbiAgcHJvcHM6IHtcbiAgICBzdGFjazogY2RrLlN0YWNrXG4gICAgcm91dGVLZXk6IHN0cmluZ1xuICAgIGFwaTogY2RrLmF3c19hcGlnYXRld2F5djIuQ2ZuQXBpXG4gICAgaW50ZWdyYXRpb246IGNkay5hd3NfYXBpZ2F0ZXdheXYyLkNmbkludGVncmF0aW9uXG4gIH1cbikgPT5cbiAgbmV3IGNkay5hd3NfYXBpZ2F0ZXdheXYyLkNmblJvdXRlKHByb3BzLnN0YWNrLCBtYWtlSWQobmFtZSksIHtcbiAgICBhcGlJZDogY2RrLkZuLnJlZihwcm9wcy5hcGkubG9naWNhbElkKSxcbiAgICByb3V0ZUtleTogcHJvcHMucm91dGVLZXksXG4gICAgYXV0aG9yaXphdGlvblR5cGU6ICdOT05FJyxcbiAgICB0YXJnZXQ6IGBpbnRlZ3JhdGlvbnMvJHtjZGsuRm4ucmVmKHByb3BzLmludGVncmF0aW9uLmxvZ2ljYWxJZCl9YCxcbiAgfSlcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUFwaURlcGxveW1lbnQgPSAobmFtZTogc3RyaW5nLCBzdGFjazogY2RrLlN0YWNrLCBhcGk6IGNkay5hd3NfYXBpZ2F0ZXdheXYyLkNmbkFwaSkgPT5cbiAgbmV3IGNkay5hd3NfYXBpZ2F0ZXdheXYyLkNmbkRlcGxveW1lbnQoc3RhY2ssIG1ha2VJZChuYW1lKSwge1xuICAgIGFwaUlkOiBjZGsuRm4ucmVmKGFwaS5sb2dpY2FsSWQpLFxuICB9KVxuXG5leHBvcnQgY29uc3QgY3JlYXRlQXBpU3RhZ2UgPSAoXG4gIG5hbWU6IHN0cmluZyxcbiAgcHJvcHM6IHtcbiAgICBzdGFjazogY2RrLlN0YWNrXG4gICAgYXBpOiBjZGsuYXdzX2FwaWdhdGV3YXl2Mi5DZm5BcGlcbiAgICBhcGlEZXZlbG9wbWVudDogY2RrLmF3c19hcGlnYXRld2F5djIuQ2ZuRGVwbG95bWVudFxuICAgIGxvZ0dyb3VwOiBjZGsuYXdzX2xvZ3MuQ2ZuTG9nR3JvdXBcbiAgfVxuKSA9PiB7XG4gIGNvbnN0IGFwaVN0YWdlID0gbmV3IGNkay5hd3NfYXBpZ2F0ZXdheXYyLkNmblN0YWdlKHByb3BzLnN0YWNrLCBtYWtlSWQobmFtZSksIHtcbiAgICBhcGlJZDogY2RrLkZuLnJlZihwcm9wcy5hcGkubG9naWNhbElkKSxcbiAgICBzdGFnZU5hbWU6IG1ha2VOYW1lKG5hbWUpLFxuICAgIGF1dG9EZXBsb3k6IHRydWUsXG4gICAgZGVwbG95bWVudElkOiBjZGsuRm4ucmVmKHByb3BzLmFwaURldmVsb3BtZW50LmxvZ2ljYWxJZCksXG4gICAgYWNjZXNzTG9nU2V0dGluZ3M6IHtcbiAgICAgIGRlc3RpbmF0aW9uQXJuOiBwcm9wcy5sb2dHcm91cC5hdHRyQXJuLFxuICAgICAgZm9ybWF0OlxuICAgICAgICAneyBcInJlcXVlc3RJZFwiOiBcIiRjb250ZXh0LnJlcXVlc3RJZFwiLCBcInBhdGhcIjogXCIkY29udGV4dC5wYXRoXCIsIFwicm91dGVLZXlcIjogXCIkY29udGV4dC5yb3V0ZUtleVwiLCBcImlwXCI6IFwiJGNvbnRleHQuaWRlbnRpdHkuc291cmNlSXBcIiwgXCJyZXF1ZXN0VGltZVwiOiBcIiRjb250ZXh0LnJlcXVlc3RUaW1lXCIsIFwiaHR0cE1ldGhvZFwiOiBcIiRjb250ZXh0Lmh0dHBNZXRob2RcIixcInN0YXR1c0NvZGVcIjogJGNvbnRleHQuc3RhdHVzIH0nLFxuICAgIH0sXG4gIH0pXG4gIGFwaVN0YWdlLmFkZERlcGVuZGVuY3kocHJvcHMuYXBpRGV2ZWxvcG1lbnQpXG4gIGFwaVN0YWdlLmFkZERlcGVuZGVuY3kocHJvcHMubG9nR3JvdXApXG4gIHJldHVybiBhcGlTdGFnZVxufVxuIl19