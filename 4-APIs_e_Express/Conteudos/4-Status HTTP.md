# Extra: Status HTTP!

# Os status HTTP

Como já vimos ~~há 3000 anos~~ em módulos anteriores, o ***status*** é um **código numérico** que **resume o resultado** de uma requisição.

![](https://labenu.notion.site/image/https%3A%2F%2Fmedia.tenor.com%2F0FJbp1RGsF0AAAAC%2Felrond-lotr.gif?id=d7ec8efb-cb03-4089-9354-34961498f81f&table=block&spaceId=f97190af-c9c2-4592-9ae2-6311b6b728de&userId=&cache=v2)
"Eu estava lá, Gandalf. Eu estava lá há 3000 anos..."

Os status se dividem entre 5 tipos, de acordo com o dígito inicial deles:
![](https://warcontent.com/wp-content/uploads/2022/01/status-code-http-4-1024x576.webp)
Status 100 são informativos, 200 são de confirmação, 300 são de redirecionamento, 400 são de erro do cliente (frontend cometeu algum erro na requisição), e 500 são erros de servidor (erros do backend)

**ATENÇÃO! O código (status code) é apenas um aviso ao cliente que fez a requisição, ou seja, puramente semântico e sem nenhum impacto na funcionalidade.**

**Existe um grande debate na comunidade acerca dos casos de uso de cada status code, e por isso não existe um perfeito para cada situação, cabe à equipe escolher o código de resposta e manter o padrão ao longo do projeto.**

Os códigos de status que utilizaremos com mais frequência serão os seguintes:

### 200 - Ok

status genérico de sucesso

### 201 - Created

status de criação de item de entidade

### 400 - Bad Request

status genérico de requisição inválida: método ou caminho inválidos, JSON inválido…

### 401 - Unauthorized

credenciais ausentes ou inválidas

### 403 - Forbidden

usuário não tem as permissões necessárias

### 404 - Not Found

rota ou recurso não encontrado

### 409 - Conflict

tentativa de criar um registro já existente

### 422 - Unprocessable Entity

requisição válida que possui tudo para ser processada (não falta nada e todos os dados estão no formato correto), porém se torna inválida devido à outras questões: parâmetros com termos pejorativos, senha com muitos caracteres repetidos, etc.

### 500 - Internal Server Error

status genérico de erro do servidor e não do cliente

Você **não precisa** saber todos os status de cabeça, e aqui na Labenu nós recomendamos os sites abaixo para faciltar a lembrança com a ajuda de lindos pets:
**ATENÇÃO! O código (status code) é apenas um aviso ao cliente que fez a requisição, ou seja, puramente semântico e sem nenhum impacto na funcionalidade.**

**Existe um grande debate na comunidade acerca dos casos de uso de cada status code, e por isso não existe um perfeito para cada situação, cabe à equipe escolher o código de resposta e manter o padrão ao longo do projeto.**

Os códigos de status que utilizaremos com mais frequência serão os seguintes:

### 200 - Ok

status genérico de sucesso

### 201 - Created

status de criação de item de entidade

### 400 - Bad Request

status genérico de requisição inválida: método ou caminho inválidos, JSON inválido…

### 401 - Unauthorized

credenciais ausentes ou inválidas

### 403 - Forbidden

usuário não tem as permissões necessárias

### 404 - Not Found

rota ou recurso não encontrado

### 409 - Conflict

tentativa de criar um registro já existente

### 422 - Unprocessable Entity

requisição válida que possui tudo para ser processada (não falta nada e todos os dados estão no formato correto), porém se torna inválida devido à outras questões: parâmetros com termos pejorativos, senha com muitos caracteres repetidos, etc.

### 500 - Internal Server Error

status genérico de erro do servidor e não do cliente

Você **não precisa** saber todos os status de cabeça, e aqui na Labenu nós recomendamos os sites abaixo para faciltar a lembrança com a ajuda de lindos pets:

# Http Cats - status informados por gatinhos - [Acesse o site.](https://http.cat/)

# Http Dogs - status informados por doguinhos - [Acesse o site.](https://http.dog/)