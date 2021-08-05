import { createDocuments, readDocuments, updateDocuments, deleteDocuments } from "../core/crud.js";
import { answer } from "../helpers/utils.js";


const statusCodes = {
	"successful": 200,
	"badRequest": 400,
	"internalServerError": 500
};


const handlerCreateDocuments = async ( request, response ) => {
	try {
		// serverless
		// const { databaseName, collectionName } = request.pathParameters;
		// const newDocuments = await JSON.parse( request.body ); // expect Array
		// return answer.successful( statusCodes.successful, result )

		// express
		const { databaseName, collectionName } = request.params;
		const newDocuments = request.body; // expect Array
		if ( !newDocuments ) throw Error( "Nothing to add. Empty request." ); // catch error, empty request
		const result = await createDocuments( databaseName, collectionName, newDocuments );
		return response.json( answer.successful( statusCodes.successful, result ) );
	} catch ( error ) {
		return response.json( answer.error( statusCodes.badRequest, error ) );
	}
};

const handlerReadDocuments = async ( request, response ) => {
	try {
		// serverless
		// const { databaseName, collectionName, documentId } = request.pathParameters;
		// return response.json( answer.successful( statusCodes.successful, "Finded", result ) );

		// express
		const { databaseName, collectionName, documentId } = request.params;
		const result = await readDocuments( databaseName, collectionName, documentId );
		return response.json( answer.successful( statusCodes.successful, "Finded", result ) );
	} catch ( error ) {
		return response.json( answer.error( statusCodes.badRequest, error ) );
	}
};

const handlerUpdateDocuments = async ( request, response ) => {
	try {
		// serverless
		// const { databaseName, collectionName, documentId } = request.pathParameters;
		// const documentsUpdate = await JSON.parse( request.body ); // expect Object
		// return answer.successful( statusCodes.successful, "Updated" );

		// express
		const { databaseName, collectionName, documentId } = request.params;
		const documentsUpdate = request.body; // expect Array
		const result = await updateDocuments( databaseName, collectionName, documentId, documentsUpdate );
		return response.json( answer.successful( statusCodes.successful, "Updated", result ) );
	} catch ( error ) {
		return response.json( answer.error( statusCodes.internalServerError, error ) );
	}
};

const handlerDeleteDocuments = async ( request, response ) => {
	try {
		// serverless
		// const { databaseName, collectionName, documentId } = request.pathParameters; // expect Object
		// return answer.successful( statusCodes.successful, "Deleted" );

		// express
		const { databaseName, collectionName, documentId } = request.params;
		const result = await deleteDocuments( databaseName, collectionName, documentId );
		return response.json( answer.successful( statusCodes.successful, "Deleted", result ) );
	} catch ( error ) {
		return response.json( answer.error( statusCodes.internalServerError, error ) );
	}
};

export { handlerCreateDocuments, handlerReadDocuments, handlerUpdateDocuments, handlerDeleteDocuments };
