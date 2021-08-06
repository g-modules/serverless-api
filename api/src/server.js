import express from "express";
import bodyParser from "body-parser";
import handler from "./handlers/rest.js";
import { logger } from "./helpers/utils.js";

const apiServer = express();
const port = 6099;

apiServer.use( bodyParser.json() );
apiServer.route( "/v1/:databaseName/:collectionName/:documentId?" ).all( handler );
apiServer.listen( port );
logger.log( `RESTful API server started on: ${port}` );
