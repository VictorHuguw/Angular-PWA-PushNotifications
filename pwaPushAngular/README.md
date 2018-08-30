# PwaPushAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.0-rc.0.

## Instalação e configuração

1.Instale a versão mais recente do angular  
	    $ npm install --global @angular/cli@next
      
2.Crie um novo projeto em angular
	    $ ng new angularPushNotification
      
3.Entre na pasta do projeto criado
	    $ cd angularPushNotification
      
4. Instale os servicesWorkers pré configurados
	    $ ng add @angular/pwa@next --project=angularPushNotification

## VAPID_PUBLIC_KEY

https://web-push-codelab.glitch.me/

## Build

Obs: Para testarmos  a aplicação com os services worker configurados junto ao angular, temos que ter uma versão de produção configurada e funcionando.

##Para fazer o build da aplicação é necessário que executemos o seguinte comando
	
	$ ng build --prod

##Dentro de dist execute o seguinte comando para rodar a aplicação.

	$ http-server dist\pwaPushAngular

