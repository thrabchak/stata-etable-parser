const inputFileElement = document.getElementById("input-file");
const textNoDataElement = document.getElementById("text-no-data");
const spinnerElement = document.getElementById("spinner");
const gridElement = document.getElementById("grid");
const stringInputElement = document.getElementById("string-input");
const stringOutputElement = document.getElementById("string-output");

let isDataLoaded = false;
let workbook;

function evaluateInput() {
	console.log("Evaluate Input")
}

function copyToClipboard() {
	console.log("copyToClipboard")
}

async function loadFile(e) {
  const file = e.target.files[0];
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);

  createSpreadsheet(workbook)
}
inputFileElement.addEventListener("input", loadFile, false);

function createSpreadsheet(workbook) {
  console.log((workbook.Sheets[workbook.SheetNames[0]]));
}