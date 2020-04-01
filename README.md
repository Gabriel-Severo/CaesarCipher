# CaesarCipher
Este projeto foi desenvolvido como solução para o desafio da [AceleraDev](https://www.codenation.dev/aceleradev/react-online-1/challenge/dev-ps).
## Desafio
O desafio consistia em obter uma String codificada com a cifra de cesar através de uma requisição à api da AceleraDev, então, deveria ser desenvolvida uma aplicação para decifrar essa cifra e codificar logo em seguida em sha1. Com a Cifra decodificada e com o sha1 deveria ser criada um arquivo chamado answer.json com todos os dados obtidos na requisição a api e adicionar também a cifra decifrada e o sha1.
Com o arquivo criado, o mesmo deveria ser enviado por método post a uma outra api que responderia com a taxa de acerto.

# Tecnologia/Framework utilizados
- Javascript
- Node >= 12.16.1

# Instalação das dependências
```
yarn
```
# Configuração
Crie um arquivo chamado `.env`, e dentro desse arquivo adicione a seguinte linha
```
TOKEN=<Seu Token da Codenation>
```
##### Esse token pode ser obtido no seu perfil

# Execução
```node main.js```

# Dificuldades
Para o desenvolvimento do projeto eu tive dificuldade ao enviar o arquivo a api, pois como estava utilizando o axios para o envio, dentro dos headers é necessário informar o boundary do FormData.
Possíveis soluções
A principio eu havia desenvolvido essa primeira solução, porem é possível reduzir a quantidade de parâmetros passados no headers utilizando FormData.getHeaders()
```js
    const form_data = new FormData()
    form_data.append('answer', fs.createReadStream('answer.json'))
    await axios.post(`https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=${process.env.TOKEN}`, form_data, {
        headers: {'content-type': `multipart/form-data; boundary=${form_data.getBoundary()}`}
    }).then(res => {
        console.log(res.data)
    }).catch(err => {
        console.log(err.response.data)
    })
```

Portanto, minha solução ficou dessa forma

```js
    const form_data = new FormData()
    form_data.append('answer', fs.createReadStream('answer.json'))
    await axios.post(`https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=${process.env.TOKEN}`, form_data, {
        headers: form_data.getHeaders()
    }).then(res => {
        console.log(res.data)
    }).catch(err => {
        console.log(err.response.data)
    })
```