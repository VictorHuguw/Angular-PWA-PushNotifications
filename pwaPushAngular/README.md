# PwaPushAngular

     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / ? \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \ _\ _| |_|\ __, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/

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


## Instalação e configuração

1 Instale a versão mais recente do angular  

	$ npm install --global @angular/cli@next

2 Crie um novo projeto em angular

	$ ng new angularPushNotification

3 Entre na pasta do projeto criado

	$ cd angularPushNotification

4 Adicione os servicesWorker pré configurados ao projeto

	$ ng add @angular/pwa@next --project=angularPushNotification



## VAPID_PUBLIC_KEY e configuração da mensagem que será enviada 

Você deve utilizar uma key para utilizar os recursos de push no seu projeto,as KEYS se encontram no seguinte endereço

https://web-push-codelab.glitch.me/

Basta que você clique em REFRESH KEYS copie a key gerada em PUBLIC KEY e cole em uma variável chamada PUBLIC_VAPID_KEY 



## Tutorial

Dentro de app.module.ts importe os seguintes endereços 

	import {SwPush,SwUpdate} from '@angular/service-worker';

Feito isso,dentro da class AppModule é onde configuramos toda a parte principal para as configurações
dos pushs,em app.module.ts na classe AppModule armazene a Key copiada anteriormente e cole e uma variável chamada VAPID_PUBLIC_KEY

	VAPID_PUBLIC_KEY = 'BN3OkuR8xf-ElA6xVKCQ9L-OjTtmNyuNoA8BHA1vvbf-Fr9Oo6dZNy-7-uAFYwL_CpooTahJk79v2u9CEZZFer4';	

Dentro do construtor precisamos injetar as depêndencias para fazer a utilização dos recursos de push no nosso projeto
	
	constructor(private pushSw:SwPush,private update:SwUpdate)

	export class AppModule { 

	  VAPID_PUBLIC_KEY = 'BN3OkuR8xf-ElA6xVKCQ9L-OjTtmNyuNoA8BHA1vvbf-Fr9Oo6dZNy-7-uAFYwL_CpooTahJk79v2u9CEZZFer4';
	  
	  constructor(private pushSw:SwPush,private update:SwUpdate){
	  
	    update.available.subscribe(update =>{
	        console.log("Nova versão disponível");
	  
	      });
	  
	      this.SubscribeToPush();
	      pushSw.messages.subscribe(msg =>{
	        console.log(JSON.stringify(msg));
	      })
	    }

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
    }
  }	

## Rodando e testando a aplicação

OBS: Para testarmos a aplicação com os services worker configurados junto ao angular, temos que ter uma versão de produção configurada e funcionando,para adicionarmos uma versão de produção temos que executar os comandos listados a baixo.


Gerando uma versão de produção

	$ ng build --prod 

No diretório raiz do projeto execute:
	
	$http-server dist\pwaPushAngular

Com o projeto rondando,agora basta que você entre no seguinte link novamente para escrever algo para aparecer em sua notificação

https://web-push-codelab.glitch.me/




https://blog.angular-university.io/angular-push-notifications/
