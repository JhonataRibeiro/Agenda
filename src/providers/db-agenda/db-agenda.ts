import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import { Observable } from 'rxjs/Rx'

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

  // adicionar(contato: any) {
  //   return this.http.post('http://192.168.0.124/servico-agenda/inserir.php',contato)
  //     .map(res => {
  //       console.log(res);
  //     })
  // }

  // public listar(): Observable<any> {
  //   return Observable.from(this.localDb.allDocs({
  //     include_docs: true
  //   }))
  // }

  public listar(): Observable<any> {
    // let headers = {
    //   headers: new HttpHeaders({
    //     'Access-Control-Allow-Origin': '*'
    //     , 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    //     'Accept': 'application/json',
    //     'content-type': 'application/json'
    //   })
    // };

    return this.http.get('http://localhost/servico-agenda/listar.php')
      .map(res => {
        console.log(res);
        return res;
      })
  }



  // public removeContato(contato): Observable<any> {
  //   console.log("removendo: ", contato.doc._id)
  //   return Observable.from(this.localDb.remove(contato.doc._id, contato.doc._rev))
  // }

  public removeContato(contato): Observable<any> {
    // console.log("removendo: ", contato.doc._id)
    // return Observable.from(this.localDb.remove(contato.doc._id, contato.doc._rev))
    return this.http.get(`http://localhost/servico-agenda/deletar.php?id=${contato.id}`)
      .map(res => {
        console.log(res);
        return res;
      })
  }

  public handleError() {
    console.log("msg");
  }

  public adicionarContato(contato:any): Observable<any>{
    let headers = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Accept': 'application/json',
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post("/agenda/inserir.php",contato,headers)
      .map(res => {
        console.log(res);
        return res;
      })
  }

  public pesquisar(termo): Observable<any> {
    console.log("termo", termo);
    return this.http.get(`http://localhost/servico-agenda/pesquisar.php?termo=${termo}`)
      .map(res => {
        console.log(res);
        return res;
      })
  }


}
