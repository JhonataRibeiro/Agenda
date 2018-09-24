import { Component, NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbAgendaProvider } from '../../providers/db-agenda/db-agenda';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  providers: [DbAgendaProvider, Camera]
})
export class CadastroPage {

  public nome:string;
  public telefone:string;
  public nascimento:string;
  public foto:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public dbAgendaProvider:DbAgendaProvider,
    private camera: Camera,
    private zone: NgZone) {
      this.adicionarFotoPadrao();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  // salvar(){
  //   let contato = {
  //     _id:this.gerarId().toString(),
  //     nome:this.nome,
  //     telefone:this.telefone,
  //     nascimento:this.nascimento,
  //     foto:this.foto
  //   }
  //   this.dbAgendaProvider.adicionar(contato).subscribe(
  //     data => {
  //       console.log("contato salvo: ", data);
  //     },
  //     err => {
  //       console.log("erro ao salvar contato: ", err);
  //     }
  //   );
  // }

  salvar(){
    let contato = {
      nome:this.nome,
      telefone:this.telefone,
      nascimento:this.nascimento,
      foto:this.foto
    }
    this.dbAgendaProvider.adicionarContato(contato).subscribe(
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

  public cadastrarFoto(){
    console.log("cadastrar foto");
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.foto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
     this.adicionarFotoPadrao();
    });
  }

  public adicionarFotoPadrao(){
    this.zone.run(()=>{
      this.foto = "https://www.clker.com/cliparts/4/e/9/1/1352230789343623747Blank%20Avatar.svg.med.png";
    });
  }

}
