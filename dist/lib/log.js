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
exports.createLogGroup = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const naming_1 = require("./naming");
const createLogGroup = (name, stack, api) => new cdk.aws_logs.CfnLogGroup(stack, (0, naming_1.makeId)(name), {
    logGroupName: `/aws/apigateway/${api.name}`,
    retentionInDays: 7,
});
exports.createLogGroup = createLogGroup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBa0M7QUFDbEMscUNBQWlDO0FBRTFCLE1BQU0sY0FBYyxHQUFHLENBQUMsSUFBWSxFQUFFLEtBQWdCLEVBQUUsR0FBZ0MsRUFBRSxFQUFFLENBQ2pHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLElBQUksQ0FBQyxFQUFFO0lBQ2hELFlBQVksRUFBRSxtQkFBbUIsR0FBRyxDQUFDLElBQUksRUFBRTtJQUMzQyxlQUFlLEVBQUUsQ0FBQztDQUNuQixDQUFDLENBQUE7QUFKUyxRQUFBLGNBQWMsa0JBSXZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJ1xuaW1wb3J0IHsgbWFrZUlkIH0gZnJvbSAnLi9uYW1pbmcnXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVMb2dHcm91cCA9IChuYW1lOiBzdHJpbmcsIHN0YWNrOiBjZGsuU3RhY2ssIGFwaTogY2RrLmF3c19hcGlnYXRld2F5djIuQ2ZuQXBpKSA9PlxuICBuZXcgY2RrLmF3c19sb2dzLkNmbkxvZ0dyb3VwKHN0YWNrLCBtYWtlSWQobmFtZSksIHtcbiAgICBsb2dHcm91cE5hbWU6IGAvYXdzL2FwaWdhdGV3YXkvJHthcGkubmFtZX1gLFxuICAgIHJldGVudGlvbkluRGF5czogNyxcbiAgfSlcbiJdfQ==