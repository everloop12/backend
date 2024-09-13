"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.IS_PUBLIC_KEY = 'public';
const Public = (isPublic = true) => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, isPublic);
exports.Public = Public;
//# sourceMappingURL=public.decorator.js.map