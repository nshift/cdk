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
                sortKey: secondaryIndex.sortKey,
                projectionType: cdk.aws_dynamodb.ProjectionType.ALL,
            });
        });
    }
    return table;
};
exports.createDynamoDbTable = createDynamoDbTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1vZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvZHluYW1vZGIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBa0M7QUFDbEMscUNBQTJDO0FBRXBDLE1BQU0sbUJBQW1CLEdBQUcsQ0FDakMsSUFBWSxFQUNaLEtBU0MsRUFDRCxFQUFFO0lBQ0YsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLElBQUksQ0FBQyxFQUFFO1FBQ2xFLFNBQVMsRUFBRSxJQUFBLGlCQUFRLEVBQUMsSUFBSSxDQUFDO1FBQ3pCLFlBQVksRUFBRSxLQUFLLENBQUMsWUFBWTtRQUNoQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87UUFDdEIsV0FBVyxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLGVBQWU7UUFDekQsYUFBYSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTztLQUN6QyxDQUFDLENBQUE7SUFDRixJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRTtRQUMxQixLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUU7WUFDaEQsS0FBSyxDQUFDLHVCQUF1QixDQUFDO2dCQUM1QixTQUFTLEVBQUUsY0FBYyxDQUFDLFNBQVM7Z0JBQ25DLFlBQVksRUFBRSxjQUFjLENBQUMsWUFBWTtnQkFDekMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxPQUFPO2dCQUMvQixjQUFjLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsR0FBRzthQUNwRCxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtLQUNIO0lBQ0QsT0FBTyxLQUFLLENBQUE7QUFDZCxDQUFDLENBQUE7QUEvQlksUUFBQSxtQkFBbUIsdUJBK0IvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYidcbmltcG9ydCB7IG1ha2VJZCwgbWFrZU5hbWUgfSBmcm9tICcuL25hbWluZydcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUR5bmFtb0RiVGFibGUgPSAoXG4gIG5hbWU6IHN0cmluZyxcbiAgcHJvcHM6IHtcbiAgICBzdGFjazogY2RrLlN0YWNrXG4gICAgcGFydGl0aW9uS2V5OiB7IG5hbWU6IHN0cmluZzsgdHlwZTogY2RrLmF3c19keW5hbW9kYi5BdHRyaWJ1dGVUeXBlIH1cbiAgICBzb3J0S2V5PzogeyBuYW1lOiBzdHJpbmc7IHR5cGU6IGNkay5hd3NfZHluYW1vZGIuQXR0cmlidXRlVHlwZSB9XG4gICAgc2Vjb25kYXJ5SW5kZXhlcz86IHtcbiAgICAgIGluZGV4TmFtZTogc3RyaW5nXG4gICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogc3RyaW5nOyB0eXBlOiBjZGsuYXdzX2R5bmFtb2RiLkF0dHJpYnV0ZVR5cGUgfVxuICAgICAgc29ydEtleT86IHsgbmFtZTogc3RyaW5nOyB0eXBlOiBjZGsuYXdzX2R5bmFtb2RiLkF0dHJpYnV0ZVR5cGUgfVxuICAgIH1bXVxuICB9XG4pID0+IHtcbiAgY29uc3QgdGFibGUgPSBuZXcgY2RrLmF3c19keW5hbW9kYi5UYWJsZShwcm9wcy5zdGFjaywgbWFrZUlkKG5hbWUpLCB7XG4gICAgdGFibGVOYW1lOiBtYWtlTmFtZShuYW1lKSxcbiAgICBwYXJ0aXRpb25LZXk6IHByb3BzLnBhcnRpdGlvbktleSxcbiAgICBzb3J0S2V5OiBwcm9wcy5zb3J0S2V5LFxuICAgIGJpbGxpbmdNb2RlOiBjZGsuYXdzX2R5bmFtb2RiLkJpbGxpbmdNb2RlLlBBWV9QRVJfUkVRVUVTVCxcbiAgICByZW1vdmFsUG9saWN5OiBjZGsuUmVtb3ZhbFBvbGljeS5ERVNUUk9ZLFxuICB9KVxuICBpZiAocHJvcHMuc2Vjb25kYXJ5SW5kZXhlcykge1xuICAgIHByb3BzLnNlY29uZGFyeUluZGV4ZXMuZm9yRWFjaCgoc2Vjb25kYXJ5SW5kZXgpID0+IHtcbiAgICAgIHRhYmxlLmFkZEdsb2JhbFNlY29uZGFyeUluZGV4KHtcbiAgICAgICAgaW5kZXhOYW1lOiBzZWNvbmRhcnlJbmRleC5pbmRleE5hbWUsXG4gICAgICAgIHBhcnRpdGlvbktleTogc2Vjb25kYXJ5SW5kZXgucGFydGl0aW9uS2V5LFxuICAgICAgICBzb3J0S2V5OiBzZWNvbmRhcnlJbmRleC5zb3J0S2V5LFxuICAgICAgICBwcm9qZWN0aW9uVHlwZTogY2RrLmF3c19keW5hbW9kYi5Qcm9qZWN0aW9uVHlwZS5BTEwsXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbiAgcmV0dXJuIHRhYmxlXG59XG4iXX0=