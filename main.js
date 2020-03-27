require('dotenv').config()
const axios = require('axios')
const sha1 = require('js-sha1')
const fs = require('fs')
const FormData = require('form-data')
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

async function writeFile(){
    const data = await createJson()
    fs.writeFile('answer.json', JSON.stringify(data), {encoding: 'utf-8', flag: 'w'}, (err) => {
        if(err) throw err
        console.log('Arquivo escrito')
    })
}

async function sendFile(){
    const form_data = new FormData()
    form_data.append('answer', fs.createReadStream('answer.json'))
    await axios.post(`https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=${process.env.TOKEN}`, form_data, {
        headers: form_data.getHeaders()
    }).then(res => {
        console.log(res.data)
    }).catch(err => {
        console.log(err.response.data)
    })
}

writeFile()
sendFile()