/**************** variables globales ****************/
const buttonExchange = document.getElementById("buttonExchange");
const containerChanged = document.getElementById("containerChanged");

/**************** capturar la moneda requerida y su valor actual desde la API ****************/
async function getCurrency() {
  let clp = document.getElementById("CLP").value;
  let currecyType = document.getElementById("currencyToChange").value;
  /**************** variable con la API ****************/
  const API_URL = `https://mindicador.cl/api/` + currecyType;
  console.log(API_URL);
  try {
    const response = await fetch(`${API_URL}`);
    if (response.status == 200) {
      const data = await response.json();
      const dataChart = [];
      let totalExchange = clp / data.serie[0].valor;
      data.serie.slice(0, 10).map((element) => {
        dataChart.push({ x: element.fecha.substring(0, 10), y: element.valor });
      });
      console.log(dataChart);
      renderTotalChanged(totalExchange);
    } else {
      throw "error";
    }
  } catch (error) {

    alert("alerta");
  }
}

function renderTotalChanged(totalChanged) {
  containerChanged.innerHTML = `<p class="text-center text-light fs-6 fw-bold" id="totalCurrencyChanged"> Resultado:$ ${totalChanged.toFixed(
    2
  )}</p>`;
}
/**************** crear validacion de campos seleccionados ****************/
function isEmpty(value) {
  return value.length === 0;
}
/**************** escuchar evento que desencadena la operacion de calculo de la moneda local (CLP) a la moneda seleccionad ****************/
buttonExchange.addEventListener("click", () => {
  getCurrency();
});
/**************** crear grafico con valores obtenidos e insertarlo en el DOM ****************/
function setChart(params) {}

/****************  ****************/
