import { Injectable } from '@angular/core';

@Injectable()
export class DataserviceService {
   constructor() { }
   applicationName = "Gutenberg Project";
   bookType=["FICTION","DRAMA","HUMOUR","POLITICS","PHILOSOPHY","HISTORY","ADVENTURE"];
   basicServiceUrl="http://skunkworks.ignitesol.com:8000/";
   selectedBookType:any;
}