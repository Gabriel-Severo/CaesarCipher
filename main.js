require('dotenv').config()
function resolvCipher(key, value){
    ascii = value.charCodeAt(0)
    if (ascii >= 97 && ascii <= 122){
        ascii -= key
        if (ascii < 97){
            return String.fromCharCode(97 - ascii + 121)
        }else{
            return String.fromCharCode(ascii)
        }
    }else{
        return value
    }
}

const text = 'd oljhlud udsrvd pduurp vdowrx vreuh r fdfkruur fdqvdgr'
let resolved = ''
for (letter of text){
    resolved += resolvCipher(3, letter)
}
console.log(resolved)