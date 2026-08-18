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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1vZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvZHluYW1vZGIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQWtDO0FBQ2xDLHFDQUEyQztBQUVwQyxNQUFNLG1CQUFtQixHQUFHLENBQ2pDLElBQVksRUFDWixLQVNDLEVBQ0QsRUFBRTtJQUNGLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFBLGVBQU0sRUFBQyxJQUFJLENBQUMsRUFBRTtRQUNsRSxTQUFTLEVBQUUsSUFBQSxpQkFBUSxFQUFDLElBQUksQ0FBQztRQUN6QixZQUFZLEVBQUUsS0FBSyxDQUFDLFlBQVk7UUFDaEMsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO1FBQ3RCLFdBQVcsRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxlQUFlO1FBQ3pELGFBQWEsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU87S0FDekMsQ0FBQyxDQUFBO0lBQ0YsSUFBSSxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMzQixLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUU7WUFDaEQsS0FBSyxDQUFDLHVCQUF1QixDQUFDO2dCQUM1QixTQUFTLEVBQUUsY0FBYyxDQUFDLFNBQVM7Z0JBQ25DLFlBQVksRUFBRSxjQUFjLENBQUMsWUFBWTtnQkFDekMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxPQUFPO2dCQUMvQixjQUFjLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsR0FBRzthQUNwRCxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxPQUFPLEtBQUssQ0FBQTtBQUNkLENBQUMsQ0FBQTtBQS9CWSxRQUFBLG1CQUFtQix1QkErQi9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJ1xuaW1wb3J0IHsgbWFrZUlkLCBtYWtlTmFtZSB9IGZyb20gJy4vbmFtaW5nJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlRHluYW1vRGJUYWJsZSA9IChcbiAgbmFtZTogc3RyaW5nLFxuICBwcm9wczoge1xuICAgIHN0YWNrOiBjZGsuU3RhY2tcbiAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogc3RyaW5nOyB0eXBlOiBjZGsuYXdzX2R5bmFtb2RiLkF0dHJpYnV0ZVR5cGUgfVxuICAgIHNvcnRLZXk/OiB7IG5hbWU6IHN0cmluZzsgdHlwZTogY2RrLmF3c19keW5hbW9kYi5BdHRyaWJ1dGVUeXBlIH1cbiAgICBzZWNvbmRhcnlJbmRleGVzPzoge1xuICAgICAgaW5kZXhOYW1lOiBzdHJpbmdcbiAgICAgIHBhcnRpdGlvbktleTogeyBuYW1lOiBzdHJpbmc7IHR5cGU6IGNkay5hd3NfZHluYW1vZGIuQXR0cmlidXRlVHlwZSB9XG4gICAgICBzb3J0S2V5PzogeyBuYW1lOiBzdHJpbmc7IHR5cGU6IGNkay5hd3NfZHluYW1vZGIuQXR0cmlidXRlVHlwZSB9XG4gICAgfVtdXG4gIH1cbikgPT4ge1xuICBjb25zdCB0YWJsZSA9IG5ldyBjZGsuYXdzX2R5bmFtb2RiLlRhYmxlKHByb3BzLnN0YWNrLCBtYWtlSWQobmFtZSksIHtcbiAgICB0YWJsZU5hbWU6IG1ha2VOYW1lKG5hbWUpLFxuICAgIHBhcnRpdGlvbktleTogcHJvcHMucGFydGl0aW9uS2V5LFxuICAgIHNvcnRLZXk6IHByb3BzLnNvcnRLZXksXG4gICAgYmlsbGluZ01vZGU6IGNkay5hd3NfZHluYW1vZGIuQmlsbGluZ01vZGUuUEFZX1BFUl9SRVFVRVNULFxuICAgIHJlbW92YWxQb2xpY3k6IGNkay5SZW1vdmFsUG9saWN5LkRFU1RST1ksXG4gIH0pXG4gIGlmIChwcm9wcy5zZWNvbmRhcnlJbmRleGVzKSB7XG4gICAgcHJvcHMuc2Vjb25kYXJ5SW5kZXhlcy5mb3JFYWNoKChzZWNvbmRhcnlJbmRleCkgPT4ge1xuICAgICAgdGFibGUuYWRkR2xvYmFsU2Vjb25kYXJ5SW5kZXgoe1xuICAgICAgICBpbmRleE5hbWU6IHNlY29uZGFyeUluZGV4LmluZGV4TmFtZSxcbiAgICAgICAgcGFydGl0aW9uS2V5OiBzZWNvbmRhcnlJbmRleC5wYXJ0aXRpb25LZXksXG4gICAgICAgIHNvcnRLZXk6IHNlY29uZGFyeUluZGV4LnNvcnRLZXksXG4gICAgICAgIHByb2plY3Rpb25UeXBlOiBjZGsuYXdzX2R5bmFtb2RiLlByb2plY3Rpb25UeXBlLkFMTCxcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuICByZXR1cm4gdGFibGVcbn1cbiJdfQ==