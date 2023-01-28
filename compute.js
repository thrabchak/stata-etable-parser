const inputFileElement = document.getElementById("input-file");
const previewElement = document.getElementById("preview-section");
const grid = canvasDatagrid({
  parentNode: previewElement
});
grid.style.width = "100%"
const stringInputElement = document.getElementById("string-input");
const stringOutputElement = document.getElementById("string-output");

function evaluateInput() {
	console.log("Evaluate Input")
}

function copyToClipboard() {
	console.log("copyToClipboard")
}

var sheet;
async function loadFile(e) {
  const file = e.target.files[0];
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data, {dense: false});

  sheet = workbook.Sheets[workbook.SheetNames[0]];
  var d = XLSX.utils.sheet_to_json(sheet, {blankrows: true});
  console.log(d);
  grid.data = d;
}
inputFileElement.addEventListener("input", loadFile, false);
