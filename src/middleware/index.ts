import { handleCors, handleBodyRequestParsing, handleCompression } from './common';
import { handleAPIDocs } from './apiDocs';
import { handleHTTPLogging } from './logging';

export default [handleCors, handleBodyRequestParsing, handleCompression, handleHTTPLogging, handleAPIDocs];
