"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../config");
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const jet_logger_1 = __importDefault(require("jet-logger"));
const routes_1 = __importDefault(require("@src/routes"));
const Paths_1 = __importDefault(require("@src/common/constants/Paths"));
const ENV_1 = __importDefault(require("@src/common/constants/ENV"));
const HttpStatusCodes_1 = __importDefault(require("@src/common/constants/HttpStatusCodes"));
const route_errors_1 = require("@src/common/util/route-errors");
const constants_1 = require("@src/common/constants");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
if (ENV_1.default.NodeEnv === constants_1.NodeEnvs.Dev) {
    app.use((0, morgan_1.default)('dev'));
}
if (ENV_1.default.NodeEnv === constants_1.NodeEnvs.Production) {
    if (!process.env.DISABLE_HELMET) {
        app.use((0, helmet_1.default)());
    }
}
const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, 'api.yaml'));
app.use('/apiDocs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.get('/', (_req, res) => {
    res.redirect('/apiDocs');
});
app.use(Paths_1.default.Base, routes_1.default);
app.use((err, _, res, _next) => {
    if (ENV_1.default.NodeEnv !== constants_1.NodeEnvs.Test.valueOf()) {
        jet_logger_1.default.err(err, true);
    }
    let status = HttpStatusCodes_1.default.INTERNAL_SERVER_ERROR;
    let message = 'Erreur serveur interne';
    if (err instanceof route_errors_1.RouteError) {
        status = err.status;
        message = err.message;
    }
    else if (err.name === 'ValidationError') {
        status = HttpStatusCodes_1.default.BAD_REQUEST;
        const firstError = Object.values(err.errors)[0];
        message = firstError.message;
    }
    return res.status(status).json({
        error: message,
    });
});
exports.default = app;
