# Typescript com strict

# tsconfig.json

Para ativar o modo strict no typescript é só **adicionar a flag** e atribuir **true** para ela. No exemplo abaixo temos a ativação na última linha do arquivo.

```Typescript
{
    "compilerOptions": {
        "target": "ES6", /* Specify ECMAScript target version */
        "module": "commonjs", /* Specify module code generation */
        "sourceMap": true, /* Generates corresponding '.map' file. */
        "outDir": "./build", /* Redirect output structure to the directory. */
        "rootDir": "./src", /* Specify the root directory of input files. */
        "removeComments": true, /* Do not emit comments to output. */
        "noImplicitAny": true, /* Raise error on declarations with an implied 'any' type. */
        "noEmitOnError": true, /* Disable emitting files if any type checking errors are reported. */
        "esModuleInterop": true,
        "strict": true
    }
}
```

# O que faz a flag strict?

Ela ativa uma família de flags cujo objetivo é forçar a pessoa dev a garantir a tipagem dos dados com maior precisão. 

Saber como aplicar validações é um pré-requisito para o uso dessa flag, pois as tipagens são mais intensas, e é por isso que só falamos dela a partir de hoje.

# O que muda na prática

Não vamos sentir tanto impacto no desenvolvimento porque nosso projeto já iniciou como typescript. Só precisaremos tipar mais e teremos um maior nível de intelliSense no VSCode para isso.

Agora falando de Express, teremos o primeiro contato com um tipo chamado **unknown**.

## type unknown

Quando **recebemos um erro no catch** dentro do Express o parâmetro ‘**error**’ chega como **any** sem a flag strict. Assim que ativamos o **strict** percebemos que o ‘**error**’ chega como **unknown**.

**Com strict desativado:**

![](https://labenu.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ff9268502-eb7c-496a-876e-5edd12b0553a%2FUntitled.png?id=4928324d-c235-4465-8275-0c8163c1e7f9&table=block&spaceId=f97190af-c9c2-4592-9ae2-6311b6b728de&width=1400&userId=&cache=v2)

Com strict ativado:
![](https://labenu.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fc1b2d336-f34c-4f71-aa19-2a31b7a5ebbd%2FUntitled.png?id=f453c8f2-bd8a-4428-af0c-562ab5ee91ca&table=block&spaceId=f97190af-c9c2-4592-9ae2-6311b6b728de&width=1410&userId=&cache=v2)

Também percebemos que com a flag ativada temos um erro no código. Isso acontece porque o tipo **unknown equivale a um any**, mas para utilizar o dado é necessário antes garantir sua estrutura.

Na linha do erro estamos acessando o **error** como se ele fosse um **objeto que possui a propriedade message**. Porém, nada garante que ele realmente seja isso além das boas práticas: devemos disparar somente **instâncias de Error** (**new Error()**).

```Typescript
throw new Error() // boa prática
throw "Bad Request" // funciona, mas não é boa prática
throw 400 // funciona, mas não é boa prática
```

Solução:
```Typescript 
} catch (error) {
    console.log(error)

    if (res.statusCode === 200) {
        res.status(500)
    }

		// adicionamos um fluxo de validação do parâmetro 'error'
    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
}
```

A palavra-chave **instanceof** fará mais sentido depois de estudarmos Programação Orientada a Objetos (**POO**). Por enquanto entenda que estamos garantindo que só é acessada a propriedade message (**error.message**) quando o que foi **disparado no throw** seja um **new Error()**.

### Explicação em vídeo
[Typescript-strict](https://drive.google.com/file/d/1fL2Qt4yBsKD7hLyCeHLHEdedhkaYR88p/view)

