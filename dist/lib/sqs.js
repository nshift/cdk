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
exports.linkLambdaToSQS = exports.createSQS = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const naming_1 = require("./naming");
const createSQS = (name, props, fifo = false) => {
    const deadLetterQueue = new cdk.aws_sqs.Queue(props.stack, (0, naming_1.makeId)(`${name}DeadLetterQueue`), {
        queueName: `${(0, naming_1.makeQueueName)(`${name}DeadLetterQueue`)}${fifo ? '.fifo' : ''}`,
        fifo,
        retentionPeriod: cdk.Duration.days(7),
    });
    return new cdk.aws_sqs.Queue(props.stack, (0, naming_1.makeId)(`${name}Queue`), {
        queueName: `${(0, naming_1.makeQueueName)(`${name}Queue`)}${fifo ? '.fifo' : ''}`,
        visibilityTimeout: cdk.Duration.seconds(30),
        fifo,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3FzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3Nxcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBa0M7QUFDbEMscUNBQWdEO0FBRXpDLE1BQU0sU0FBUyxHQUFHLENBQUMsSUFBWSxFQUFFLEtBQTJCLEVBQUUsT0FBZ0IsS0FBSyxFQUFFLEVBQUU7SUFDNUYsTUFBTSxlQUFlLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxFQUFFO1FBQzNGLFNBQVMsRUFBRSxHQUFHLElBQUEsc0JBQWEsRUFBQyxHQUFHLElBQUksaUJBQWlCLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQzdFLElBQUk7UUFDSixlQUFlLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQ3RDLENBQUMsQ0FBQTtJQUNGLE9BQU8sSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsRUFBRTtRQUNoRSxTQUFTLEVBQUUsR0FBRyxJQUFBLHNCQUFhLEVBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDbkUsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQzNDLElBQUk7UUFDSixlQUFlLEVBQUU7WUFDZixlQUFlLEVBQUUsQ0FBQztZQUNsQixLQUFLLEVBQUUsZUFBZTtTQUN2QjtLQUNGLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQWZZLFFBQUEsU0FBUyxhQWVyQjtBQUVNLE1BQU0sZUFBZSxHQUFHLENBQUMsTUFBK0IsRUFBRSxLQUF3QixFQUFFLEVBQUU7SUFDM0YsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNqRyxDQUFDLENBQUE7QUFGWSxRQUFBLGVBQWUsbUJBRTNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJ1xuaW1wb3J0IHsgbWFrZUlkLCBtYWtlUXVldWVOYW1lIH0gZnJvbSAnLi9uYW1pbmcnXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVTUVMgPSAobmFtZTogc3RyaW5nLCBwcm9wczogeyBzdGFjazogY2RrLlN0YWNrIH0sIGZpZm86IGJvb2xlYW4gPSBmYWxzZSkgPT4ge1xuICBjb25zdCBkZWFkTGV0dGVyUXVldWUgPSBuZXcgY2RrLmF3c19zcXMuUXVldWUocHJvcHMuc3RhY2ssIG1ha2VJZChgJHtuYW1lfURlYWRMZXR0ZXJRdWV1ZWApLCB7XG4gICAgcXVldWVOYW1lOiBgJHttYWtlUXVldWVOYW1lKGAke25hbWV9RGVhZExldHRlclF1ZXVlYCl9JHtmaWZvID8gJy5maWZvJyA6ICcnfWAsXG4gICAgZmlmbyxcbiAgICByZXRlbnRpb25QZXJpb2Q6IGNkay5EdXJhdGlvbi5kYXlzKDcpLFxuICB9KVxuICByZXR1cm4gbmV3IGNkay5hd3Nfc3FzLlF1ZXVlKHByb3BzLnN0YWNrLCBtYWtlSWQoYCR7bmFtZX1RdWV1ZWApLCB7XG4gICAgcXVldWVOYW1lOiBgJHttYWtlUXVldWVOYW1lKGAke25hbWV9UXVldWVgKX0ke2ZpZm8gPyAnLmZpZm8nIDogJyd9YCxcbiAgICB2aXNpYmlsaXR5VGltZW91dDogY2RrLkR1cmF0aW9uLnNlY29uZHMoMzApLFxuICAgIGZpZm8sXG4gICAgZGVhZExldHRlclF1ZXVlOiB7XG4gICAgICBtYXhSZWNlaXZlQ291bnQ6IDEsXG4gICAgICBxdWV1ZTogZGVhZExldHRlclF1ZXVlLFxuICAgIH0sXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBsaW5rTGFtYmRhVG9TUVMgPSAobGFtYmRhOiBjZGsuYXdzX2xhbWJkYS5GdW5jdGlvbiwgcXVldWU6IGNkay5hd3Nfc3FzLlF1ZXVlKSA9PiB7XG4gIGxhbWJkYS5hZGRFdmVudFNvdXJjZShuZXcgY2RrLmF3c19sYW1iZGFfZXZlbnRfc291cmNlcy5TcXNFdmVudFNvdXJjZShxdWV1ZSwgeyBiYXRjaFNpemU6IDEgfSkpXG59XG4iXX0=