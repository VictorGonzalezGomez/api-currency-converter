/**************** variables globales ****************/
const buttonExchange = document.getElementById("buttonExchange");
const containerChanged = document.getElementById("containerChanged");
const chartContainer = document.getElementById("myChart");
let chart = null;
/**************** capturar la moneda requerida y su valor actual desde la API ****************/
async function getCurrency() {
  let clp = document.getElementById("CLP").value;
  let currecyType = document.getElementById("currencyToChange").value;
  const dataChart = [];
  const isValidForm = inputValidation (clp, currecyType);

/**************** validacion del formulario completo ****************/
  if (!isValidForm) {
    return;
  }
  /**************** asignacion del endpoint segun moneda a convertir ****************/
  const API_URL = `https://mindicador.cl/api/` + currecyType;
  
/**************** verificacion del estatus de la respuesta a la API ****************/
  try {
    /**************** operatoria para obtener los datos necesarios parala confeccion e insercion del grafico en el DOM ****************/
    const response = await fetch(`${API_URL}`);
    
/**************** excepcion al al caso de uso de fetch y try catch ****************/
    if (response.status == 200) {
      const data = await response.json();
      let totalExchange = clp / data.serie[0].valor;
      data.serie.slice(0, 10).map((element) => {
        dataChart.push({ x: element.fecha.substring(0, 10), y: element.valor });
      });
      renderTotalChanged(totalExchange);
      setChart(dataChart.reverse());
    } else {
      throw "error";
    }
  } catch (error) {
    console.log(error);
    alert("Error de conexion con el servidor");
  }
}
/**************** funcion insertar en el DOM el total de la moneda a cambiar  ****************/
function renderTotalChanged(totalChanged) {
  containerChanged.innerHTML = `<p class="text-center text-light fs-6 fw-bold" id="totalCurrencyChanged"> Resultado:$ 
  ${totalChanged.toFixed(2)}</p>`;
}
/**************** funcion que valida que los campos hayan sido ingresados de manera correcta****************/
function inputValidation(input1, input2) {
  if (isEmpty(input1)||isEmpty(input2)) {
    alert("todos los campos son obligatorios, favor ingresar los campos requeridos");
    return false;
  }
  else if (input1 <= 0){
    alert("valor ingresado no es valido, favor ingresar un numero mayor que 0");
    return false;
  }
  return true;
}

/**************** funcion que evalua y un parametro fue ingresado vacio ****************/
function isEmpty(value) {
  return value.length === 0;
}
/**************** crear grafico con valores obtenidos e insertarlo en el DOM ****************/
function setChart(chartValue) {
  chartContainer.setAttribute("style", `background-color: #FFFFFF;`);
  if (chart != null) {
    chart.destroy();
  }
  chart = new Chart(chartContainer, {
    type: 'line',
data: {
  datasets: [{
    label:`Historial ultimos 10 dias`,
    data: chartValue,
    
    fill: true,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }],
   hoverOffset: 4
},
options: {
  parsing: {
    xAxisKey: 'x',
    yAxisKey: 'y',  
  }
}
  });
}
/**************** escuchar evento que desencadena la operacion de calculo de la moneda local (CLP) a la moneda seleccionad ****************/
buttonExchange.addEventListener("click", () => {
  getCurrency();
});
/****************  ****************/
