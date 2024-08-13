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
const createSQS = (name, props) => {
    const deadLetterQueue = new cdk.aws_sqs.Queue(props.stack, (0, naming_1.makeId)(`${name}DeadLetterQueue`), {
        queueName: (0, naming_1.makeName)(`${name}DeadLetterQueue`),
        retentionPeriod: cdk.Duration.days(7),
    });
    return new cdk.aws_sqs.Queue(props.stack, (0, naming_1.makeId)(`${name}Queue`), {
        queueName: (0, naming_1.makeName)(`${name}Queue`),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3FzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3Nxcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFrQztBQUNsQyxxQ0FBMkM7QUFFcEMsTUFBTSxTQUFTLEdBQUcsQ0FBQyxJQUFZLEVBQUUsS0FBMkIsRUFBRSxFQUFFO0lBQ3JFLE1BQU0sZUFBZSxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFBLGVBQU0sRUFBQyxHQUFHLElBQUksaUJBQWlCLENBQUMsRUFBRTtRQUMzRixTQUFTLEVBQUUsSUFBQSxpQkFBUSxFQUFDLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQztRQUM3QyxlQUFlLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQ3RDLENBQUMsQ0FBQTtJQUNGLE9BQU8sSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsRUFBRTtRQUNoRSxTQUFTLEVBQUUsSUFBQSxpQkFBUSxFQUFDLEdBQUcsSUFBSSxPQUFPLENBQUM7UUFDbkMsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQzNDLGVBQWUsRUFBRTtZQUNmLGVBQWUsRUFBRSxDQUFDO1lBQ2xCLEtBQUssRUFBRSxlQUFlO1NBQ3ZCO0tBQ0YsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBYlksUUFBQSxTQUFTLGFBYXJCO0FBRU0sTUFBTSxlQUFlLEdBQUcsQ0FBQyxNQUErQixFQUFFLEtBQXdCLEVBQUUsRUFBRTtJQUMzRixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksR0FBRyxDQUFDLHdCQUF3QixDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQ2pHLENBQUMsQ0FBQTtBQUZZLFFBQUEsZUFBZSxtQkFFM0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInXG5pbXBvcnQgeyBtYWtlSWQsIG1ha2VOYW1lIH0gZnJvbSAnLi9uYW1pbmcnXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVTUVMgPSAobmFtZTogc3RyaW5nLCBwcm9wczogeyBzdGFjazogY2RrLlN0YWNrIH0pID0+IHtcbiAgY29uc3QgZGVhZExldHRlclF1ZXVlID0gbmV3IGNkay5hd3Nfc3FzLlF1ZXVlKHByb3BzLnN0YWNrLCBtYWtlSWQoYCR7bmFtZX1EZWFkTGV0dGVyUXVldWVgKSwge1xuICAgIHF1ZXVlTmFtZTogbWFrZU5hbWUoYCR7bmFtZX1EZWFkTGV0dGVyUXVldWVgKSxcbiAgICByZXRlbnRpb25QZXJpb2Q6IGNkay5EdXJhdGlvbi5kYXlzKDcpLFxuICB9KVxuICByZXR1cm4gbmV3IGNkay5hd3Nfc3FzLlF1ZXVlKHByb3BzLnN0YWNrLCBtYWtlSWQoYCR7bmFtZX1RdWV1ZWApLCB7XG4gICAgcXVldWVOYW1lOiBtYWtlTmFtZShgJHtuYW1lfVF1ZXVlYCksXG4gICAgdmlzaWJpbGl0eVRpbWVvdXQ6IGNkay5EdXJhdGlvbi5zZWNvbmRzKDMwKSxcbiAgICBkZWFkTGV0dGVyUXVldWU6IHtcbiAgICAgIG1heFJlY2VpdmVDb3VudDogMSxcbiAgICAgIHF1ZXVlOiBkZWFkTGV0dGVyUXVldWUsXG4gICAgfSxcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGxpbmtMYW1iZGFUb1NRUyA9IChsYW1iZGE6IGNkay5hd3NfbGFtYmRhLkZ1bmN0aW9uLCBxdWV1ZTogY2RrLmF3c19zcXMuUXVldWUpID0+IHtcbiAgbGFtYmRhLmFkZEV2ZW50U291cmNlKG5ldyBjZGsuYXdzX2xhbWJkYV9ldmVudF9zb3VyY2VzLlNxc0V2ZW50U291cmNlKHF1ZXVlLCB7IGJhdGNoU2l6ZTogMSB9KSlcbn1cbiJdfQ==