'use strict'

function makeId(length=6){
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var txt = ''
    for(var i=0 ; i < length ; i++){
        txt += possible.charAt(Math.floor(Math.random()* possible.length))
    }
    return txt
}
function makeLorem(wordCount=100){
    const words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned']
    var txt = ''
    while (wordCount > 0){
        wordCount--
        txt += words[Math.floor(Math.random()* words.length)] + ' '
    }
    return txt
}
function getRandomIntInclusive(min,max){
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random()* (max -min + 1)) + min
}