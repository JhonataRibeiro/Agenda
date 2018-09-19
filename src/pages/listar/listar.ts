import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbAgendaProvider } from '../../providers/db-agenda/db-agenda';

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
        this.listaContatos = [] = data.rows;
        console.log("chamou listar contatos: ", this.listaContatos);
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

  getItems(searchbar) {
    // Reset items back to all of the items

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!q) {
      this.listarConatatos();
      return;
    }

    this.listaContatos = this.listaContatos.filter((v) => {
      if (v.doc.nome && q) {
        if (v.doc.nome.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.listaContatos.length);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListarPage');
  }

}
