import { env } from '@/configs/env.config';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.join(__dirname, "../../proto/auth.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const authProto = grpc.loadPackageDefinition(packageDefinition) as any;

const client = new authProto.auth.AuthService(
    `${env.AUTH_DOMAIN}:${443}`,
    grpc.credentials.createSsl()
);

export default client;
