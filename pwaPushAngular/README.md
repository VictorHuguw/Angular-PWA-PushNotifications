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

Você deve utilizar uma key para fazer a utilização dos recursos de push no seu projeto,as KEYS se encontram no seguinte endereço

    https://web-push-codelab.glitch.me/

Basta que você clique em REFRESH KEYS e copie a key gerada em PUBLIC KEY utilizaremos ela em nosso projeto. 


## Configurações para o envio de notificações 

Dentro de app.module.ts importe os seguintes componentes que serão utilizados

    import {SwPush,SwUpdate} from '@angular/service-worker';**

Em class AppModule é onde configuramos toda a parte principal para o envio das notificações.No arquivo app.module.ts na classe AppModule armazene em uma variável a KEY copiada anteriormente.

    VAPID_PUBLIC_KEY = 'SUA_KEY';

Dentro do construtor precisamos injetar as depêndencias pushSW e SwUpdate para fazer a utilização dos recursos de push no nosso projeto.Agora criaremos uma função que retorna um observable responsável por fazer a verificação da atualização atual,se houver uma atualização disponível,uma mensagem será disparada sugerindo a atualização,logo em seguida criamos também uma função responsável por fazer a configuração do observable para tratar as mensagens que serão recebidas.
	
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

Fora do constructor,mas ainda dentro de app.module.ts criamos uma função que retorna um observable responsável por fazer a requisição para a inscrição do push utilizando a KEY citada anteriormente . Inicialmente verificamos se a requisição do push ocorreu com sucesso,então imprimimos no log os dados da assinatura do serviço,caso haja algum erro, uma mensagem será mostrada ao usuário com a descrição do problema.


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

OBS: Para testarmos a aplicação com os services workers configurados junto ao angular, temos que ter uma versão de produção configurada e funcionando,para adicionarmos uma versão de produção temos que executar os comandos listados a baixo.


Gerando uma versão de produção

    $ ng build --prod

Instale um servidor HTTP para rodar o projeto
   
    $ npm install http-serve -g 

No diretório raiz do projeto execute:
	
    $ http-server dist\pwaPushAngular



Feito isso uma KEY será gerada no console após você executar o projeto, basta que você copie essa key entre em https://web-push-codelab.glitch.me/ e cole a key em subscribe to send to. Apos isso configure o texto da mensagem em text to send,e por fim para enviar a mensagem clique em send push message volte para o seu projeto e voce vera a notificaçao na tela.


Para melhor visualização,sugerimos que copie e cole o seguinte código no campo de mensagem e envie.

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




https://blog.angular-university.io/angular-push-notifications/
