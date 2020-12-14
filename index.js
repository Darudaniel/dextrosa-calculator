const FM_IDEAL = 9
const MINUTOS_DIA = 1440

const mgDextrosaAl5 = 5000
const mgDextrosaAl10 = 10000
const mgDextrosaAl30 = 30000
const mgDextrosaAl50 = 50000
const cien = 100

const botonCalcular =  document.getElementById('botonCalcular')

let dextrosaSeleccionada
let dextrosaSeleccionadaEnCc
let dextrosaNecesaria
let resultadoResta
let natrolEnCc
let meqNatrol
let katrolEnCC
let electrolitosMostrados

const initializer = () => {
  botonCalcular.onclick = () => {
    let peso = document.getElementById("peso").value
    dextrosaNecesaria = FM_IDEAL * MINUTOS_DIA * peso
    let cantidadDextrosaAl5Porciento = (dextrosaNecesaria * cien) / mgDextrosaAl5
    let cantidadDextrosaAl10Porciento = (dextrosaNecesaria * cien) / mgDextrosaAl10
    let cantidadDextrosaAl30Porciento = (dextrosaNecesaria * cien) / mgDextrosaAl30
    let cantidadDextrosaAl50Porciento = (dextrosaNecesaria * cien) / mgDextrosaAl50
    
    let diasDeNacido = document.getElementById("dias").value
    
    let cantidadDeLiquidos = (dias) => {
      // let diasArgument = dias
      switch(parseInt(dias)) {
        case 1:
          return peso * 70      
          break
        case 2:
          return peso * 80
          break
        case 3:
          return peso * 100
          break
        case 4:
          return peso * 125
          break
        case 5:
          return peso * 140
          break
        default:
          console.log('el campo esta vacio')
          break
      }    
    }

    const objetivo5 = document.getElementById('resultado5')
    objetivo5.innerHTML = `-Dextrosa al 5 en cc :---${cantidadDextrosaAl5Porciento} CC`
    const objetivo10 = document.getElementById('resultado10')
    objetivo10.innerHTML = `-Dextrosa al 10 en cc :---${cantidadDextrosaAl10Porciento} CC`
    const objetivo30 = document.getElementById('resultado30')
    objetivo30.innerHTML = `-Dextrosa al 30 en cc :---${cantidadDextrosaAl30Porciento} CC`
    const objetivo50 = document.getElementById('resultado50')
    objetivo50.innerHTML = `-Dextrosa al 50 en cc :---${cantidadDextrosaAl50Porciento} CC`

    
    
    let seleccionarDextrosa = (dex) => {
      if(dex > cantidadDextrosaAl5Porciento) {
        dextrosaSeleccionada = "Dextrosa al 5%"
        dextrosaSeleccionadaEnCc = cantidadDextrosaAl5Porciento
      } else if(dex > cantidadDextrosaAl10Porciento) {
        dextrosaSeleccionada = "Dextrosa al 10%"
        dextrosaSeleccionadaEnCc = cantidadDextrosaAl10Porciento
      } else if(dex > cantidadDextrosaAl30Porciento) {
        dextrosaSeleccionada = "Dextrosa al 30%"
        dextrosaSeleccionadaEnCc = cantidadDextrosaAl30Porciento
      } else if(dex > cantidadDextrosaAl50Porciento) {
        dextrosaSeleccionada = "Dextrosa al 50%"
        dextrosaSeleccionadaEnCc = cantidadDextrosaAl50Porciento
      } else {
        console.log('no se pudo seleccionar una dextrosa')
      }
    }

    seleccionarDextrosa(cantidadDeLiquidos(diasDeNacido))

    const objetivoLiquidos = document.getElementById('liquidosNecesarios')
    // objetivoLiquidos.innerHTML = `-Administrar ${cantidadDeLiquidos(diasDeNacido)} CC de liquidos en total.<br>De los cuales ${dextrosaSeleccionadaEnCc} CC deben ser de ${dextrosaSeleccionada}`
    const restar = () => {
      resultadoResta = cantidadDeLiquidos(diasDeNacido) - dextrosaSeleccionadaEnCc
    }
    restar()
    objetivoLiquidos.innerHTML = `-Administrar ${dextrosaSeleccionadaEnCc} CC de ${dextrosaSeleccionada}<br> y agregar ${resultadoResta.toFixed(1)} CC de solucion salina.`

    // const objetivoDextrosaAdecuada = document.getElementById('dextrosaAdecuada')
    // objetivoDextrosaAdecuada.innerHTML = `-Debes usar ${dextrosaSeleccionada}` 

    let porcentajeDeDextrosa = ((dextrosaNecesaria / 1000) * cien) / cantidadDeLiquidos(diasDeNacido)

    const objetivoConcentracion = document.getElementById('concentracion')
    objetivoConcentracion.innerHTML = `(La solución tendra una concentracion de ${porcentajeDeDextrosa.toFixed(1)}% dextrosa)`


    const validarElectrolitos = () => {
      if(parseFloat(diasDeNacido) >= 3) {
        meqNatrol = peso * 3
        natrolEnCc = (meqNatrol * 10) / 20
        katrolEnCC = natrolEnCc / 2
      } else if(parseFloat(diasDeNacido) >= 2){
        meqNatrol = peso * 3
        natrolEnCc = (meqNatrol * 10) / 20
      } else {
        console.log('no se deben agregar electrolitos')
      }
    }
    validarElectrolitos()
    const mostrarElectrolitos = () => {
      if(parseFloat(diasDeNacido) >= 3) {
        electrolitosMostrados = `-Agregar ${natrolEnCc} CC de Natrol <br> y ${katrolEnCC} CC de Katrol`
      } else if(parseFloat(diasDeNacido) >= 2) {
        electrolitosMostrados = `-Agregar ${natrolEnCc} CC de Natrol`
      } else {
        console.log('error')
      }
    }
    mostrarElectrolitos()

    const objetivoElectrolitos = document.getElementById('electrolitos')
    // objetivoElectrolitos.innerHTML = `Agregar ${natrolEnCc} cc de natrol y ${katrolEnCC} cc de katrol`
    objetivoElectrolitos.innerHTML = electrolitosMostrados
    
    let usoCateter
    let validacionCateter = () => {
      if(porcentajeDeDextrosa > 12.5) {
        usoCateter = "Debido a la concentracion debe utilizarse cateter central"
      } else {
        usoCateter = "-No necesita cateter central"
      }
    }
    validacionCateter()
    const objetivoCateter = document.getElementById('cateterCentral')
    objetivoCateter.innerHTML = usoCateter
  }  
}

initializer()


