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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLambdaPermission = exports.createLambda = exports.createSharedLayer = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const naming_1 = require("./naming");
const createSharedLayer = (name, path, stack) => new cdk.aws_lambda.LayerVersion(stack, (0, naming_1.makeId)(name), {
    layerVersionName: (0, naming_1.makeName)(name),
    code: cdk.aws_lambda.Code.fromAsset(path),
    compatibleRuntimes: [cdk.aws_lambda.Runtime.NODEJS_24_X],
});
exports.createSharedLayer = createSharedLayer;
const createLambda = (name, props) => {
    var _a, _b;
    return new cdk.aws_lambda.Function(props.stack, (0, naming_1.makeId)(name), {
        functionName: (0, naming_1.makeName)(name),
        code: cdk.aws_lambda.Code.fromAsset(props.path),
        handler: props.handler,
        runtime: (_a = props.runtime) !== null && _a !== void 0 ? _a : cdk.aws_lambda.Runtime.NODEJS_24_X,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFtYmRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2xhbWJkYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBa0M7QUFDbEMscUNBQTJDO0FBRXBDLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxJQUFZLEVBQUUsSUFBWSxFQUFFLEtBQWdCLEVBQUUsRUFBRSxDQUNoRixJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxJQUFBLGVBQU0sRUFBQyxJQUFJLENBQUMsRUFBRTtJQUNuRCxnQkFBZ0IsRUFBRSxJQUFBLGlCQUFRLEVBQUMsSUFBSSxDQUFDO0lBQ2hDLElBQUksRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO0lBQ3pDLGtCQUFrQixFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO0NBQ3pELENBQUMsQ0FBQTtBQUxTLFFBQUEsaUJBQWlCLHFCQUsxQjtBQUVHLE1BQU0sWUFBWSxHQUFHLENBQzFCLElBQVksRUFDWixLQVFDLEVBQ0QsRUFBRTs7SUFDRixPQUFBLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFBLGVBQU0sRUFBQyxJQUFJLENBQUMsRUFBRTtRQUNyRCxZQUFZLEVBQUUsSUFBQSxpQkFBUSxFQUFDLElBQUksQ0FBQztRQUM1QixJQUFJLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDL0MsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO1FBQ3RCLE9BQU8sRUFBRSxNQUFBLEtBQUssQ0FBQyxPQUFPLG1DQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVc7UUFDNUQsT0FBTyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNqQyxVQUFVLEVBQUUsTUFBQSxLQUFLLENBQUMsVUFBVSxtQ0FBSSxJQUFJO1FBQ3BDLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVztRQUM5QixNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO1FBQzNCLFlBQVksRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZO0tBQ3RELENBQUMsQ0FBQTtDQUFBLENBQUE7QUF0QlMsUUFBQSxZQUFZLGdCQXNCckI7QUFFRyxNQUFNLHNCQUFzQixHQUFHLENBQUMsSUFBWSxFQUFFLEtBQWdCLEVBQUUsTUFBK0IsRUFBRSxFQUFFLENBQ3hHLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLElBQUksQ0FBQyxFQUFFO0lBQ3BELE1BQU0sRUFBRSx1QkFBdUI7SUFDL0IsWUFBWSxFQUFFLE1BQU0sQ0FBQyxZQUFZO0lBQ2pDLFNBQVMsRUFBRSwwQkFBMEI7Q0FDdEMsQ0FBQyxDQUFBO0FBTFMsUUFBQSxzQkFBc0IsMEJBSy9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJ1xuaW1wb3J0IHsgbWFrZUlkLCBtYWtlTmFtZSB9IGZyb20gJy4vbmFtaW5nJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlU2hhcmVkTGF5ZXIgPSAobmFtZTogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIHN0YWNrOiBjZGsuU3RhY2spID0+XG4gIG5ldyBjZGsuYXdzX2xhbWJkYS5MYXllclZlcnNpb24oc3RhY2ssIG1ha2VJZChuYW1lKSwge1xuICAgIGxheWVyVmVyc2lvbk5hbWU6IG1ha2VOYW1lKG5hbWUpLFxuICAgIGNvZGU6IGNkay5hd3NfbGFtYmRhLkNvZGUuZnJvbUFzc2V0KHBhdGgpLFxuICAgIGNvbXBhdGlibGVSdW50aW1lczogW2Nkay5hd3NfbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzI0X1hdLFxuICB9KVxuXG5leHBvcnQgY29uc3QgY3JlYXRlTGFtYmRhID0gKFxuICBuYW1lOiBzdHJpbmcsXG4gIHByb3BzOiB7XG4gICAgc3RhY2s6IGNkay5TdGFja1xuICAgIHNoYXJlZExheWVyOiBjZGsuYXdzX2xhbWJkYS5MYXllclZlcnNpb25cbiAgICBwYXRoOiBzdHJpbmdcbiAgICBoYW5kbGVyOiBzdHJpbmdcbiAgICBydW50aW1lPzogY2RrLmF3c19sYW1iZGEuUnVudGltZVxuICAgIG1lbW9yeVNpemU/OiBudW1iZXJcbiAgICBlbnZpcm9ubWVudD86IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH1cbiAgfVxuKSA9PlxuICBuZXcgY2RrLmF3c19sYW1iZGEuRnVuY3Rpb24ocHJvcHMuc3RhY2ssIG1ha2VJZChuYW1lKSwge1xuICAgIGZ1bmN0aW9uTmFtZTogbWFrZU5hbWUobmFtZSksXG4gICAgY29kZTogY2RrLmF3c19sYW1iZGEuQ29kZS5mcm9tQXNzZXQocHJvcHMucGF0aCksXG4gICAgaGFuZGxlcjogcHJvcHMuaGFuZGxlcixcbiAgICBydW50aW1lOiBwcm9wcy5ydW50aW1lID8/IGNkay5hd3NfbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzI0X1gsXG4gICAgdGltZW91dDogY2RrLkR1cmF0aW9uLnNlY29uZHMoMzApLFxuICAgIG1lbW9yeVNpemU6IHByb3BzLm1lbW9yeVNpemUgPz8gMjA0OCxcbiAgICBlbnZpcm9ubWVudDogcHJvcHMuZW52aXJvbm1lbnQsXG4gICAgbGF5ZXJzOiBbcHJvcHMuc2hhcmVkTGF5ZXJdLFxuICAgIGxvZ1JldGVudGlvbjogY2RrLmF3c19sb2dzLlJldGVudGlvbkRheXMuVEhSRUVfTU9OVEhTLFxuICB9KVxuXG5leHBvcnQgY29uc3QgY3JlYXRlTGFtYmRhUGVybWlzc2lvbiA9IChuYW1lOiBzdHJpbmcsIHN0YWNrOiBjZGsuU3RhY2ssIGxhbWJkYTogY2RrLmF3c19sYW1iZGEuRnVuY3Rpb24pID0+XG4gIG5ldyBjZGsuYXdzX2xhbWJkYS5DZm5QZXJtaXNzaW9uKHN0YWNrLCBtYWtlSWQobmFtZSksIHtcbiAgICBhY3Rpb246ICdsYW1iZGE6SW52b2tlRnVuY3Rpb24nLFxuICAgIGZ1bmN0aW9uTmFtZTogbGFtYmRhLmZ1bmN0aW9uTmFtZSxcbiAgICBwcmluY2lwYWw6ICdhcGlnYXRld2F5LmFtYXpvbmF3cy5jb20nLFxuICB9KVxuIl19