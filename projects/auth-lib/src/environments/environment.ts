export const environment = {
    production: false,
    msalConfig: {
        auth: {
            clientId: 'cliente',
            redirectUri: '/',
            authority: 'https://login.microsoftonline.com/xxx'
        }
    },
    apiConfig: {
        scopes: ['user.read'],
        apiUrl: 'http://localhost/api/v1.0',
        //apiUrl: 'http://localhost:8081/v1.0',
        appVersion: 'develop',
        adAdminRole: 'Test',
        uriMe: 'https://graph.microsoft.com/v1.0/me',
        uriMemberOf: 'https://graph.microsoft.com/v1.0/me/memberOf'
    }


    
};
