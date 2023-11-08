"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEndpoint = exports.deployApi = exports.createApi = void 0;
const api_gateway_1 = require("./api.gateway");
const lambda_1 = require("./lambda");
const log_1 = require("./log");
const createApi = (stack) => (0, api_gateway_1.createApiGateway)('Api', stack);
exports.createApi = createApi;
const deployApi = (stack, api, dependencies) => {
    const apiDevelopment = (0, api_gateway_1.createApiDeployment)('ApiDevelopment', stack, api);
    dependencies.forEach((dependency) => apiDevelopment.addDependency(dependency));
    const logGroup = (0, log_1.createLogGroup)('LogGroup', stack, api);
    const apiStage = (0, api_gateway_1.createApiStage)('ApiStageName', { stack, api, apiDevelopment, logGroup });
    return {
        apiDevelopment,
        logGroup,
        apiStage,
    };
};
exports.deployApi = deployApi;
const createEndpoint = (prefix, props) => {
    const lambda = (0, lambda_1.createLambda)(`${prefix}Function`, {
        path: props.codeUri,
        handler: props.handler,
        environment: props.environment,
        stack: props.stack,
        sharedLayer: props.sharedLayer,
    });
    const integration = (0, api_gateway_1.createApiIntegration)(`${prefix}Integration`, {
        integrationMethod: props.method,
        stack: props.stack,
        api: props.api,
        lambda: lambda,
    });
    const route = (0, api_gateway_1.createApiRoute)(`${prefix}Route`, {
        routeKey: `${props.method} ${props.path}`,
        stack: props.stack,
        api: props.api,
        integration: integration,
    });
    route.addDependency(integration);
    const lambdaPermission = (0, lambda_1.createLambdaPermission)(`${prefix}Permission`, props.stack, lambda);
    return { lambda, integration, route, lambdaPermission };
};
exports.createEndpoint = createEndpoint;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwrQ0FNc0I7QUFDdEIscUNBQStEO0FBQy9ELCtCQUFzQztBQUUvQixNQUFNLFNBQVMsR0FBRyxDQUFDLEtBQWdCLEVBQUUsRUFBRSxDQUFDLElBQUEsOEJBQWdCLEVBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFBO0FBQWhFLFFBQUEsU0FBUyxhQUF1RDtBQUV0RSxNQUFNLFNBQVMsR0FBRyxDQUFDLEtBQWdCLEVBQUUsR0FBZ0MsRUFBRSxZQUErQixFQUFFLEVBQUU7SUFDL0csTUFBTSxjQUFjLEdBQUcsSUFBQSxpQ0FBbUIsRUFBQyxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDeEUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFBO0lBQzlFLE1BQU0sUUFBUSxHQUFHLElBQUEsb0JBQWMsRUFBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ3ZELE1BQU0sUUFBUSxHQUFHLElBQUEsNEJBQWMsRUFBQyxjQUFjLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0lBQ3pGLE9BQU87UUFDTCxjQUFjO1FBQ2QsUUFBUTtRQUNSLFFBQVE7S0FDVCxDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBVlksUUFBQSxTQUFTLGFBVXJCO0FBRU0sTUFBTSxjQUFjLEdBQUcsQ0FDNUIsTUFBYyxFQUNkLEtBU0MsRUFDRCxFQUFFO0lBQ0YsTUFBTSxNQUFNLEdBQUcsSUFBQSxxQkFBWSxFQUFDLEdBQUcsTUFBTSxVQUFVLEVBQUU7UUFDL0MsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPO1FBQ25CLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztRQUN0QixXQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVc7UUFDOUIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO1FBQ2xCLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVztLQUMvQixDQUFDLENBQUE7SUFDRixNQUFNLFdBQVcsR0FBRyxJQUFBLGtDQUFvQixFQUFDLEdBQUcsTUFBTSxhQUFhLEVBQUU7UUFDL0QsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLE1BQU07UUFDL0IsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO1FBQ2xCLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRztRQUNkLE1BQU0sRUFBRSxNQUFNO0tBQ2YsQ0FBQyxDQUFBO0lBQ0YsTUFBTSxLQUFLLEdBQUcsSUFBQSw0QkFBYyxFQUFDLEdBQUcsTUFBTSxPQUFPLEVBQUU7UUFDN0MsUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFO1FBQ3pDLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztRQUNsQixHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7UUFDZCxXQUFXLEVBQUUsV0FBVztLQUN6QixDQUFDLENBQUE7SUFDRixLQUFLLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ2hDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBQSwrQkFBc0IsRUFBQyxHQUFHLE1BQU0sWUFBWSxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDM0YsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLENBQUE7QUFDekQsQ0FBQyxDQUFBO0FBbkNZLFFBQUEsY0FBYyxrQkFtQzFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJ1xuaW1wb3J0IHtcbiAgY3JlYXRlQXBpRGVwbG95bWVudCxcbiAgY3JlYXRlQXBpR2F0ZXdheSxcbiAgY3JlYXRlQXBpSW50ZWdyYXRpb24sXG4gIGNyZWF0ZUFwaVJvdXRlLFxuICBjcmVhdGVBcGlTdGFnZSxcbn0gZnJvbSAnLi9hcGkuZ2F0ZXdheSdcbmltcG9ydCB7IGNyZWF0ZUxhbWJkYSwgY3JlYXRlTGFtYmRhUGVybWlzc2lvbiB9IGZyb20gJy4vbGFtYmRhJ1xuaW1wb3J0IHsgY3JlYXRlTG9nR3JvdXAgfSBmcm9tICcuL2xvZydcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUFwaSA9IChzdGFjazogY2RrLlN0YWNrKSA9PiBjcmVhdGVBcGlHYXRld2F5KCdBcGknLCBzdGFjaylcblxuZXhwb3J0IGNvbnN0IGRlcGxveUFwaSA9IChzdGFjazogY2RrLlN0YWNrLCBhcGk6IGNkay5hd3NfYXBpZ2F0ZXdheXYyLkNmbkFwaSwgZGVwZW5kZW5jaWVzOiBjZGsuQ2ZuUmVzb3VyY2VbXSkgPT4ge1xuICBjb25zdCBhcGlEZXZlbG9wbWVudCA9IGNyZWF0ZUFwaURlcGxveW1lbnQoJ0FwaURldmVsb3BtZW50Jywgc3RhY2ssIGFwaSlcbiAgZGVwZW5kZW5jaWVzLmZvckVhY2goKGRlcGVuZGVuY3kpID0+IGFwaURldmVsb3BtZW50LmFkZERlcGVuZGVuY3koZGVwZW5kZW5jeSkpXG4gIGNvbnN0IGxvZ0dyb3VwID0gY3JlYXRlTG9nR3JvdXAoJ0xvZ0dyb3VwJywgc3RhY2ssIGFwaSlcbiAgY29uc3QgYXBpU3RhZ2UgPSBjcmVhdGVBcGlTdGFnZSgnQXBpU3RhZ2VOYW1lJywgeyBzdGFjaywgYXBpLCBhcGlEZXZlbG9wbWVudCwgbG9nR3JvdXAgfSlcbiAgcmV0dXJuIHtcbiAgICBhcGlEZXZlbG9wbWVudCxcbiAgICBsb2dHcm91cCxcbiAgICBhcGlTdGFnZSxcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlRW5kcG9pbnQgPSAoXG4gIHByZWZpeDogc3RyaW5nLFxuICBwcm9wczoge1xuICAgIGNvZGVVcmk6IHN0cmluZ1xuICAgIGhhbmRsZXI6IHN0cmluZ1xuICAgIG1ldGhvZDogc3RyaW5nXG4gICAgcGF0aDogc3RyaW5nXG4gICAgc3RhY2s6IGNkay5TdGFja1xuICAgIGFwaTogY2RrLmF3c19hcGlnYXRld2F5djIuQ2ZuQXBpXG4gICAgc2hhcmVkTGF5ZXI6IGNkay5hd3NfbGFtYmRhLkxheWVyVmVyc2lvblxuICAgIGVudmlyb25tZW50PzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfVxuICB9XG4pID0+IHtcbiAgY29uc3QgbGFtYmRhID0gY3JlYXRlTGFtYmRhKGAke3ByZWZpeH1GdW5jdGlvbmAsIHtcbiAgICBwYXRoOiBwcm9wcy5jb2RlVXJpLFxuICAgIGhhbmRsZXI6IHByb3BzLmhhbmRsZXIsXG4gICAgZW52aXJvbm1lbnQ6IHByb3BzLmVudmlyb25tZW50LFxuICAgIHN0YWNrOiBwcm9wcy5zdGFjayxcbiAgICBzaGFyZWRMYXllcjogcHJvcHMuc2hhcmVkTGF5ZXIsXG4gIH0pXG4gIGNvbnN0IGludGVncmF0aW9uID0gY3JlYXRlQXBpSW50ZWdyYXRpb24oYCR7cHJlZml4fUludGVncmF0aW9uYCwge1xuICAgIGludGVncmF0aW9uTWV0aG9kOiBwcm9wcy5tZXRob2QsXG4gICAgc3RhY2s6IHByb3BzLnN0YWNrLFxuICAgIGFwaTogcHJvcHMuYXBpLFxuICAgIGxhbWJkYTogbGFtYmRhLFxuICB9KVxuICBjb25zdCByb3V0ZSA9IGNyZWF0ZUFwaVJvdXRlKGAke3ByZWZpeH1Sb3V0ZWAsIHtcbiAgICByb3V0ZUtleTogYCR7cHJvcHMubWV0aG9kfSAke3Byb3BzLnBhdGh9YCxcbiAgICBzdGFjazogcHJvcHMuc3RhY2ssXG4gICAgYXBpOiBwcm9wcy5hcGksXG4gICAgaW50ZWdyYXRpb246IGludGVncmF0aW9uLFxuICB9KVxuICByb3V0ZS5hZGREZXBlbmRlbmN5KGludGVncmF0aW9uKVxuICBjb25zdCBsYW1iZGFQZXJtaXNzaW9uID0gY3JlYXRlTGFtYmRhUGVybWlzc2lvbihgJHtwcmVmaXh9UGVybWlzc2lvbmAsIHByb3BzLnN0YWNrLCBsYW1iZGEpXG4gIHJldHVybiB7IGxhbWJkYSwgaW50ZWdyYXRpb24sIHJvdXRlLCBsYW1iZGFQZXJtaXNzaW9uIH1cbn1cbiJdfQ==