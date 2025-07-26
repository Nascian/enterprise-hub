import { Injectable } from '@angular/core';
import { RandomService } from './random-service';

@Injectable({
  providedIn: 'root'
})
export class JsonMapperService {

  constructor() { }

  static mapColumnsToJSON(columnsArray: any[]): any {
    const result = [];
    
    for (const column of columnsArray) {
      result[column.columnName] = JsonMapperService.generateSampleDataByColumnType(column.columnType, column.size);
    }
    console.log(result);
    
    return result;
  }

  static extractId(data: any): any {

    for (const column of data) {
  
      if(column.primaryKey){
        return column.columnName;
      }    
    }

    return null; // Return null or handle the case when id is not present
  }


  static getPrimaryKeyColumnName(tables: any, tableName : string  ): string | undefined {
    const tableInfo = tables.find((table:any) => table.tableName === tableName);

    if (tableInfo) {
      const primaryKeyColumn = tableInfo.columns[tableName].find((column:any) => column.primaryKey);
      
      if (primaryKeyColumn) {
        return primaryKeyColumn.columnName;
      }
    }

    return undefined; // Return undefined if the table or primary key column is not found
  }


  static generateSampleDataByColumnType(columnType: string, size : number): any {
    switch (columnType) {
      case 'bpchar':
        return RandomService.generateRandomString(size);
      case 'varchar':
        return RandomService.generateRandomString(size);;
      case 'int4':
        return RandomService.generateRandomInteger(size);
      case 'date':
        return RandomService.generateRandomDate(); // Sample date in YYYY-MM-DD format
      case 'interval':
        return RandomService.generateRandomInterval(); // Sample interval format
      default:
        return null; // You can return a default value or handle other types as needed
    }
  }

}
