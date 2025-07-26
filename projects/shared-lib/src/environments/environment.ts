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
        apiUrl: 'http://localhost:8080',
        //apiUrl: 'http://localhost:8080/v1.0',
        appVersion: 'develop',
        adAdminRole: 'Test',
        uriMe: 'https://graph.microsoft.com/v1.0/me',
        uriMemberOf: 'https://graph.microsoft.com/v1.0/me/memberOf'
    },
    resources: {
        taks: {
            url: 'https://mic-task-ang.web.app/#/'
        } ,
        template: {
            url: 'https://mic-template-ang.web.app/#/'
        } ,
        dbconnect: {
            url: 'https://mic-db-connect-ang.web.app/#/'
            //url: 'http://localhost:4201/#/'
        } ,
        apiGateway: {
            url: 'https://mic-apigateway.web.app/#/'
        }
          
    }


    
};
