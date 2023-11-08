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
exports.createDynamoDbTable = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const naming_1 = require("./naming");
const createDynamoDbTable = (name, props) => {
    const table = new cdk.aws_dynamodb.Table(props.stack, (0, naming_1.makeId)(name), {
        tableName: (0, naming_1.makeName)(name),
        partitionKey: props.partitionKey,
        sortKey: props.sortKey,
        billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    if (props.secondaryIndexes) {
        props.secondaryIndexes.forEach((secondaryIndex) => {
            table.addGlobalSecondaryIndex({
                indexName: secondaryIndex.indexName,
                partitionKey: secondaryIndex.partitionKey,
                projectionType: cdk.aws_dynamodb.ProjectionType.ALL,
            });
        });
    }
    return table;
};
exports.createDynamoDbTable = createDynamoDbTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1vZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvZHluYW1vZGIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBa0M7QUFDbEMscUNBQTJDO0FBRXBDLE1BQU0sbUJBQW1CLEdBQUcsQ0FDakMsSUFBWSxFQUNaLEtBUUMsRUFDRCxFQUFFO0lBQ0YsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLElBQUksQ0FBQyxFQUFFO1FBQ2xFLFNBQVMsRUFBRSxJQUFBLGlCQUFRLEVBQUMsSUFBSSxDQUFDO1FBQ3pCLFlBQVksRUFBRSxLQUFLLENBQUMsWUFBWTtRQUNoQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87UUFDdEIsV0FBVyxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLGVBQWU7UUFDekQsYUFBYSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTztLQUN6QyxDQUFDLENBQUE7SUFDRixJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRTtRQUMxQixLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUU7WUFDaEQsS0FBSyxDQUFDLHVCQUF1QixDQUFDO2dCQUM1QixTQUFTLEVBQUUsY0FBYyxDQUFDLFNBQVM7Z0JBQ25DLFlBQVksRUFBRSxjQUFjLENBQUMsWUFBWTtnQkFDekMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEdBQUc7YUFDcEQsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7S0FFSDtJQUNELE9BQU8sS0FBSyxDQUFBO0FBQ2QsQ0FBQyxDQUFBO0FBOUJZLFFBQUEsbUJBQW1CLHVCQThCL0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInXG5pbXBvcnQgeyBtYWtlSWQsIG1ha2VOYW1lIH0gZnJvbSAnLi9uYW1pbmcnXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVEeW5hbW9EYlRhYmxlID0gKFxuICBuYW1lOiBzdHJpbmcsXG4gIHByb3BzOiB7XG4gICAgc3RhY2s6IGNkay5TdGFja1xuICAgIHBhcnRpdGlvbktleTogeyBuYW1lOiBzdHJpbmc7IHR5cGU6IGNkay5hd3NfZHluYW1vZGIuQXR0cmlidXRlVHlwZSB9XG4gICAgc29ydEtleT86IHsgbmFtZTogc3RyaW5nOyB0eXBlOiBjZGsuYXdzX2R5bmFtb2RiLkF0dHJpYnV0ZVR5cGUgfVxuICAgIHNlY29uZGFyeUluZGV4ZXM/OiB7XG4gICAgICBpbmRleE5hbWU6IHN0cmluZ1xuICAgICAgcGFydGl0aW9uS2V5OiB7IG5hbWU6IHN0cmluZzsgdHlwZTogY2RrLmF3c19keW5hbW9kYi5BdHRyaWJ1dGVUeXBlIH1cbiAgICB9W11cbiAgfVxuKSA9PiB7XG4gIGNvbnN0IHRhYmxlID0gbmV3IGNkay5hd3NfZHluYW1vZGIuVGFibGUocHJvcHMuc3RhY2ssIG1ha2VJZChuYW1lKSwge1xuICAgIHRhYmxlTmFtZTogbWFrZU5hbWUobmFtZSksXG4gICAgcGFydGl0aW9uS2V5OiBwcm9wcy5wYXJ0aXRpb25LZXksXG4gICAgc29ydEtleTogcHJvcHMuc29ydEtleSxcbiAgICBiaWxsaW5nTW9kZTogY2RrLmF3c19keW5hbW9kYi5CaWxsaW5nTW9kZS5QQVlfUEVSX1JFUVVFU1QsXG4gICAgcmVtb3ZhbFBvbGljeTogY2RrLlJlbW92YWxQb2xpY3kuREVTVFJPWSxcbiAgfSlcbiAgaWYgKHByb3BzLnNlY29uZGFyeUluZGV4ZXMpIHtcbiAgICBwcm9wcy5zZWNvbmRhcnlJbmRleGVzLmZvckVhY2goKHNlY29uZGFyeUluZGV4KSA9PiB7XG4gICAgICB0YWJsZS5hZGRHbG9iYWxTZWNvbmRhcnlJbmRleCh7XG4gICAgICAgIGluZGV4TmFtZTogc2Vjb25kYXJ5SW5kZXguaW5kZXhOYW1lLFxuICAgICAgICBwYXJ0aXRpb25LZXk6IHNlY29uZGFyeUluZGV4LnBhcnRpdGlvbktleSxcbiAgICAgICAgcHJvamVjdGlvblR5cGU6IGNkay5hd3NfZHluYW1vZGIuUHJvamVjdGlvblR5cGUuQUxMLFxuICAgICAgfSlcbiAgICB9KVxuICAgIFxuICB9XG4gIHJldHVybiB0YWJsZVxufVxuIl19