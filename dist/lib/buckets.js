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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVja2V0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9idWNrZXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFrQztBQUNsQywrQ0FBMkM7QUFDM0MscUNBQTJDO0FBRXBDLE1BQU0sWUFBWSxHQUFHLENBQUMsSUFBWSxFQUFFLEtBQWdCLEVBQUUsV0FBb0IsS0FBSyxFQUFFLEVBQUUsQ0FDeEYsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBQSxlQUFNLEVBQUMsSUFBSSxDQUFDLEVBQUU7SUFDekMsVUFBVSxFQUFFLElBQUEsaUJBQVEsRUFBQyxJQUFJLEVBQUUseUJBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoRCxhQUFhLEVBQUUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPO0lBQ3hDLEdBQUcsQ0FBQyxRQUFRO1FBQ1YsQ0FBQyxDQUFDO1lBQ0UsaUJBQWlCLEVBQUU7Z0JBQ2pCLGlCQUFpQixFQUFFLEtBQUs7Z0JBQ3hCLGVBQWUsRUFBRSxLQUFLO2dCQUN0QixnQkFBZ0IsRUFBRSxLQUFLO2dCQUN2QixxQkFBcUIsRUFBRSxLQUFLO2FBQzdCO1lBQ0QsZ0JBQWdCLEVBQUUsSUFBSTtTQUN2QjtRQUNILENBQUMsQ0FBQyxFQUFFLENBQUM7Q0FDUixDQUFDLENBQUE7QUFmUyxRQUFBLFlBQVksZ0JBZXJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJ1xuaW1wb3J0IHsgRW52aXJvbm1lbnQgfSBmcm9tICcuL2Vudmlyb25tZW50J1xuaW1wb3J0IHsgbWFrZUlkLCBtYWtlTmFtZSB9IGZyb20gJy4vbmFtaW5nJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQnVja2V0ID0gKG5hbWU6IHN0cmluZywgc3RhY2s6IGNkay5TdGFjaywgaXNQdWJsaWM6IGJvb2xlYW4gPSBmYWxzZSkgPT5cbiAgbmV3IGNkay5hd3NfczMuQnVja2V0KHN0YWNrLCBtYWtlSWQobmFtZSksIHtcbiAgICBidWNrZXROYW1lOiBtYWtlTmFtZShuYW1lLCBFbnZpcm9ubWVudC5yZWdpb24oKSksXG4gICAgcmVtb3ZhbFBvbGljeTogY2RrLlJlbW92YWxQb2xpY3kuREVTVFJPWSxcbiAgICAuLi4oaXNQdWJsaWNcbiAgICAgID8ge1xuICAgICAgICAgIGJsb2NrUHVibGljQWNjZXNzOiB7XG4gICAgICAgICAgICBibG9ja1B1YmxpY1BvbGljeTogZmFsc2UsXG4gICAgICAgICAgICBibG9ja1B1YmxpY0FjbHM6IGZhbHNlLFxuICAgICAgICAgICAgaWdub3JlUHVibGljQWNsczogZmFsc2UsXG4gICAgICAgICAgICByZXN0cmljdFB1YmxpY0J1Y2tldHM6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcHVibGljUmVhZEFjY2VzczogdHJ1ZSxcbiAgICAgICAgfVxuICAgICAgOiB7fSksXG4gIH0pXG4iXX0=