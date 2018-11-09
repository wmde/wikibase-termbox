import fs from 'fs';
import express from 'express';
import { createBundleRenderer } from 'vue-server-renderer';

const app = express();
const serverBundle = fs.readFileSync( './serverDist/vue-ssr-server-bundle.json' );
const renderer = createBundleRenderer(
	JSON.parse( serverBundle.toString() ),
	{ runInNewContext: false },
);

app.get( '/termbox', ( _, res ) => {
	const context: object = {
		..._.query,
	};
	renderer.renderToString( context )
		.then( ( html ) => {
			res.send( html );
		} )
		.catch( ( err ) => {
			console.log( err );
			// todo dynamic http code / body depending on situation
			res.status( 500 ).send( 'bad things happened' );
		} );
} );

export default app;
