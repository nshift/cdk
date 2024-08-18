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
exports.createBucket = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const environment_1 = require("./environment");
const naming_1 = require("./naming");
const createBucket = (name, stack, isPublic = false) => new cdk.aws_s3.Bucket(stack, (0, naming_1.makeId)(name), {
    bucketName: (0, naming_1.makeName)(name, environment_1.Environment.region()),
    removalPolicy: cdk.RemovalPolicy.DESTROY,
    ...(isPublic
        ? {
            blockPublicAccess: {
                blockPublicPolicy: false,
                blockPublicAcls: false,
                ignorePublicAcls: false,
                restrictPublicBuckets: false,
            },
            publicReadAccess: true,
        }
        : {}),
});
exports.createBucket = createBucket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVja2V0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9idWNrZXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQWtDO0FBQ2xDLCtDQUEyQztBQUMzQyxxQ0FBMkM7QUFFcEMsTUFBTSxZQUFZLEdBQUcsQ0FBQyxJQUFZLEVBQUUsS0FBZ0IsRUFBRSxXQUFvQixLQUFLLEVBQUUsRUFBRSxDQUN4RixJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFBLGVBQU0sRUFBQyxJQUFJLENBQUMsRUFBRTtJQUN6QyxVQUFVLEVBQUUsSUFBQSxpQkFBUSxFQUFDLElBQUksRUFBRSx5QkFBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hELGFBQWEsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU87SUFDeEMsR0FBRyxDQUFDLFFBQVE7UUFDVixDQUFDLENBQUM7WUFDRSxpQkFBaUIsRUFBRTtnQkFDakIsaUJBQWlCLEVBQUUsS0FBSztnQkFDeEIsZUFBZSxFQUFFLEtBQUs7Z0JBQ3RCLGdCQUFnQixFQUFFLEtBQUs7Z0JBQ3ZCLHFCQUFxQixFQUFFLEtBQUs7YUFDN0I7WUFDRCxnQkFBZ0IsRUFBRSxJQUFJO1NBQ3ZCO1FBQ0gsQ0FBQyxDQUFDLEVBQUUsQ0FBQztDQUNSLENBQUMsQ0FBQTtBQWZTLFFBQUEsWUFBWSxnQkFlckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInXG5pbXBvcnQgeyBFbnZpcm9ubWVudCB9IGZyb20gJy4vZW52aXJvbm1lbnQnXG5pbXBvcnQgeyBtYWtlSWQsIG1ha2VOYW1lIH0gZnJvbSAnLi9uYW1pbmcnXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVCdWNrZXQgPSAobmFtZTogc3RyaW5nLCBzdGFjazogY2RrLlN0YWNrLCBpc1B1YmxpYzogYm9vbGVhbiA9IGZhbHNlKSA9PlxuICBuZXcgY2RrLmF3c19zMy5CdWNrZXQoc3RhY2ssIG1ha2VJZChuYW1lKSwge1xuICAgIGJ1Y2tldE5hbWU6IG1ha2VOYW1lKG5hbWUsIEVudmlyb25tZW50LnJlZ2lvbigpKSxcbiAgICByZW1vdmFsUG9saWN5OiBjZGsuUmVtb3ZhbFBvbGljeS5ERVNUUk9ZLFxuICAgIC4uLihpc1B1YmxpY1xuICAgICAgPyB7XG4gICAgICAgICAgYmxvY2tQdWJsaWNBY2Nlc3M6IHtcbiAgICAgICAgICAgIGJsb2NrUHVibGljUG9saWN5OiBmYWxzZSxcbiAgICAgICAgICAgIGJsb2NrUHVibGljQWNsczogZmFsc2UsXG4gICAgICAgICAgICBpZ25vcmVQdWJsaWNBY2xzOiBmYWxzZSxcbiAgICAgICAgICAgIHJlc3RyaWN0UHVibGljQnVja2V0czogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBwdWJsaWNSZWFkQWNjZXNzOiB0cnVlLFxuICAgICAgICB9XG4gICAgICA6IHt9KSxcbiAgfSlcbiJdfQ==