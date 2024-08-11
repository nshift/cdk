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
exports.linkLambdaToSQS = exports.createSQS = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const createSQS = (name, props) => {
    const deadLetterQueue = new cdk.aws_sqs.Queue(props.stack, `${name}DeadLetterQueue`, {
        queueName: `${name}DeadLetterQueue`,
        retentionPeriod: cdk.Duration.days(7),
    });
    return new cdk.aws_sqs.Queue(props.stack, `${name}Queue`, {
        queueName: `${name}Queue`,
        visibilityTimeout: cdk.Duration.seconds(30),
        deadLetterQueue: {
            maxReceiveCount: 1,
            queue: deadLetterQueue,
        },
    });
};
exports.createSQS = createSQS;
const linkLambdaToSQS = (lambda, queue) => {
    lambda.addEventSource(new cdk.aws_lambda_event_sources.SqsEventSource(queue, { batchSize: 1 }));
};
exports.linkLambdaToSQS = linkLambdaToSQS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3FzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3Nxcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFrQztBQUUzQixNQUFNLFNBQVMsR0FBRyxDQUFDLElBQVksRUFBRSxLQUEyQixFQUFFLEVBQUU7SUFDckUsTUFBTSxlQUFlLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxpQkFBaUIsRUFBRTtRQUNuRixTQUFTLEVBQUUsR0FBRyxJQUFJLGlCQUFpQjtRQUNuQyxlQUFlLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQ3RDLENBQUMsQ0FBQTtJQUNGLE9BQU8sSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxPQUFPLEVBQUU7UUFDeEQsU0FBUyxFQUFFLEdBQUcsSUFBSSxPQUFPO1FBQ3pCLGlCQUFpQixFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUMzQyxlQUFlLEVBQUU7WUFDZixlQUFlLEVBQUUsQ0FBQztZQUNsQixLQUFLLEVBQUUsZUFBZTtTQUN2QjtLQUNGLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQWJZLFFBQUEsU0FBUyxhQWFyQjtBQUVNLE1BQU0sZUFBZSxHQUFHLENBQUMsTUFBK0IsRUFBRSxLQUF3QixFQUFFLEVBQUU7SUFDM0YsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNqRyxDQUFDLENBQUE7QUFGWSxRQUFBLGVBQWUsbUJBRTNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlU1FTID0gKG5hbWU6IHN0cmluZywgcHJvcHM6IHsgc3RhY2s6IGNkay5TdGFjayB9KSA9PiB7XG4gIGNvbnN0IGRlYWRMZXR0ZXJRdWV1ZSA9IG5ldyBjZGsuYXdzX3Nxcy5RdWV1ZShwcm9wcy5zdGFjaywgYCR7bmFtZX1EZWFkTGV0dGVyUXVldWVgLCB7XG4gICAgcXVldWVOYW1lOiBgJHtuYW1lfURlYWRMZXR0ZXJRdWV1ZWAsXG4gICAgcmV0ZW50aW9uUGVyaW9kOiBjZGsuRHVyYXRpb24uZGF5cyg3KSxcbiAgfSlcbiAgcmV0dXJuIG5ldyBjZGsuYXdzX3Nxcy5RdWV1ZShwcm9wcy5zdGFjaywgYCR7bmFtZX1RdWV1ZWAsIHtcbiAgICBxdWV1ZU5hbWU6IGAke25hbWV9UXVldWVgLFxuICAgIHZpc2liaWxpdHlUaW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcygzMCksXG4gICAgZGVhZExldHRlclF1ZXVlOiB7XG4gICAgICBtYXhSZWNlaXZlQ291bnQ6IDEsXG4gICAgICBxdWV1ZTogZGVhZExldHRlclF1ZXVlLFxuICAgIH0sXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBsaW5rTGFtYmRhVG9TUVMgPSAobGFtYmRhOiBjZGsuYXdzX2xhbWJkYS5GdW5jdGlvbiwgcXVldWU6IGNkay5hd3Nfc3FzLlF1ZXVlKSA9PiB7XG4gIGxhbWJkYS5hZGRFdmVudFNvdXJjZShuZXcgY2RrLmF3c19sYW1iZGFfZXZlbnRfc291cmNlcy5TcXNFdmVudFNvdXJjZShxdWV1ZSwgeyBiYXRjaFNpemU6IDEgfSkpXG59XG4iXX0=