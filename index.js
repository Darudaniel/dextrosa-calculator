const FM_IDEAL = 9
const MINUTOS_DIA = 1440

const mgDextrosaAl5 = 5000
const mgDextrosaAl10 = 10000
const mgDextrosaAl30 = 30000
const mgDextrosaAl50 = 50000
const cien = 100

const botonCalcular =  document.getElementById('botonCalcular')

const initializer = () => {
  botonCalcular.onclick = () => {
    let peso = document.getElementById("peso").value
    let dextrosaNecesaria = FM_IDEAL * MINUTOS_DIA * peso
    let cantidadDextrosaAl5Porciento = (dextrosaNecesaria * cien) / mgDextrosaAl5
    let cantidadDextrosaAl10Porciento = (dextrosaNecesaria * cien) / mgDextrosaAl10
    let cantidadDextrosaAl30Porciento = (dextrosaNecesaria * cien) / mgDextrosaAl30
    let cantidadDextrosaAl50Porciento = (dextrosaNecesaria * cien) / mgDextrosaAl50
    

    const objetivo5 = document.getElementById('resultado5')
    objetivo5.innerHTML = `Dextrosa al 5 en cc :----- ${cantidadDextrosaAl5Porciento} CC`
    const objetivo10 = document.getElementById('resultado10')
    objetivo10.innerHTML = `Dextrosa al 10 en cc :----- ${cantidadDextrosaAl10Porciento} CC`
    const objetivo30 = document.getElementById('resultado30')
    objetivo30.innerHTML = `Dextrosa al 30 en cc :----- ${cantidadDextrosaAl30Porciento} CC`
    const objetivo50 = document.getElementById('resultado50')
    objetivo50.innerHTML = `Dextrosa al 50 en cc :----- ${cantidadDextrosaAl50Porciento} CC`
    console.log(cantidadDextrosaAl10Porciento)
  }  
}

initializer()


