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

  public listaContatos:Array<any> = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public dbAgendaProvider:DbAgendaProvider) {
      this.listarConatatos();
  }

  listarConatatos(){
    this.dbAgendaProvider.listar().subscribe(
      data => {
        this.listaContatos = [] = data.rows;
        console.log(this.listaContatos);
      },err=>{
        console.log("error", err)
      }
    )
  }

  deletarConatato(contato){
    this.dbAgendaProvider.removeContato(contato).subscribe(
      data => {
        this.listarConatatos();
      },err=>{
        console.log("error", err)
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListarPage');
  }

}
