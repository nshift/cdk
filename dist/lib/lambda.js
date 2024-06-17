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
    var _a, _b;
    return new cdk.aws_lambda.Function(props.stack, (0, naming_1.makeId)(name), {
        functionName: (0, naming_1.makeName)(name),
        code: cdk.aws_lambda.Code.fromAsset(props.path),
        handler: props.handler,
        runtime: (_a = props.runtime) !== null && _a !== void 0 ? _a : cdk.aws_lambda.Runtime.NODEJS_18_X,
        timeout: cdk.Duration.seconds(30),
        memorySize: (_b = props.memorySize) !== null && _b !== void 0 ? _b : 2048,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFtYmRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2xhbWJkYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFrQztBQUNsQyxxQ0FBMkM7QUFFcEMsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLElBQVksRUFBRSxJQUFZLEVBQUUsS0FBZ0IsRUFBRSxFQUFFLENBQ2hGLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLElBQUksQ0FBQyxFQUFFO0lBQ25ELGdCQUFnQixFQUFFLElBQUEsaUJBQVEsRUFBQyxJQUFJLENBQUM7SUFDaEMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7SUFDekMsa0JBQWtCLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7Q0FDekQsQ0FBQyxDQUFBO0FBTFMsUUFBQSxpQkFBaUIscUJBSzFCO0FBRUcsTUFBTSxZQUFZLEdBQUcsQ0FDMUIsSUFBWSxFQUNaLEtBUUMsRUFDRCxFQUFFOztJQUNGLE9BQUEsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3JELFlBQVksRUFBRSxJQUFBLGlCQUFRLEVBQUMsSUFBSSxDQUFDO1FBQzVCLElBQUksRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUMvQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87UUFDdEIsT0FBTyxFQUFFLE1BQUEsS0FBSyxDQUFDLE9BQU8sbUNBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsV0FBVztRQUM1RCxPQUFPLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQ2pDLFVBQVUsRUFBRSxNQUFBLEtBQUssQ0FBQyxVQUFVLG1DQUFJLElBQUk7UUFDcEMsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXO1FBQzlCLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7UUFDM0IsWUFBWSxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVk7S0FDdEQsQ0FBQyxDQUFBO0NBQUEsQ0FBQTtBQXRCUyxRQUFBLFlBQVksZ0JBc0JyQjtBQUVHLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxJQUFZLEVBQUUsS0FBZ0IsRUFBRSxNQUErQixFQUFFLEVBQUUsQ0FDeEcsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBQSxlQUFNLEVBQUMsSUFBSSxDQUFDLEVBQUU7SUFDcEQsTUFBTSxFQUFFLHVCQUF1QjtJQUMvQixZQUFZLEVBQUUsTUFBTSxDQUFDLFlBQVk7SUFDakMsU0FBUyxFQUFFLDBCQUEwQjtDQUN0QyxDQUFDLENBQUE7QUFMUyxRQUFBLHNCQUFzQiwwQkFLL0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInXG5pbXBvcnQgeyBtYWtlSWQsIG1ha2VOYW1lIH0gZnJvbSAnLi9uYW1pbmcnXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVTaGFyZWRMYXllciA9IChuYW1lOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgc3RhY2s6IGNkay5TdGFjaykgPT5cbiAgbmV3IGNkay5hd3NfbGFtYmRhLkxheWVyVmVyc2lvbihzdGFjaywgbWFrZUlkKG5hbWUpLCB7XG4gICAgbGF5ZXJWZXJzaW9uTmFtZTogbWFrZU5hbWUobmFtZSksXG4gICAgY29kZTogY2RrLmF3c19sYW1iZGEuQ29kZS5mcm9tQXNzZXQocGF0aCksXG4gICAgY29tcGF0aWJsZVJ1bnRpbWVzOiBbY2RrLmF3c19sYW1iZGEuUnVudGltZS5OT0RFSlNfMThfWF0sXG4gIH0pXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVMYW1iZGEgPSAoXG4gIG5hbWU6IHN0cmluZyxcbiAgcHJvcHM6IHtcbiAgICBzdGFjazogY2RrLlN0YWNrXG4gICAgc2hhcmVkTGF5ZXI6IGNkay5hd3NfbGFtYmRhLkxheWVyVmVyc2lvblxuICAgIHBhdGg6IHN0cmluZ1xuICAgIGhhbmRsZXI6IHN0cmluZ1xuICAgIHJ1bnRpbWU/OiBjZGsuYXdzX2xhbWJkYS5SdW50aW1lXG4gICAgbWVtb3J5U2l6ZT86IG51bWJlclxuICAgIGVudmlyb25tZW50PzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfVxuICB9XG4pID0+XG4gIG5ldyBjZGsuYXdzX2xhbWJkYS5GdW5jdGlvbihwcm9wcy5zdGFjaywgbWFrZUlkKG5hbWUpLCB7XG4gICAgZnVuY3Rpb25OYW1lOiBtYWtlTmFtZShuYW1lKSxcbiAgICBjb2RlOiBjZGsuYXdzX2xhbWJkYS5Db2RlLmZyb21Bc3NldChwcm9wcy5wYXRoKSxcbiAgICBoYW5kbGVyOiBwcm9wcy5oYW5kbGVyLFxuICAgIHJ1bnRpbWU6IHByb3BzLnJ1bnRpbWUgPz8gY2RrLmF3c19sYW1iZGEuUnVudGltZS5OT0RFSlNfMThfWCxcbiAgICB0aW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcygzMCksXG4gICAgbWVtb3J5U2l6ZTogcHJvcHMubWVtb3J5U2l6ZSA/PyAyMDQ4LFxuICAgIGVudmlyb25tZW50OiBwcm9wcy5lbnZpcm9ubWVudCxcbiAgICBsYXllcnM6IFtwcm9wcy5zaGFyZWRMYXllcl0sXG4gICAgbG9nUmV0ZW50aW9uOiBjZGsuYXdzX2xvZ3MuUmV0ZW50aW9uRGF5cy5USFJFRV9NT05USFMsXG4gIH0pXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVMYW1iZGFQZXJtaXNzaW9uID0gKG5hbWU6IHN0cmluZywgc3RhY2s6IGNkay5TdGFjaywgbGFtYmRhOiBjZGsuYXdzX2xhbWJkYS5GdW5jdGlvbikgPT5cbiAgbmV3IGNkay5hd3NfbGFtYmRhLkNmblBlcm1pc3Npb24oc3RhY2ssIG1ha2VJZChuYW1lKSwge1xuICAgIGFjdGlvbjogJ2xhbWJkYTpJbnZva2VGdW5jdGlvbicsXG4gICAgZnVuY3Rpb25OYW1lOiBsYW1iZGEuZnVuY3Rpb25OYW1lLFxuICAgIHByaW5jaXBhbDogJ2FwaWdhdGV3YXkuYW1hem9uYXdzLmNvbScsXG4gIH0pXG4iXX0=