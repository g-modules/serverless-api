import { createDocuments, readDocuments, updateDocuments, deleteDocuments } from "../core/crud.js";
// import { answer } from "../helpers/utils.js";


// const statusCodes = {
// 	"successful": 200,
// 	"badRequest": 400,
// 	"internalServerError": 500
// };

// const guard = ( request ) => {
// 	try {
// 		if ( !request ) throw new Error( "Empty Request" );
// 		return true;
// 	} catch ( error ) {
// 		// console.log( error );
// 		return false;
// 	}
// };

export default async function handler ( request, response ) {
	let result;
	try {
		// guard( request );
		const { databaseName, collectionName, documentId } = request.params;
		const newDocuments = request.body;
		switch ( request.method ) {
			case "POST":
				result = await createDocuments( databaseName, collectionName, newDocuments );
				break;
			case "GET":
				result = await readDocuments( databaseName, collectionName, documentId );
				break;
			case "PUT":
				result = await updateDocuments( databaseName, collectionName, documentId, newDocuments );
				break;
			case "DELETE":
				result = await deleteDocuments( databaseName, collectionName, documentId );
				break;
			default:
				result = "Unknown method";
		}
		response.json( result );
	} catch ( error ) {
		response.json( error );
	} finally {
		result = null;
	}
}
