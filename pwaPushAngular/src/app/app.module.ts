import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ServiceWorkerModule, SwPush, SwUpdate } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { Subscriber } from '../../node_modules/rxjs';
import { Message } from '../../node_modules/@angular/compiler/src/i18n/i18n_ast';

@NgModule({

  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { 
  //A VAPID_PUBLIC_KEY é uma chave pública que é pelo servidor e pode ser utilizada em Push notifications para fazer o uso desses eventos 
  //Como o uso da VAPID_PUBLIC_KEY não é necessário fazer outras configuração como nomeProjeto,kEY...
  VAPID_PUBLIC_KEY = 'BN3OkuR8xf-ElA6xVKCQ9L-OjTtmNyuNoA8BHA1vvbf-Fr9Oo6dZNy-7-uAFYwL_CpooTahJk79v2u9CEZZFer4';
  //No constructor injetamos as dependencias que utilizaremos no nosso projeto 
  constructor(private pushSw:SwPush, private update:SwUpdate){
    //Para verificar se o navegador possui acesso ao serviceWorker   
    update.available.subscribe(update =>{
        console.log("Nova versão disponível");
        // To Do: Notificar ao usuário que é necessario fazer uma atualização da aplicação 
      });
      //Responsável por tratar as mensagens que serão apresentadas no nosso projeto
      //quando fizermos o test
      this.SubscribeToPush();
      pushSw.messages.subscribe(msg =>{
        console.log(JSON.stringify(msg));
      })
    }
  
    //Função resposável para fazer a requisição de incrição para os push,utilizando a KEY citada acima
    SubscribeToPush(){
      this.pushSw.requestSubscription({
        serverPublicKey:this.VAPID_PUBLIC_KEY
      })
      //Se a requisição ocorrer sem erros,o push é inscrito
      .then(pushSubscription => {
        console.log(JSON.stringify(pushSubscription));
      })

      //Se ocorrer algum erro na inscrição do push,será retornada uma mensagem de erro para o usuário
      // e o mesmo poderá tratar os erros 
      .catch(err =>{
        console.error("Ocorreu um erro:"+ err);
      })
    }
  }

  //corrigir erros de alertas de push notiicação