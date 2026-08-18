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
exports.createStack = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const environment_1 = require("./environment");
const naming_1 = require("./naming");
const createStack = (name, app) => new cdk.Stack(app, (0, naming_1.makeId)(name), { env: { region: environment_1.Environment.region() } });
exports.createStack = createStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQWtDO0FBQ2xDLCtDQUEyQztBQUMzQyxxQ0FBaUM7QUFFMUIsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFZLEVBQUUsR0FBWSxFQUFFLEVBQUUsQ0FDeEQsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFBLGVBQU0sRUFBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRSx5QkFBVyxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBRGhFLFFBQUEsV0FBVyxlQUNxRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYidcbmltcG9ydCB7IEVudmlyb25tZW50IH0gZnJvbSAnLi9lbnZpcm9ubWVudCdcbmltcG9ydCB7IG1ha2VJZCB9IGZyb20gJy4vbmFtaW5nJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlU3RhY2sgPSAobmFtZTogc3RyaW5nLCBhcHA6IGNkay5BcHApID0+XG4gIG5ldyBjZGsuU3RhY2soYXBwLCBtYWtlSWQobmFtZSksIHsgZW52OiB7IHJlZ2lvbjogRW52aXJvbm1lbnQucmVnaW9uKCkgfSB9KVxuIl19