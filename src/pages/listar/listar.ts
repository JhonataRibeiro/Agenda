import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbAgendaProvider } from '../../providers/db-agenda/db-agenda';
import * as jsPDF from 'jspdf'

/**
 * Generated class for the ListarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listar',
  templateUrl: 'listar.html',
  providers: [DbAgendaProvider]
})
export class ListarPage {

  public listaContatos: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dbAgendaProvider: DbAgendaProvider) {
    this.listarConatatos();
  }

  listarConatatos() {
    this.dbAgendaProvider.listar().subscribe(
      data => {
        this.listaContatos = [] = data;
        console.log("listar=> ", this.listaContatos);
      }, err => {
        console.log("error", err)
      }
    )
  }

  deletarConatato(contato) {
    this.dbAgendaProvider.removeContato(contato).subscribe(
      data => {
        this.listarConatatos();
      }, err => {
        console.log("error", err)
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListarPage');
  }

  pesquisar(searchbar) {
    let termo = searchbar.srcElement.value;
    if (termo == '') {
      this.listarConatatos();
      return;
    }
    this.dbAgendaProvider.pesquisar(termo).subscribe(
      data => {
        this.listaContatos = [] = data;
        console.log("pesquisar=> ", this.listaContatos);
      }, err => {
        console.log("error", err)
      }
    )
  }

  imprimirPdf(contato) {
    var doc = new jsPDF()
    doc.text('Nome:' + contato.nome,10,10);
    doc.text('Nascimento:' + contato.nascimento,10,20);
    doc.text('Telefone:' + contato.telefone,10,30);
    doc.save('contato.pdf')
  }


}
