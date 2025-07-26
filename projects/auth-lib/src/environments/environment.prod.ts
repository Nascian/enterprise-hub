export const environment = {
    production: false,
    msalConfig: {
        auth: {
            clientId: '${CLIENT_ID}',
            redirectUri: '${REDIRECT_URI}',
            authority: 'https://login.microsoftonline.com/${AUTHORITY_TENANT}'
        }
    },
    apiConfig: {
        scopes: ['user.read'],
        apiUrl: '${URL_API}',
        appVersion: '${VERSION}',
        adAdminRole: '${AD_ADMIN_ROLE}',
        uriMe: '${GRAPH_ENDPOINT}/v1.0/me',
        uriMemberOf: '${GRAPH_ENDPOINT}/v1.0/me/memberOf'
    }    
};
