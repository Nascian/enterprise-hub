import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {

  constructor() { }


  static generateRandomString(length: number): string {
    if(length > 2){
      length--;
     }
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz0123456789";
    let result = '';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
}

static generateRandomInteger(numDigits: number): number {
   if(numDigits > 2){
    numDigits--;
   }
    const min = Math.pow(10, numDigits - 1);
    const max = Math.pow(10, numDigits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

static generateRandomDate(): string {
    const year = Math.floor(Math.random() * 50) + 1970; // Random year between 1970 and 2019
    const month = Math.floor(Math.random() * 12) + 1;   // Random month between 1 and 12
    const day = Math.floor(Math.random() * 28) + 1;     // Random day between 1 and 28
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}

static generateRandomInterval(): string {
    return "1 year"; // Placeholder for generating interval values
}


}
