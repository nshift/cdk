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
const naming_1 = require("./naming");
const createSQS = (name, props, fifo = false) => {
    const deadLetterQueue = new cdk.aws_sqs.Queue(props.stack, (0, naming_1.makeId)(`${name}DeadLetterQueue`), {
        queueName: (0, naming_1.makeName)(`${name}DeadLetterQueue`),
        retentionPeriod: cdk.Duration.days(7),
    });
    return new cdk.aws_sqs.Queue(props.stack, (0, naming_1.makeId)(`${name}Queue`), {
        queueName: (0, naming_1.makeName)(`${name}Queue`),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3FzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3Nxcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFrQztBQUNsQyxxQ0FBMkM7QUFFcEMsTUFBTSxTQUFTLEdBQUcsQ0FBQyxJQUFZLEVBQUUsS0FBMkIsRUFBRSxPQUFnQixLQUFLLEVBQUUsRUFBRTtJQUM1RixNQUFNLGVBQWUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBQSxlQUFNLEVBQUMsR0FBRyxJQUFJLGlCQUFpQixDQUFDLEVBQUU7UUFDM0YsU0FBUyxFQUFFLElBQUEsaUJBQVEsRUFBQyxHQUFHLElBQUksaUJBQWlCLENBQUM7UUFDN0MsZUFBZSxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUN0QyxDQUFDLENBQUE7SUFDRixPQUFPLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFBLGVBQU0sRUFBQyxHQUFHLElBQUksT0FBTyxDQUFDLEVBQUU7UUFDaEUsU0FBUyxFQUFFLElBQUEsaUJBQVEsRUFBQyxHQUFHLElBQUksT0FBTyxDQUFDO1FBQ25DLGlCQUFpQixFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUMzQyxJQUFJO1FBQ0osZUFBZSxFQUFFO1lBQ2YsZUFBZSxFQUFFLENBQUM7WUFDbEIsS0FBSyxFQUFFLGVBQWU7U0FDdkI7S0FDRixDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFkWSxRQUFBLFNBQVMsYUFjckI7QUFFTSxNQUFNLGVBQWUsR0FBRyxDQUFDLE1BQStCLEVBQUUsS0FBd0IsRUFBRSxFQUFFO0lBQzNGLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxHQUFHLENBQUMsd0JBQXdCLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDakcsQ0FBQyxDQUFBO0FBRlksUUFBQSxlQUFlLG1CQUUzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYidcbmltcG9ydCB7IG1ha2VJZCwgbWFrZU5hbWUgfSBmcm9tICcuL25hbWluZydcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVNRUyA9IChuYW1lOiBzdHJpbmcsIHByb3BzOiB7IHN0YWNrOiBjZGsuU3RhY2sgfSwgZmlmbzogYm9vbGVhbiA9IGZhbHNlKSA9PiB7XG4gIGNvbnN0IGRlYWRMZXR0ZXJRdWV1ZSA9IG5ldyBjZGsuYXdzX3Nxcy5RdWV1ZShwcm9wcy5zdGFjaywgbWFrZUlkKGAke25hbWV9RGVhZExldHRlclF1ZXVlYCksIHtcbiAgICBxdWV1ZU5hbWU6IG1ha2VOYW1lKGAke25hbWV9RGVhZExldHRlclF1ZXVlYCksXG4gICAgcmV0ZW50aW9uUGVyaW9kOiBjZGsuRHVyYXRpb24uZGF5cyg3KSxcbiAgfSlcbiAgcmV0dXJuIG5ldyBjZGsuYXdzX3Nxcy5RdWV1ZShwcm9wcy5zdGFjaywgbWFrZUlkKGAke25hbWV9UXVldWVgKSwge1xuICAgIHF1ZXVlTmFtZTogbWFrZU5hbWUoYCR7bmFtZX1RdWV1ZWApLFxuICAgIHZpc2liaWxpdHlUaW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcygzMCksXG4gICAgZmlmbyxcbiAgICBkZWFkTGV0dGVyUXVldWU6IHtcbiAgICAgIG1heFJlY2VpdmVDb3VudDogMSxcbiAgICAgIHF1ZXVlOiBkZWFkTGV0dGVyUXVldWUsXG4gICAgfSxcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGxpbmtMYW1iZGFUb1NRUyA9IChsYW1iZGE6IGNkay5hd3NfbGFtYmRhLkZ1bmN0aW9uLCBxdWV1ZTogY2RrLmF3c19zcXMuUXVldWUpID0+IHtcbiAgbGFtYmRhLmFkZEV2ZW50U291cmNlKG5ldyBjZGsuYXdzX2xhbWJkYV9ldmVudF9zb3VyY2VzLlNxc0V2ZW50U291cmNlKHF1ZXVlLCB7IGJhdGNoU2l6ZTogMSB9KSlcbn1cbiJdfQ==