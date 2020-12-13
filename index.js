const FM_IDEAL = 9
const MINUTOS_DIA = 1440

const mgDextrosaAl5 = 5000
const mgDextrosaAl10 = 10000
const mgDextrosaAl30 = 30000
const mgDextrosaAl50 = 50000
const cien = 100

const peso = parseFloat(prompt("Iingrese peso del niño"))
const dextrosaNecesaria = FM_IDEAL * MINUTOS_DIA * peso

let cantidadDextrosaAl5Porciento = (dextrosaNecesaria * cien) / mgDextrosaAl5
let cantidadDextrosaAl10Porciento = (dextrosaNecesaria * cien) / mgDextrosaAl10
let cantidadDextrosaAl30Porciento = (dextrosaNecesaria * cien) / mgDextrosaAl30
let cantidadDextrosaAl50Porciento = (dextrosaNecesaria * cien) / mgDextrosaAl50

console.log(cantidadDextrosaAl5Porciento)
console.log(cantidadDextrosaAl10Porciento)
console.log(cantidadDextrosaAl30Porciento)
console.log(cantidadDextrosaAl50Porciento)


