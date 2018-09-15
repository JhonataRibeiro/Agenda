import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbAgendaProvider } from '../../providers/db-agenda/db-agenda';

/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
  providers: [DbAgendaProvider]
})
export class CadastroPage {

  public nome:string;
  public telefone:string;
  public nascimento:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public dbAgendaProvider:DbAgendaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  salvar(){
    let contato = {
      _id:this.gerarId().toString(),
      nome:this.nome,
      telefone:this.telefone,
      nascimento:this.nascimento
    }
    this.dbAgendaProvider.adicionar(contato).subscribe(
      data => {
        console.log("contato salvo: ", data);
      },
      err => {
        console.log("erro ao salvar contato: ", err);
      }
    );
  }

  public gerarId():Number{
    return Math.floor(Math.random() * 100000000)
  }

}
