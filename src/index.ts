import { Contact } from "./interfaces/Contact";
import Scopes from './constants/Scopes'
import OAuth2, { AuthorizationResponse } from './libs/OAuth2'
import Contacts from "./ressources/Contacts";

export { Contact, Scopes }

export default class Bexio {
    private clientId: string
    private clientSecret: string
    private redirectUri: string
    private scopes: Array<Scopes>

    private bexioAuth: OAuth2

    // Ressources
    public contacts: Contacts

    constructor(clientId: string, clientSecret: string, redirectUri: string, scopes: Array<Scopes>) {
        this.clientId = clientId
        this.clientSecret = clientSecret
        this.redirectUri = redirectUri
        this.scopes = scopes

        this.bexioAuth = new OAuth2(this.clientId, this.clientSecret, this.redirectUri, this.scopes)

        // Init ressources
        this.contacts = new Contacts(this.bexioAuth, this.scopes)
    }

    /**
     * Returns the authorization uri for starting the oauth2 flow
     *
     * @returns {string}
     * @memberof Bexio
     */
    public getAuthUrl(): string {
        return this.bexioAuth.getAuthorizationUrl();
    }

    /**
     * Parses the token out of the reponse url
     *
     * @param {AuthorizationResponse} query
     * @returns {Promise<void>}
     * @memberof Bexio
     */
    public async generateAccessToken(query: AuthorizationResponse): Promise<void> {
        await this.bexioAuth.generateAccessToken(query)
    }
}
