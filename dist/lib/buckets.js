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
const createBucket = (name, stack) => new cdk.aws_s3.Bucket(stack, (0, naming_1.makeId)(name), {
    bucketName: (0, naming_1.makeName)(name, environment_1.Environment.region()),
    removalPolicy: cdk.RemovalPolicy.DESTROY,
});
exports.createBucket = createBucket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVja2V0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9idWNrZXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQWtDO0FBQ2xDLCtDQUEyQztBQUMzQyxxQ0FBMkM7QUFFcEMsTUFBTSxZQUFZLEdBQUcsQ0FBQyxJQUFZLEVBQUUsS0FBZ0IsRUFBRSxFQUFFLENBQzdELElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLElBQUksQ0FBQyxFQUFFO0lBQ3pDLFVBQVUsRUFBRSxJQUFBLGlCQUFRLEVBQUMsSUFBSSxFQUFFLHlCQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEQsYUFBYSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTztDQUN6QyxDQUFDLENBQUE7QUFKUyxRQUFBLFlBQVksZ0JBSXJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJ1xuaW1wb3J0IHsgRW52aXJvbm1lbnQgfSBmcm9tICcuL2Vudmlyb25tZW50J1xuaW1wb3J0IHsgbWFrZUlkLCBtYWtlTmFtZSB9IGZyb20gJy4vbmFtaW5nJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQnVja2V0ID0gKG5hbWU6IHN0cmluZywgc3RhY2s6IGNkay5TdGFjaykgPT5cbiAgbmV3IGNkay5hd3NfczMuQnVja2V0KHN0YWNrLCBtYWtlSWQobmFtZSksIHtcbiAgICBidWNrZXROYW1lOiBtYWtlTmFtZShuYW1lLCBFbnZpcm9ubWVudC5yZWdpb24oKSksXG4gICAgcmVtb3ZhbFBvbGljeTogY2RrLlJlbW92YWxQb2xpY3kuREVTVFJPWSxcbiAgfSlcbiJdfQ==