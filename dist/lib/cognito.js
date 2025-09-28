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
exports.createUserPoolClient = exports.createUserPool = exports.createCognito = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29nbml0by5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb2duaXRvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQWtDO0FBQ2xDLHFDQUEyQztBQUVwQyxNQUFNLGFBQWEsR0FBRyxDQUMzQixNQUFjLEVBQ2QsS0FBNEUsRUFDNUUsRUFBRTtJQUNGLE1BQU0sUUFBUSxHQUFHLElBQUEsc0JBQWMsRUFBQyxHQUFHLE1BQU0sVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQzNELE1BQU0sY0FBYyxHQUFHLElBQUEsNEJBQW9CLEVBQUMsR0FBRyxNQUFNLGdCQUFnQixFQUFFLEVBQUUsR0FBRyxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtJQUM5RixPQUFPLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxDQUFBO0FBQ3JDLENBQUMsQ0FBQTtBQVBZLFFBQUEsYUFBYSxpQkFPekI7QUFFRCxJQUFJO0FBQ0osa0JBQWtCO0FBQ2xCLDRCQUE0QjtBQUM1Qiw0QkFBNEI7QUFDNUIseUJBQXlCO0FBQ3pCLElBQUk7QUFDRyxNQUFNLGNBQWMsR0FBRyxDQUM1QixJQUFZLEVBQ1osS0FBNEUsRUFDNUUsRUFBRSxDQUNGLElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFBLGVBQU0sRUFBQyxJQUFJLENBQUMsRUFBRTtJQUN0RCxZQUFZLEVBQUUsSUFBQSxpQkFBUSxFQUFDLElBQUksQ0FBQztJQUM1QixpQkFBaUIsRUFBRSxJQUFJO0lBQ3ZCLGFBQWEsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7SUFDOUIsVUFBVSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtJQUMzQixjQUFjLEVBQUUsS0FBSyxDQUFDLGNBQWM7SUFDcEMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLFVBQVU7Q0FDNUQsQ0FBQyxDQUFBO0FBWFMsUUFBQSxjQUFjLGtCQVd2QjtBQUVHLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxJQUFZLEVBQUUsS0FBK0QsRUFBRSxFQUFFLENBQ3BILElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUU7SUFDcEQsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO0lBQ3hCLGNBQWMsRUFBRSxLQUFLO0lBQ3JCLFNBQVMsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUU7SUFDakMsbUJBQW1CLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzFDLGVBQWUsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdEMsb0JBQW9CLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0NBQzVDLENBQUMsQ0FBQTtBQVJTLFFBQUEsb0JBQW9CLHdCQVE3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYidcbmltcG9ydCB7IG1ha2VJZCwgbWFrZU5hbWUgfSBmcm9tICcuL25hbWluZydcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNvZ25pdG8gPSAoXG4gIHByZWZpeDogc3RyaW5nLFxuICBwcm9wczogeyBzdGFjazogY2RrLlN0YWNrOyBwYXNzd29yZFBvbGljeT86IGNkay5hd3NfY29nbml0by5QYXNzd29yZFBvbGljeSB9XG4pID0+IHtcbiAgY29uc3QgdXNlclBvb2wgPSBjcmVhdGVVc2VyUG9vbChgJHtwcmVmaXh9VXNlclBvb2xgLCBwcm9wcylcbiAgY29uc3QgdXNlclBvb2xDbGllbnQgPSBjcmVhdGVVc2VyUG9vbENsaWVudChgJHtwcmVmaXh9VXNlclBvb2xDbGllbnRgLCB7IC4uLnByb3BzLCB1c2VyUG9vbCB9KVxuICByZXR1cm4geyB1c2VyUG9vbCwgdXNlclBvb2xDbGllbnQgfVxufVxuXG4vLyB7XG4vLyAgIG1pbkxlbmd0aDogOCxcbi8vICAgcmVxdWlyZUxvd2VyY2FzZTogdHJ1ZSxcbi8vICAgcmVxdWlyZVVwcGVyY2FzZTogdHJ1ZSxcbi8vICAgcmVxdWlyZURpZ2l0czogdHJ1ZSxcbi8vIH1cbmV4cG9ydCBjb25zdCBjcmVhdGVVc2VyUG9vbCA9IChcbiAgbmFtZTogc3RyaW5nLFxuICBwcm9wczogeyBzdGFjazogY2RrLlN0YWNrOyBwYXNzd29yZFBvbGljeT86IGNkay5hd3NfY29nbml0by5QYXNzd29yZFBvbGljeSB9XG4pID0+XG4gIG5ldyBjZGsuYXdzX2NvZ25pdG8uVXNlclBvb2wocHJvcHMuc3RhY2ssIG1ha2VJZChuYW1lKSwge1xuICAgIHVzZXJQb29sTmFtZTogbWFrZU5hbWUobmFtZSksXG4gICAgc2VsZlNpZ25VcEVuYWJsZWQ6IHRydWUsXG4gICAgc2lnbkluQWxpYXNlczogeyBlbWFpbDogdHJ1ZSB9LFxuICAgIGF1dG9WZXJpZnk6IHsgZW1haWw6IHRydWUgfSxcbiAgICBwYXNzd29yZFBvbGljeTogcHJvcHMucGFzc3dvcmRQb2xpY3ksXG4gICAgYWNjb3VudFJlY292ZXJ5OiBjZGsuYXdzX2NvZ25pdG8uQWNjb3VudFJlY292ZXJ5LkVNQUlMX09OTFksXG4gIH0pXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVVc2VyUG9vbENsaWVudCA9IChuYW1lOiBzdHJpbmcsIHByb3BzOiB7IHN0YWNrOiBjZGsuU3RhY2s7IHVzZXJQb29sOiBjZGsuYXdzX2NvZ25pdG8uVXNlclBvb2wgfSkgPT5cbiAgbmV3IGNkay5hd3NfY29nbml0by5Vc2VyUG9vbENsaWVudChwcm9wcy5zdGFjaywgbmFtZSwge1xuICAgIHVzZXJQb29sOiBwcm9wcy51c2VyUG9vbCxcbiAgICBnZW5lcmF0ZVNlY3JldDogZmFsc2UsXG4gICAgYXV0aEZsb3dzOiB7IHVzZXJQYXNzd29yZDogdHJ1ZSB9LFxuICAgIGFjY2Vzc1Rva2VuVmFsaWRpdHk6IGNkay5EdXJhdGlvbi5ob3VycygxKSxcbiAgICBpZFRva2VuVmFsaWRpdHk6IGNkay5EdXJhdGlvbi5ob3VycygxKSxcbiAgICByZWZyZXNoVG9rZW5WYWxpZGl0eTogY2RrLkR1cmF0aW9uLmRheXMoMzApLFxuICB9KVxuIl19