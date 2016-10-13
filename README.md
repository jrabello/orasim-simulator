# sgbd-emulator
Oracle SGBD Emulator

## Instalação
Dependências: (Nodejs 6.x.x e Npm 3.x.x)

Digite "npm install" para que o npm faça download de todas as dependencias do projeto, que estão definidas no package.json
```shell
$ npm install
```

Digite "npm run build", para rodar o script de build definido no package.json, desta forma, o WebPack chamará o compilador do tyescript, e criará a transpilação do codebase em typescript para javascript es5 no arquivo app.bundle.js dentro do diretório /dist 
```shell
$ npm run build
```

## Guidelines
Todo o código desenvolvido no projeto deverá estar dentro dos padrões definidos pelo typescript:
https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines

Com as seguintes exceções:
1 - "Do not use "I" as a prefix for interface names."