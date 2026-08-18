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
exports.createAutoVerifyLambda = exports.createUserPoolClient = exports.createUserPool = exports.createCognito = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const naming_1 = require("./naming");
const createCognito = (prefix, props) => {
    const userPool = (0, exports.createUserPool)(`${prefix}UserPool`, props);
    const userPoolClient = (0, exports.createUserPoolClient)(`${prefix}UserPoolClient`, { ...props, userPool });
    return { userPool, userPoolClient };
};
exports.createCognito = createCognito;
// {
//   minLength: 8,
//   requireLowercase: true,
//   requireUppercase: true,
//   requireDigits: true,
// }
const createUserPool = (name, props) => new cdk.aws_cognito.UserPool(props.stack, (0, naming_1.makeId)(name), {
    userPoolName: (0, naming_1.makeName)(name),
    selfSignUpEnabled: true,
    signInAliases: { email: true },
    autoVerify: { email: true },
    passwordPolicy: props.passwordPolicy,
    accountRecovery: cdk.aws_cognito.AccountRecovery.EMAIL_ONLY,
});
exports.createUserPool = createUserPool;
const createUserPoolClient = (name, props) => new cdk.aws_cognito.UserPoolClient(props.stack, name, {
    userPool: props.userPool,
    generateSecret: false,
    authFlows: { userPassword: true },
    accessTokenValidity: cdk.Duration.hours(1),
    idTokenValidity: cdk.Duration.hours(1),
    refreshTokenValidity: cdk.Duration.days(30),
});
exports.createUserPoolClient = createUserPoolClient;
const createAutoVerifyLambda = (stack) => new cdk.aws_lambda.Function(stack, (0, naming_1.makeId)('CognitoPreSignUpLambda'), {
    runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
    handler: 'index.handler',
    code: cdk.aws_lambda.Code.fromInline(`
    exports.handler = async (event) => {
      event.response.autoConfirmUser = true;
      event.response.autoVerifyEmail = true;
      return event;
    };
  `),
});
exports.createAutoVerifyLambda = createAutoVerifyLambda;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29nbml0by5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb2duaXRvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFrQztBQUNsQyxxQ0FBMkM7QUFFcEMsTUFBTSxhQUFhLEdBQUcsQ0FDM0IsTUFBYyxFQUNkLEtBQTRFLEVBQzVFLEVBQUU7SUFDRixNQUFNLFFBQVEsR0FBRyxJQUFBLHNCQUFjLEVBQUMsR0FBRyxNQUFNLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUMzRCxNQUFNLGNBQWMsR0FBRyxJQUFBLDRCQUFvQixFQUFDLEdBQUcsTUFBTSxnQkFBZ0IsRUFBRSxFQUFFLEdBQUcsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7SUFDOUYsT0FBTyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsQ0FBQTtBQUNyQyxDQUFDLENBQUE7QUFQWSxRQUFBLGFBQWEsaUJBT3pCO0FBRUQsSUFBSTtBQUNKLGtCQUFrQjtBQUNsQiw0QkFBNEI7QUFDNUIsNEJBQTRCO0FBQzVCLHlCQUF5QjtBQUN6QixJQUFJO0FBQ0csTUFBTSxjQUFjLEdBQUcsQ0FDNUIsSUFBWSxFQUNaLEtBQTRFLEVBQzVFLEVBQUUsQ0FDRixJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBQSxlQUFNLEVBQUMsSUFBSSxDQUFDLEVBQUU7SUFDdEQsWUFBWSxFQUFFLElBQUEsaUJBQVEsRUFBQyxJQUFJLENBQUM7SUFDNUIsaUJBQWlCLEVBQUUsSUFBSTtJQUN2QixhQUFhLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO0lBQzlCLFVBQVUsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7SUFDM0IsY0FBYyxFQUFFLEtBQUssQ0FBQyxjQUFjO0lBQ3BDLGVBQWUsRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxVQUFVO0NBQzVELENBQUMsQ0FBQTtBQVhTLFFBQUEsY0FBYyxrQkFXdkI7QUFFRyxNQUFNLG9CQUFvQixHQUFHLENBQUMsSUFBWSxFQUFFLEtBQStELEVBQUUsRUFBRSxDQUNwSCxJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFO0lBQ3BELFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtJQUN4QixjQUFjLEVBQUUsS0FBSztJQUNyQixTQUFTLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFO0lBQ2pDLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMxQyxlQUFlLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLG9CQUFvQixFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztDQUM1QyxDQUFDLENBQUE7QUFSUyxRQUFBLG9CQUFvQix3QkFRN0I7QUFFRyxNQUFNLHNCQUFzQixHQUFHLENBQUMsS0FBZ0IsRUFBRSxFQUFFLENBQ3pELElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLHdCQUF3QixDQUFDLEVBQUU7SUFDbkUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVc7SUFDM0MsT0FBTyxFQUFFLGVBQWU7SUFDeEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzs7Ozs7O0dBTXRDLENBQUM7Q0FDRCxDQUFDLENBQUE7QUFYUyxRQUFBLHNCQUFzQiwwQkFXL0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInXG5pbXBvcnQgeyBtYWtlSWQsIG1ha2VOYW1lIH0gZnJvbSAnLi9uYW1pbmcnXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDb2duaXRvID0gKFxuICBwcmVmaXg6IHN0cmluZyxcbiAgcHJvcHM6IHsgc3RhY2s6IGNkay5TdGFjazsgcGFzc3dvcmRQb2xpY3k/OiBjZGsuYXdzX2NvZ25pdG8uUGFzc3dvcmRQb2xpY3kgfVxuKSA9PiB7XG4gIGNvbnN0IHVzZXJQb29sID0gY3JlYXRlVXNlclBvb2woYCR7cHJlZml4fVVzZXJQb29sYCwgcHJvcHMpXG4gIGNvbnN0IHVzZXJQb29sQ2xpZW50ID0gY3JlYXRlVXNlclBvb2xDbGllbnQoYCR7cHJlZml4fVVzZXJQb29sQ2xpZW50YCwgeyAuLi5wcm9wcywgdXNlclBvb2wgfSlcbiAgcmV0dXJuIHsgdXNlclBvb2wsIHVzZXJQb29sQ2xpZW50IH1cbn1cblxuLy8ge1xuLy8gICBtaW5MZW5ndGg6IDgsXG4vLyAgIHJlcXVpcmVMb3dlcmNhc2U6IHRydWUsXG4vLyAgIHJlcXVpcmVVcHBlcmNhc2U6IHRydWUsXG4vLyAgIHJlcXVpcmVEaWdpdHM6IHRydWUsXG4vLyB9XG5leHBvcnQgY29uc3QgY3JlYXRlVXNlclBvb2wgPSAoXG4gIG5hbWU6IHN0cmluZyxcbiAgcHJvcHM6IHsgc3RhY2s6IGNkay5TdGFjazsgcGFzc3dvcmRQb2xpY3k/OiBjZGsuYXdzX2NvZ25pdG8uUGFzc3dvcmRQb2xpY3kgfVxuKSA9PlxuICBuZXcgY2RrLmF3c19jb2duaXRvLlVzZXJQb29sKHByb3BzLnN0YWNrLCBtYWtlSWQobmFtZSksIHtcbiAgICB1c2VyUG9vbE5hbWU6IG1ha2VOYW1lKG5hbWUpLFxuICAgIHNlbGZTaWduVXBFbmFibGVkOiB0cnVlLFxuICAgIHNpZ25JbkFsaWFzZXM6IHsgZW1haWw6IHRydWUgfSxcbiAgICBhdXRvVmVyaWZ5OiB7IGVtYWlsOiB0cnVlIH0sXG4gICAgcGFzc3dvcmRQb2xpY3k6IHByb3BzLnBhc3N3b3JkUG9saWN5LFxuICAgIGFjY291bnRSZWNvdmVyeTogY2RrLmF3c19jb2duaXRvLkFjY291bnRSZWNvdmVyeS5FTUFJTF9PTkxZLFxuICB9KVxuXG5leHBvcnQgY29uc3QgY3JlYXRlVXNlclBvb2xDbGllbnQgPSAobmFtZTogc3RyaW5nLCBwcm9wczogeyBzdGFjazogY2RrLlN0YWNrOyB1c2VyUG9vbDogY2RrLmF3c19jb2duaXRvLlVzZXJQb29sIH0pID0+XG4gIG5ldyBjZGsuYXdzX2NvZ25pdG8uVXNlclBvb2xDbGllbnQocHJvcHMuc3RhY2ssIG5hbWUsIHtcbiAgICB1c2VyUG9vbDogcHJvcHMudXNlclBvb2wsXG4gICAgZ2VuZXJhdGVTZWNyZXQ6IGZhbHNlLFxuICAgIGF1dGhGbG93czogeyB1c2VyUGFzc3dvcmQ6IHRydWUgfSxcbiAgICBhY2Nlc3NUb2tlblZhbGlkaXR5OiBjZGsuRHVyYXRpb24uaG91cnMoMSksXG4gICAgaWRUb2tlblZhbGlkaXR5OiBjZGsuRHVyYXRpb24uaG91cnMoMSksXG4gICAgcmVmcmVzaFRva2VuVmFsaWRpdHk6IGNkay5EdXJhdGlvbi5kYXlzKDMwKSxcbiAgfSlcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUF1dG9WZXJpZnlMYW1iZGEgPSAoc3RhY2s6IGNkay5TdGFjaykgPT5cbiAgbmV3IGNkay5hd3NfbGFtYmRhLkZ1bmN0aW9uKHN0YWNrLCBtYWtlSWQoJ0NvZ25pdG9QcmVTaWduVXBMYW1iZGEnKSwge1xuICAgIHJ1bnRpbWU6IGNkay5hd3NfbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE4X1gsXG4gICAgaGFuZGxlcjogJ2luZGV4LmhhbmRsZXInLFxuICAgIGNvZGU6IGNkay5hd3NfbGFtYmRhLkNvZGUuZnJvbUlubGluZShgXG4gICAgZXhwb3J0cy5oYW5kbGVyID0gYXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5yZXNwb25zZS5hdXRvQ29uZmlybVVzZXIgPSB0cnVlO1xuICAgICAgZXZlbnQucmVzcG9uc2UuYXV0b1ZlcmlmeUVtYWlsID0gdHJ1ZTtcbiAgICAgIHJldHVybiBldmVudDtcbiAgICB9O1xuICBgKSxcbiAgfSlcbiJdfQ==