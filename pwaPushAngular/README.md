# PwaPushAngular

Angular CLI: 6.2.0-rc.0

Node: 8.11.3

OS: win32 x64

Angular:


Package                      |Version
-----------------------------|-------------------------
@angular-devkit/architect    |0.8.0-rc.0
@angular-devkit/core         |0.8.0-rc.0
@angular-devkit/schematics   |0.8.0-rc.0
@schematics/angular          |0.8.0-rc.0
@schematics/update           |0.8.0-rc.0
rxjs                         |6.2.2
typescript                   |2.9.2


---

Web push notifications com angular 
Você provavelmente lida com várias notificações por push em seu celular. São aqueles alertas que aparecem quando alguém envia uma mensagem no WhatsApp ou o seu canal preferido publica um novo vídeo no YouTube. Você sabia que é possível instalar um recurso como esse em seu site ou aplicativo PWA?


# Instalação e configuração


## Instale a versão mais recente do angular

$ npm install --global @angular/cli@next
Criando um novo projeto 

$ ng new nomedoprojeto
Entre na pasta do projeto criado

$ cd nomedoprojeto
Adicionando os services-workers ao projeto

$ ng add @angular/pwa@next --project=nomedoprojeto


## VAPID_PUBLIC_KEY e configuração da mensagem que será enviada.


Você deve utilizar uma key para fazer a utilização dos recursos de push no seu projeto, as keys podem ser obtidas no seguinte endereço.
https://web-push-codelab.glitch.me/
Basta que você clique em refresh keys e copie a key gerada em public key será essa key que utilizaremos em nosso projeto.


## Configurações para o envio de notificações


Dentro de app.module.ts importe as seguintes dependências que serão utilizados no projeto.
import {SwPush,SwUpdate} from '@angular/service-worker';
Na classe AppModule é onde configuramos toda a parte principal para o envio das notificações. No arquivo app.module.ts dentro da classe AppModule crie uma variável para armazenar a key copiada anteriormente.
VAPID_PUBLIC_KEY = 'SUA_KEY';
Dentro do construtor precisamos injetar as dependências pushSW e SwUpdate para fazer a utilização dos recursos de push no nosso projeto. Agora criaremos uma função que será responsável por fazer a verificação de atualização do sistema, se houver uma atualização disponível,uma mensagem será exibida no console, logo em seguida criamos também uma função responsável por tratar as mensagens.
constructor(private pushSw:SwPush,private update:SwUpdate)
export class AppModule { 
    VAPID_PUBLIC_KEY = 'SUA_KEY';
 
  constructor(private pushSw:SwPush,private update:SwUpdate){
    update.available.subscribe(update =>{
        console.log("Nova versão disponível");
      });
    
   this.SubscribeToPush();
      pushSw.messages.subscribe(msg =>{
        console.log(JSON.stringify(msg));
    })
 }
Fora do construtor, mas ainda dentro de app.module.ts criaremos uma função que fará a requisição para a inscrição do push notification utilizando a KEY copiada anteriormente. Inicialmente verificamos se a requisição do push ocorreu com sucesso, então imprimimos no console os dados da assinatura do serviço, caso haja algum erro, uma mensagem de erro será exibida no console.
SubscribeToPush(){
    this.pushSw.requestSubscription({
      serverPublicKey:this.VAPID_PUBLIC_KEY
    })
  .then(pushSubscription => {
    console.log(JSON.stringify(pushSubscription));
  })
  
  .catch(err =>{
    console.error("Ocorreu um erro:"+ err);
  })
}}


## Rodando e testando a aplicação


OBS: Para testarmos a aplicação com os services workers configurados junto ao angular, temos que ter uma versão de produção configurada e funcionando, para adicionarmos uma versão de produção devemos seguir alguns passos mostrados logo abaixo.
Gerando uma versão de produção

$ ng build --prod
Instale um servidor HTTP para rodar o projeto

$ npm install -g http-serve
No diretório raiz do projeto execute

$ http-server dist\nomedoprojeto
Feito isso uma key será gerada no console após você executar o projeto, basta que você copie essa key entre em https://web-push-codelab.glitch.me/ e cole em subscribe to send to. Após isso configure o texto da mensagem em text to send, e por fim para enviar a mensagem clique em send push message volte para o seu projeto e veja a notificação aparecendo na tela.
Para melhor visualização da notificação, é sugerido que copie e cole a seguinte estrutura no campo de mensagem e envie.
{ 
    "notification": { 
        "title": "PWA-PUSH-ANGULAR", 
        "body": "Uma nova notificação chegou!!", 
        "vibrate": [100, 50, 100], 
        "data": { 
            "dateOfArrival": "2018-08-31",
            "primaryKey": 1 
        }, 
        "actions": [{ 
            "action": "explore", 
            "title": "Go to the site" 
        }] 
    }
}
