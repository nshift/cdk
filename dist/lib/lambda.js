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
exports.createLambdaPermission = exports.createLambda = exports.createSharedLayer = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const naming_1 = require("./naming");
const createSharedLayer = (name, path, stack) => new cdk.aws_lambda.LayerVersion(stack, (0, naming_1.makeId)(name), {
    layerVersionName: (0, naming_1.makeName)(name),
    code: cdk.aws_lambda.Code.fromAsset(path),
    compatibleRuntimes: [cdk.aws_lambda.Runtime.NODEJS_18_X],
});
exports.createSharedLayer = createSharedLayer;
const createLambda = (name, props) => {
    var _a;
    return new cdk.aws_lambda.Function(props.stack, (0, naming_1.makeId)(name), {
        functionName: (0, naming_1.makeName)(name),
        code: cdk.aws_lambda.Code.fromAsset(props.path),
        handler: props.handler,
        runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
        timeout: cdk.Duration.seconds(30),
        memorySize: (_a = props.memorySize) !== null && _a !== void 0 ? _a : 2048,
        environment: props.environment,
        layers: [props.sharedLayer],
        logRetention: cdk.aws_logs.RetentionDays.THREE_MONTHS,
    });
};
exports.createLambda = createLambda;
const createLambdaPermission = (name, stack, lambda) => new cdk.aws_lambda.CfnPermission(stack, (0, naming_1.makeId)(name), {
    action: 'lambda:InvokeFunction',
    functionName: lambda.functionName,
    principal: 'apigateway.amazonaws.com',
});
exports.createLambdaPermission = createLambdaPermission;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFtYmRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2xhbWJkYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFrQztBQUNsQyxxQ0FBMkM7QUFFcEMsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLElBQVksRUFBRSxJQUFZLEVBQUUsS0FBZ0IsRUFBRSxFQUFFLENBQ2hGLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLElBQUksQ0FBQyxFQUFFO0lBQ25ELGdCQUFnQixFQUFFLElBQUEsaUJBQVEsRUFBQyxJQUFJLENBQUM7SUFDaEMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7SUFDekMsa0JBQWtCLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7Q0FDekQsQ0FBQyxDQUFBO0FBTFMsUUFBQSxpQkFBaUIscUJBSzFCO0FBRUcsTUFBTSxZQUFZLEdBQUcsQ0FDMUIsSUFBWSxFQUNaLEtBT0MsRUFDRCxFQUFFOztJQUNGLE9BQUEsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3JELFlBQVksRUFBRSxJQUFBLGlCQUFRLEVBQUMsSUFBSSxDQUFDO1FBQzVCLElBQUksRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUMvQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87UUFDdEIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVc7UUFDM0MsT0FBTyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNqQyxVQUFVLEVBQUUsTUFBQSxLQUFLLENBQUMsVUFBVSxtQ0FBSSxJQUFJO1FBQ3BDLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVztRQUM5QixNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO1FBQzNCLFlBQVksRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZO0tBQ3RELENBQUMsQ0FBQTtDQUFBLENBQUE7QUFyQlMsUUFBQSxZQUFZLGdCQXFCckI7QUFFRyxNQUFNLHNCQUFzQixHQUFHLENBQUMsSUFBWSxFQUFFLEtBQWdCLEVBQUUsTUFBK0IsRUFBRSxFQUFFLENBQ3hHLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLElBQUksQ0FBQyxFQUFFO0lBQ3BELE1BQU0sRUFBRSx1QkFBdUI7SUFDL0IsWUFBWSxFQUFFLE1BQU0sQ0FBQyxZQUFZO0lBQ2pDLFNBQVMsRUFBRSwwQkFBMEI7Q0FDdEMsQ0FBQyxDQUFBO0FBTFMsUUFBQSxzQkFBc0IsMEJBSy9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJ1xuaW1wb3J0IHsgbWFrZUlkLCBtYWtlTmFtZSB9IGZyb20gJy4vbmFtaW5nJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlU2hhcmVkTGF5ZXIgPSAobmFtZTogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIHN0YWNrOiBjZGsuU3RhY2spID0+XG4gIG5ldyBjZGsuYXdzX2xhbWJkYS5MYXllclZlcnNpb24oc3RhY2ssIG1ha2VJZChuYW1lKSwge1xuICAgIGxheWVyVmVyc2lvbk5hbWU6IG1ha2VOYW1lKG5hbWUpLFxuICAgIGNvZGU6IGNkay5hd3NfbGFtYmRhLkNvZGUuZnJvbUFzc2V0KHBhdGgpLFxuICAgIGNvbXBhdGlibGVSdW50aW1lczogW2Nkay5hd3NfbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE4X1hdLFxuICB9KVxuXG5leHBvcnQgY29uc3QgY3JlYXRlTGFtYmRhID0gKFxuICBuYW1lOiBzdHJpbmcsXG4gIHByb3BzOiB7XG4gICAgc3RhY2s6IGNkay5TdGFja1xuICAgIHNoYXJlZExheWVyOiBjZGsuYXdzX2xhbWJkYS5MYXllclZlcnNpb25cbiAgICBwYXRoOiBzdHJpbmdcbiAgICBoYW5kbGVyOiBzdHJpbmdcbiAgICBtZW1vcnlTaXplPzogbnVtYmVyXG4gICAgZW52aXJvbm1lbnQ/OiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9XG4gIH1cbikgPT5cbiAgbmV3IGNkay5hd3NfbGFtYmRhLkZ1bmN0aW9uKHByb3BzLnN0YWNrLCBtYWtlSWQobmFtZSksIHtcbiAgICBmdW5jdGlvbk5hbWU6IG1ha2VOYW1lKG5hbWUpLFxuICAgIGNvZGU6IGNkay5hd3NfbGFtYmRhLkNvZGUuZnJvbUFzc2V0KHByb3BzLnBhdGgpLFxuICAgIGhhbmRsZXI6IHByb3BzLmhhbmRsZXIsXG4gICAgcnVudGltZTogY2RrLmF3c19sYW1iZGEuUnVudGltZS5OT0RFSlNfMThfWCxcbiAgICB0aW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcygzMCksXG4gICAgbWVtb3J5U2l6ZTogcHJvcHMubWVtb3J5U2l6ZSA/PyAyMDQ4LFxuICAgIGVudmlyb25tZW50OiBwcm9wcy5lbnZpcm9ubWVudCxcbiAgICBsYXllcnM6IFtwcm9wcy5zaGFyZWRMYXllcl0sXG4gICAgbG9nUmV0ZW50aW9uOiBjZGsuYXdzX2xvZ3MuUmV0ZW50aW9uRGF5cy5USFJFRV9NT05USFMsXG4gIH0pXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVMYW1iZGFQZXJtaXNzaW9uID0gKG5hbWU6IHN0cmluZywgc3RhY2s6IGNkay5TdGFjaywgbGFtYmRhOiBjZGsuYXdzX2xhbWJkYS5GdW5jdGlvbikgPT5cbiAgbmV3IGNkay5hd3NfbGFtYmRhLkNmblBlcm1pc3Npb24oc3RhY2ssIG1ha2VJZChuYW1lKSwge1xuICAgIGFjdGlvbjogJ2xhbWJkYTpJbnZva2VGdW5jdGlvbicsXG4gICAgZnVuY3Rpb25OYW1lOiBsYW1iZGEuZnVuY3Rpb25OYW1lLFxuICAgIHByaW5jaXBhbDogJ2FwaWdhdGV3YXkuYW1hem9uYXdzLmNvbScsXG4gIH0pXG4iXX0=