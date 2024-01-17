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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmdhdGV3YXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvYXBpLmdhdGV3YXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBa0M7QUFDbEMsK0NBQTJDO0FBQzNDLHFDQUEyQztBQUVwQyxNQUFNLGdCQUFnQixHQUFHLENBQUMsSUFBWSxFQUFFLEtBQWdCLEVBQUUsYUFBdUIsRUFBRSxFQUFFLENBQzFGLElBQUksR0FBRyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBQSxlQUFNLEVBQUMsSUFBSSxDQUFDLEVBQUU7SUFDbkQsSUFBSSxFQUFFLElBQUEsaUJBQVEsRUFBQyxJQUFJLENBQUM7SUFDcEIsWUFBWSxFQUFFLE1BQU07SUFDcEIsaUJBQWlCLEVBQUU7UUFDakIsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDO1FBQ25CLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQztRQUNuQixZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUM7S0FDcEI7Q0FDRixDQUFDLENBQUE7QUFUUyxRQUFBLGdCQUFnQixvQkFTekI7QUFFRyxNQUFNLG9CQUFvQixHQUFHLENBQ2xDLElBQVksRUFDWixLQUtDLEVBQ0QsRUFBRSxDQUNGLElBQUksR0FBRyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLElBQUksQ0FBQyxFQUFFO0lBQ2pFLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUN0QyxlQUFlLEVBQUUsV0FBVztJQUM1QixjQUFjLEVBQUUsc0JBQXNCLHlCQUFXLENBQUMsTUFBTSxFQUFFLHFDQUN4RCxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQ2YsY0FBYztJQUNkLGlCQUFpQixFQUFFLE1BQU07SUFDekIsb0JBQW9CLEVBQUUsS0FBSztDQUM1QixDQUFDLENBQUE7QUFqQlMsUUFBQSxvQkFBb0Isd0JBaUI3QjtBQUVHLE1BQU0sY0FBYyxHQUFHLENBQzVCLElBQVksRUFDWixLQUtDLEVBQ0QsRUFBRSxDQUNGLElBQUksR0FBRyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLElBQUksQ0FBQyxFQUFFO0lBQzNELEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUN0QyxRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7SUFDeEIsaUJBQWlCLEVBQUUsTUFBTTtJQUN6QixNQUFNLEVBQUUsZ0JBQWdCLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEVBQUU7Q0FDbEUsQ0FBQyxDQUFBO0FBZFMsUUFBQSxjQUFjLGtCQWN2QjtBQUVHLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxJQUFZLEVBQUUsS0FBZ0IsRUFBRSxHQUFnQyxFQUFFLEVBQUUsQ0FDdEcsSUFBSSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFBLGVBQU0sRUFBQyxJQUFJLENBQUMsRUFBRTtJQUMxRCxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztDQUNqQyxDQUFDLENBQUE7QUFIUyxRQUFBLG1CQUFtQix1QkFHNUI7QUFFRyxNQUFNLGNBQWMsR0FBRyxDQUM1QixJQUFZLEVBQ1osS0FLQyxFQUNELEVBQUU7SUFDRixNQUFNLFFBQVEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFBLGVBQU0sRUFBQyxJQUFJLENBQUMsRUFBRTtRQUM1RSxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7UUFDdEMsU0FBUyxFQUFFLElBQUEsaUJBQVEsRUFBQyxJQUFJLENBQUM7UUFDekIsVUFBVSxFQUFFLElBQUk7UUFDaEIsWUFBWSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO1FBQ3hELGlCQUFpQixFQUFFO1lBQ2pCLGNBQWMsRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU87WUFDdEMsTUFBTSxFQUNKLCtPQUErTztTQUNsUDtLQUNGLENBQUMsQ0FBQTtJQUNGLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFBO0lBQzVDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3RDLE9BQU8sUUFBUSxDQUFBO0FBQ2pCLENBQUMsQ0FBQTtBQXZCWSxRQUFBLGNBQWMsa0JBdUIxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYidcbmltcG9ydCB7IEVudmlyb25tZW50IH0gZnJvbSAnLi9lbnZpcm9ubWVudCdcbmltcG9ydCB7IG1ha2VJZCwgbWFrZU5hbWUgfSBmcm9tICcuL25hbWluZydcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUFwaUdhdGV3YXkgPSAobmFtZTogc3RyaW5nLCBzdGFjazogY2RrLlN0YWNrLCBfYWxsb3dIZWFkZXJzOiBzdHJpbmdbXSkgPT5cbiAgbmV3IGNkay5hd3NfYXBpZ2F0ZXdheXYyLkNmbkFwaShzdGFjaywgbWFrZUlkKG5hbWUpLCB7XG4gICAgbmFtZTogbWFrZU5hbWUobmFtZSksXG4gICAgcHJvdG9jb2xUeXBlOiAnSFRUUCcsXG4gICAgY29yc0NvbmZpZ3VyYXRpb246IHtcbiAgICAgIGFsbG93SGVhZGVyczogWycqJ10sXG4gICAgICBhbGxvd01ldGhvZHM6IFsnKiddLFxuICAgICAgYWxsb3dPcmlnaW5zOiBbJyonXSxcbiAgICB9LFxuICB9KVxuXG5leHBvcnQgY29uc3QgY3JlYXRlQXBpSW50ZWdyYXRpb24gPSAoXG4gIG5hbWU6IHN0cmluZyxcbiAgcHJvcHM6IHtcbiAgICBzdGFjazogY2RrLlN0YWNrXG4gICAgaW50ZWdyYXRpb25NZXRob2Q6IHN0cmluZ1xuICAgIGFwaTogY2RrLmF3c19hcGlnYXRld2F5djIuQ2ZuQXBpXG4gICAgbGFtYmRhOiBjZGsuYXdzX2xhbWJkYS5GdW5jdGlvblxuICB9XG4pID0+XG4gIG5ldyBjZGsuYXdzX2FwaWdhdGV3YXl2Mi5DZm5JbnRlZ3JhdGlvbihwcm9wcy5zdGFjaywgbWFrZUlkKG5hbWUpLCB7XG4gICAgYXBpSWQ6IGNkay5Gbi5yZWYocHJvcHMuYXBpLmxvZ2ljYWxJZCksXG4gICAgaW50ZWdyYXRpb25UeXBlOiAnQVdTX1BST1hZJyxcbiAgICBpbnRlZ3JhdGlvblVyaTogYGFybjphd3M6YXBpZ2F0ZXdheToke0Vudmlyb25tZW50LnJlZ2lvbigpfTpsYW1iZGE6cGF0aC8yMDE1LTAzLTMxL2Z1bmN0aW9ucy8ke1xuICAgICAgcHJvcHMubGFtYmRhLmZ1bmN0aW9uQXJuXG4gICAgfS9pbnZvY2F0aW9uc2AsXG4gICAgaW50ZWdyYXRpb25NZXRob2Q6ICdQT1NUJyxcbiAgICBwYXlsb2FkRm9ybWF0VmVyc2lvbjogJzIuMCcsXG4gIH0pXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVBcGlSb3V0ZSA9IChcbiAgbmFtZTogc3RyaW5nLFxuICBwcm9wczoge1xuICAgIHN0YWNrOiBjZGsuU3RhY2tcbiAgICByb3V0ZUtleTogc3RyaW5nXG4gICAgYXBpOiBjZGsuYXdzX2FwaWdhdGV3YXl2Mi5DZm5BcGlcbiAgICBpbnRlZ3JhdGlvbjogY2RrLmF3c19hcGlnYXRld2F5djIuQ2ZuSW50ZWdyYXRpb25cbiAgfVxuKSA9PlxuICBuZXcgY2RrLmF3c19hcGlnYXRld2F5djIuQ2ZuUm91dGUocHJvcHMuc3RhY2ssIG1ha2VJZChuYW1lKSwge1xuICAgIGFwaUlkOiBjZGsuRm4ucmVmKHByb3BzLmFwaS5sb2dpY2FsSWQpLFxuICAgIHJvdXRlS2V5OiBwcm9wcy5yb3V0ZUtleSxcbiAgICBhdXRob3JpemF0aW9uVHlwZTogJ05PTkUnLFxuICAgIHRhcmdldDogYGludGVncmF0aW9ucy8ke2Nkay5Gbi5yZWYocHJvcHMuaW50ZWdyYXRpb24ubG9naWNhbElkKX1gLFxuICB9KVxuXG5leHBvcnQgY29uc3QgY3JlYXRlQXBpRGVwbG95bWVudCA9IChuYW1lOiBzdHJpbmcsIHN0YWNrOiBjZGsuU3RhY2ssIGFwaTogY2RrLmF3c19hcGlnYXRld2F5djIuQ2ZuQXBpKSA9PlxuICBuZXcgY2RrLmF3c19hcGlnYXRld2F5djIuQ2ZuRGVwbG95bWVudChzdGFjaywgbWFrZUlkKG5hbWUpLCB7XG4gICAgYXBpSWQ6IGNkay5Gbi5yZWYoYXBpLmxvZ2ljYWxJZCksXG4gIH0pXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVBcGlTdGFnZSA9IChcbiAgbmFtZTogc3RyaW5nLFxuICBwcm9wczoge1xuICAgIHN0YWNrOiBjZGsuU3RhY2tcbiAgICBhcGk6IGNkay5hd3NfYXBpZ2F0ZXdheXYyLkNmbkFwaVxuICAgIGFwaURldmVsb3BtZW50OiBjZGsuYXdzX2FwaWdhdGV3YXl2Mi5DZm5EZXBsb3ltZW50XG4gICAgbG9nR3JvdXA6IGNkay5hd3NfbG9ncy5DZm5Mb2dHcm91cFxuICB9XG4pID0+IHtcbiAgY29uc3QgYXBpU3RhZ2UgPSBuZXcgY2RrLmF3c19hcGlnYXRld2F5djIuQ2ZuU3RhZ2UocHJvcHMuc3RhY2ssIG1ha2VJZChuYW1lKSwge1xuICAgIGFwaUlkOiBjZGsuRm4ucmVmKHByb3BzLmFwaS5sb2dpY2FsSWQpLFxuICAgIHN0YWdlTmFtZTogbWFrZU5hbWUobmFtZSksXG4gICAgYXV0b0RlcGxveTogdHJ1ZSxcbiAgICBkZXBsb3ltZW50SWQ6IGNkay5Gbi5yZWYocHJvcHMuYXBpRGV2ZWxvcG1lbnQubG9naWNhbElkKSxcbiAgICBhY2Nlc3NMb2dTZXR0aW5nczoge1xuICAgICAgZGVzdGluYXRpb25Bcm46IHByb3BzLmxvZ0dyb3VwLmF0dHJBcm4sXG4gICAgICBmb3JtYXQ6XG4gICAgICAgICd7IFwicmVxdWVzdElkXCI6IFwiJGNvbnRleHQucmVxdWVzdElkXCIsIFwicGF0aFwiOiBcIiRjb250ZXh0LnBhdGhcIiwgXCJyb3V0ZUtleVwiOiBcIiRjb250ZXh0LnJvdXRlS2V5XCIsIFwiaXBcIjogXCIkY29udGV4dC5pZGVudGl0eS5zb3VyY2VJcFwiLCBcInJlcXVlc3RUaW1lXCI6IFwiJGNvbnRleHQucmVxdWVzdFRpbWVcIiwgXCJodHRwTWV0aG9kXCI6IFwiJGNvbnRleHQuaHR0cE1ldGhvZFwiLFwic3RhdHVzQ29kZVwiOiAkY29udGV4dC5zdGF0dXMgfScsXG4gICAgfSxcbiAgfSlcbiAgYXBpU3RhZ2UuYWRkRGVwZW5kZW5jeShwcm9wcy5hcGlEZXZlbG9wbWVudClcbiAgYXBpU3RhZ2UuYWRkRGVwZW5kZW5jeShwcm9wcy5sb2dHcm91cClcbiAgcmV0dXJuIGFwaVN0YWdlXG59XG4iXX0=