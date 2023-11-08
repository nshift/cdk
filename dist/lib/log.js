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
exports.createLogGroup = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const naming_1 = require("./naming");
const createLogGroup = (name, stack, api) => new cdk.aws_logs.CfnLogGroup(stack, (0, naming_1.makeId)(name), {
    logGroupName: `/aws/apigateway/${api.name}`,
    retentionInDays: 7,
});
exports.createLogGroup = createLogGroup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFrQztBQUNsQyxxQ0FBaUM7QUFFMUIsTUFBTSxjQUFjLEdBQUcsQ0FBQyxJQUFZLEVBQUUsS0FBZ0IsRUFBRSxHQUFnQyxFQUFFLEVBQUUsQ0FDakcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBQSxlQUFNLEVBQUMsSUFBSSxDQUFDLEVBQUU7SUFDaEQsWUFBWSxFQUFFLG1CQUFtQixHQUFHLENBQUMsSUFBSSxFQUFFO0lBQzNDLGVBQWUsRUFBRSxDQUFDO0NBQ25CLENBQUMsQ0FBQTtBQUpTLFFBQUEsY0FBYyxrQkFJdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInXG5pbXBvcnQgeyBtYWtlSWQgfSBmcm9tICcuL25hbWluZydcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUxvZ0dyb3VwID0gKG5hbWU6IHN0cmluZywgc3RhY2s6IGNkay5TdGFjaywgYXBpOiBjZGsuYXdzX2FwaWdhdGV3YXl2Mi5DZm5BcGkpID0+XG4gIG5ldyBjZGsuYXdzX2xvZ3MuQ2ZuTG9nR3JvdXAoc3RhY2ssIG1ha2VJZChuYW1lKSwge1xuICAgIGxvZ0dyb3VwTmFtZTogYC9hd3MvYXBpZ2F0ZXdheS8ke2FwaS5uYW1lfWAsXG4gICAgcmV0ZW50aW9uSW5EYXlzOiA3LFxuICB9KVxuIl19