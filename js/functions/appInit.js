//constants
const MINUTOS_DIA = 1440
const MG_DEXTROSA_AL_5 = 5000
const MG_DEXTROSA_AL_10 = 10000
const MG_DEXTROSA_AL_30 = 30000
const MG_DEXTROSA_AL_50 = 50000
const CIEN = 100
//variables
let fmIdeal
let peso
let dextrosaNecesaria
let cantidadDextrosaAl5Porciento
let cantidadDextrosaAl10Porciento
let cantidadDextrosaAl30Porciento
let cantidadDextrosaAl50Porciento
let diasDeNacido
let dextrosaSeleccionada
let dextrosaSeleccionadaEnCc
let ccDiference
let porcentajeDeDextrosa
let natrolEnCc
let meqNatrol
let katrolEnCC
let electrolitosMostrados
let usoCateter
//elements
let hipoglicemiaChecked 

// functions
const cantidadDeLiquidos = (dias) => {
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

function getPatientData() {
  peso = document.getElementById("peso").value
  diasDeNacido = document.getElementById("dias").value
  hipoglicemiaChecked = document.querySelector('input[name="hipoglicemia"]:checked')    
}
function hypoglycemiaValidation() {
  if(hipoglicemiaChecked) {
    fmIdeal = 9
  } else {
    fmIdeal = 4.2
  }
}

function calculateDextroseNeeded() {
  dextrosaNecesaria = fmIdeal * MINUTOS_DIA * peso
}
function calculateCcDextrose() {
  cantidadDextrosaAl5Porciento = (dextrosaNecesaria * CIEN) / MG_DEXTROSA_AL_5
  cantidadDextrosaAl10Porciento = (dextrosaNecesaria * CIEN) / MG_DEXTROSA_AL_10
  cantidadDextrosaAl30Porciento = (dextrosaNecesaria * CIEN) / MG_DEXTROSA_AL_30
  cantidadDextrosaAl50Porciento = (dextrosaNecesaria * CIEN) / MG_DEXTROSA_AL_50
}

function seleccionarDextrosa(dex) {
  if(dex > cantidadDextrosaAl10Porciento) {
    dextrosaSeleccionada = "Dextrosa al 10%"
    dextrosaSeleccionadaEnCc = cantidadDextrosaAl10Porciento
  } else if(dex > cantidadDextrosaAl50Porciento) {
    dextrosaSeleccionada = "Dextrosa al 50%"
    dextrosaSeleccionadaEnCc = cantidadDextrosaAl50Porciento
  } else {
    dextrosaSeleccionada = "Error: No se pudo seleccionar una dextrosa"
    dextrosaSeleccionadaEnCc = "Error: No se pudo seleccionar una dextrosa"
  }
}
function calculateCcDiference() {
  ccDiference = cantidadDeLiquidos(diasDeNacido) - dextrosaSeleccionadaEnCc
}
function finalConcentrationCalculation() {
  porcentajeDeDextrosa = ((dextrosaNecesaria / 1000) * CIEN) / cantidadDeLiquidos(diasDeNacido)
}
function electrolytesCalculation() {
  if(parseFloat(diasDeNacido) >= 3) {
    meqNatrol = peso * 3
    natrolEnCc = (meqNatrol * 10) / 20
    katrolEnCC = natrolEnCc / 2
    electrolitosMostrados = `-Agregar ${natrolEnCc.toFixed(1)} CC de Natrol <br> y ${katrolEnCC.toFixed(1)} CC de Katrol`
  } else if(parseFloat(diasDeNacido) >= 2){
    meqNatrol = peso * 3
    natrolEnCc = (meqNatrol * 10) / 20
    electrolitosMostrados = `-Agregar ${natrolEnCc.toFixed(1)} CC de Natrol`
  } else {
    electrolitosMostrados = `-No se agregan electrolitos`
  }
}
function catheterValidation() {
  if(porcentajeDeDextrosa > 12.5) {
    usoCateter = "Debido a la concentración debe utilizarse catéter central"
  } else {
    usoCateter = "-No necesita catéter central"
  }
}
function showResultsOnScreen() {
  const objetivo5 = document.getElementById('resultado5')
  objetivo5.innerHTML = `-Dextrosa al 5 en cc :---${cantidadDextrosaAl5Porciento.toFixed(1)} CC`
  const objetivo10 = document.getElementById('resultado10')
  objetivo10.innerHTML = `-Dextrosa al 10 en cc :---${cantidadDextrosaAl10Porciento.toFixed(1)} CC`
  const objetivo30 = document.getElementById('resultado30')
  objetivo30.innerHTML = `-Dextrosa al 30 en cc :---${cantidadDextrosaAl30Porciento.toFixed(1)} CC`
  const objetivo50 = document.getElementById('resultado50')
  objetivo50.innerHTML = `-Dextrosa al 50 en cc :---${cantidadDextrosaAl50Porciento.toFixed(1)} CC`
  const objetivoLiquidos = document.getElementById('liquidosNecesarios')
  objetivoLiquidos.innerHTML = `-Administrar ${dextrosaSeleccionadaEnCc.toFixed(1)} CC de ${dextrosaSeleccionada}<br> y agregar ${ccDiference.toFixed(1)} CC de solución salina. <br>En 24 horas.`
  const objetivoConcentracion = document.getElementById('concentracion')
  objetivoConcentracion.innerHTML = `(La solución tendrá una concentración de ${porcentajeDeDextrosa.toFixed(1)}% dextrosa)`
  const objetivoElectrolitos = document.getElementById('electrolitos')    
  objetivoElectrolitos.innerHTML = electrolitosMostrados
  const objetivoCateter = document.getElementById('cateterCentral')
  objetivoCateter.innerHTML = usoCateter
}

function appInit() {
  // get the data of patient
  getPatientData()  
  hypoglycemiaValidation()
  //calculates how much dextrose the patient needs in miligrams
  calculateDextroseNeeded()
  //calulates the amount of dextrosa in CC based on each concentration
  calculateCcDextrose()
  //selects the concentration of dextrose that the patient needs
  seleccionarDextrosa(cantidadDeLiquidos(diasDeNacido))
  //calculates how much saline solution you need to increase to dextrose to meet the requirements
  calculateCcDiference()
  //calculates which is the final concentration of solution    
  finalConcentrationCalculation()
  //validates if the patient needs electrolits and calculate how much needs   
  electrolytesCalculation()
  //catheter use determination 
  catheterValidation()
  //show results on screen
  showResultsOnScreen()
}

export default appInit