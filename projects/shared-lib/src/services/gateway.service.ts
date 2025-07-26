import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


import {
  HttpErrorResponse
} from '@angular/common/http';
import { environment } from 'projects/shared-lib/src/environments/environment';

  

@Injectable({
  providedIn: 'root',
})
export class GatewayService {

    private url: any;
  private headers = new HttpHeaders();

  constructor(private _http: HttpClient) {
    this.conectionConfig();
    this.headers.append('Cache-control', 'no-cache');
    this.headers.append('Cache-control', 'no-store');
    this.headers.append('Expires', '0');
    this.headers.append('Pragma', 'no-cache');
  }

  //Config conection services
  private conectionConfig(): void {
    
  }



  createResource(data:any): Observable<any> {
    return this._http.post<any[]>(`${environment.apiConfig.apiUrl}/resource-manager/manage/resource`,data).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  deleteResource(id:string): Observable<any> {
    return this._http.delete<any[]>(`${environment.apiConfig.apiUrl}/resource-manager/manage/resource/DBCONNECT/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }
  getResources(): Observable<any> {
    return this._http.get(environment.apiConfig.apiUrl + '/resource-manager/manage/resource?page=0&size=10').pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

/**  API GATEWAY **/

  getroute(): Observable<any> {
      return this._http.get<any[]>(`${environment.apiConfig.apiUrl}/admin/route`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  postroute(route: any): Observable<any> {
    return this._http.post<any[]>(`${environment.apiConfig.apiUrl}/admin/route`, route).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  deleteroute(name: string): Observable<any> {
    return this._http.delete<any[]>(`${environment.apiConfig.apiUrl}/admin/route/`+name).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }



/**  DATABASE SERVICES **/

saveDbConnect(metadata:any, name:string): Observable<any> {
  return this._http.put<any[]>(`${environment.apiConfig.apiUrl}/db-connect-api/manage/resource/${name}`,metadata).pipe(
    catchError(e => {
      return throwError(e);
    })
  )
}


getDbConnect(name:string): Observable<any> {

return this._http.get<any[]>(`${environment.apiConfig.apiUrl}/db-connect-api/manage/resource/`+name).pipe(
  catchError(e => {
    return throwError(e);
  })
)
}



downloadReport(id: string): Observable<any> {


  let queryParams = new HttpParams();
  queryParams = queryParams.append("page",0);
  queryParams = queryParams.append("size",0);
  queryParams = queryParams.append("endDate",'2025-11-28');
  queryParams = queryParams.append("initDate",'2024-11-28');
  queryParams = queryParams.append("id",id);

  return this._http.get(`${environment.apiConfig.apiUrl}/db-connect-api/manage/report/download/csv`,{   responseType: 'blob' , params: queryParams }).pipe(
    catchError(e => {
      return throwError(e);
    })
  )

}

  downloadTable(id: string): Observable<any> {

    

    return this._http.get(`${environment.apiConfig.apiUrl}/db-connect-api/manage/table/${id}/download`, {  responseType: 'blob' }).pipe(
      catchError(e => {       
        return throwError(e);
      })
    )
  }
  
  

  describe(id: string): Observable<any> {
    return this._http.get<any[]>(`${environment.apiConfig.apiUrl}/db-connect-api/manage/table/${id}/describe`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }
  

  findAllReport(id: string, page: number, size:number): Observable<any> {

    let queryParams = new HttpParams();
    queryParams = queryParams.append("page",''+page);
    queryParams = queryParams.append("size",''+size);
    queryParams = queryParams.append("endDate",'2025-11-28');
    queryParams = queryParams.append("initDate",'2024-11-28');
    queryParams = queryParams.append("id",id);

    return this._http.get<any[]>(`${environment.apiConfig.apiUrl}/db-connect-api/manage/report/call`,{  params: queryParams }).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  findAll(id: string, page: number, size:number): Observable<any> {

    let queryParams = new HttpParams();
    queryParams = queryParams.append("page",''+page);
    queryParams = queryParams.append("size",''+size);

    return this._http.get<any[]>(`${environment.apiConfig.apiUrl}/db-connect-api/manage/table/${id}`,{  params: queryParams }).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  
  insertData(id: string, data:any): Observable<any> {
    return this._http.post<any[]>(`${environment.apiConfig.apiUrl}/db-connect-api/manage/table/${id}`, data).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  putData(id: string, data:any): Observable<any> {
    return this._http.put<any[]>(`${environment.apiConfig.apiUrl}/db-connect-api/manage/table/${id}`, data).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  deleteData(id: string, data:any): Observable<any> {
    return this._http.post<any[]>(`${environment.apiConfig.apiUrl}/db-connect-api/manage/table/${id}`,data).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }



  /**  EMAIL SERVICES **/



  

  sendEmail(message:any, id:string): Observable<any> {
    return this._http.post<any[]>(`${environment.apiConfig.apiUrl}/email-api/manage/mail/${id}`,message).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

saveEmail(metadata:any, name:string): Observable<any> {
  return this._http.put<any[]>(`${environment.apiConfig.apiUrl}/email-api/manage/resource/${name}`,metadata).pipe(
    catchError(e => {
      return throwError(e);
    })
  )
}


getEmail(name:string): Observable<any> {

return this._http.get<any[]>(`${environment.apiConfig.apiUrl}/email-api/manage/resource/`+name).pipe(
  catchError(e => {
    return throwError(e);
  })
)
}


 /**  BATCH SERVICES **/



  

 sendBatch(message:any, id:string): Observable<any> {
  return this._http.post<any[]>(`${environment.apiConfig.apiUrl}/batch-api/manage/batch/${id}`,message).pipe(
    catchError(e => {
      return throwError(e);
    })
  )
}

saveBatch(metadata:any, name:string): Observable<any> {
return this._http.put<any[]>(`${environment.apiConfig.apiUrl}/batch-api/manage/resource/${name}`,metadata).pipe(
  catchError(e => {
    return throwError(e);
  })
)
}


getBatch(name:string): Observable<any> {

return this._http.get<any[]>(`${environment.apiConfig.apiUrl}/batch-api/manage/resource/`+name).pipe(
catchError(e => {
  return throwError(e);
})
)
}


  /**
   * Manejo de errores en los servicios.
   * @param {HttpErrorResponse} error.
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Se produjo un error en el lado del cliente o en la red.
      console.error('error ', error.error.message);
    } else {
      // El servidor devolvió un código de respuesta fallido.
      console.error(
        'error ' + `(${error.status}) ${error.message}`
      );
    }
    // Mensaje generico para el usuario
    return throwError('error ');
  }

  

}
