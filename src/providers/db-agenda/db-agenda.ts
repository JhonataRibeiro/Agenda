import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import {Observable} from 'rxjs/Rx'

/*
  Generated class for the DbAgendaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbAgendaProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DbAgendaProvider Provider');
    this.localDb = new PouchDB('agenda.db')
  }

  public db: any;
  public localDb;


  adicionar(contato: any) {
    return Observable.from(this.localDb.put(contato, function (err, response) {
      if (err) { return console.log(err); }
    }));
  }

  public listar(): Observable<any> {
    return Observable.from(this.localDb.allDocs({
      include_docs: true
    }))
  }

  public removeContato(contato): Observable<any> {
    return Observable.from(this.db.remove(contato))
  }


}
