import TermboxRequest from '@/common/TermboxRequest';
import validate from 'validate.js';
import WikibaseRepo from '@/server/data-access/WikibaseRepo';
import EntityInitializer from '@/common/EntityInitializer';
import Entity from '@/store/entity/Entity';
import ApiEntityNotFound from '@/server/data-access/error/EntityNotFound';
import EntityNotFound from './error/EntityNotFound';
import InvalidRequest from './error/InvalidRequest';
import TechnicalProblem from './error/TechnicalProblem';

export default class TermboxHandler {

	private repo: WikibaseRepo;
	private entityInitializer: EntityInitializer;

	private CONSTRAINTS = {
		language: {
			presence: true,
			format: {
				pattern: /^[a-z]{2,3}$/,
				message: ( value: any ) => {
					return validate.format( '^"%{value}" is not a valid language code', {
						value,
					} );
				},
			},
		},
		entity: {
			presence: true,
			format: {
				pattern: /^[QP]{1}[0-9]+$/,
				message: ( value: any ) => {
					return validate.format( '^"%{value}" is not a valid entity id', {
						value,
					} );
				},
			},
		},
	};

	constructor( repo: WikibaseRepo, entityInitializer: EntityInitializer ) {
		this.repo = repo;
		this.entityInitializer = entityInitializer;
	}

	public createTermboxRequest( query: any ): Promise<TermboxRequest> {
		return new Promise( ( resolve, reject ) => {
			validate.async( query, this.CONSTRAINTS )
				.catch( ( errors ) => {
					reject( new InvalidRequest( 'Request errors: ' + JSON.stringify( errors ) ) );
				} )
				.then( () => {
					const language = query.language;
					const entityId = query.entity;

					this.repo.getEntity( entityId )
						.then( ( entity: Entity ) => {
							try {
								resolve(
									new TermboxRequest(
										language,
										this.entityInitializer.newFromSerialization( entity ),
									),
								);
							} catch ( e ) {
								reject( new TechnicalProblem( 'Could not initialize entity. ' + e.message ) );
							}
						} )
						.catch( ( reason: Error ) => {
							if ( reason instanceof ApiEntityNotFound ) {
								reject( new EntityNotFound( reason.message ) );
							} else {
								reject( new TechnicalProblem( reason.message ) );
							}

						} );
				} );
		} );
	}

}
