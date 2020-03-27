require('dotenv').config()
const axios = require('axios')
const sha1 = require('js-sha1')
function resolvCipher(key, value){
    ascii = value.charCodeAt(0)
    if (ascii >= 97 && ascii <= 122){
        ascii -= key
        if (ascii < 97){
            return String.fromCharCode(122 - (96 - ascii))
        }else{
            return String.fromCharCode(ascii)
        }
    }else{
        return value
    }
}

async function createJson(){
    const response = await axios.get(`https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=${process.env.TOKEN}`)
    .catch(err => {
        console.log(err)
    })
    const json = response.data
    let resolved = ''
    for (letter of json.cifrado){
        resolved += resolvCipher(json.numero_casas, letter)
    }
    json.decifrado = resolved
    json.resumo_criptografico = sha1(resolved)
    return json
}

async function test(){
    console.log(await createJson())
}

test()