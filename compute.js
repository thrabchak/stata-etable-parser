const inputFileElement = document.getElementById("input-file");
const previewElement = document.getElementById("preview-section");
const activeCell = document.getElementById("active-cell");
const sheetSelectElement = document.getElementById("sheet-select");
const grid = canvasDatagrid({
  parentNode: previewElement,
  borderDragBehavior: "resize",
  columnHeaderClickBehavior: "none",
  editable: false,
  hoverMode: "cell",
  resizeAfterDragged: true,
  singleSelectionMode: true,
  snapToRow: true,
  style: {
    width: "100%",
    cellWidth: 100,
  }
});
const stringInputElement = document.getElementById("string-input");
const stringOutputElement = document.getElementById("string-output");

let workbook;
let currentSheet = 0;

function evaluateInput() {
	console.log("Evaluate Input")
}

function copyToClipboard() {
	console.log("copyToClipboard")
}

function repopulateSheetDropdown(sheetNames) {
  // Clear and populate sheet selector
  while (sheetSelectElement.options.length > 0) {
    sheetSelectElement.options.remove(0);
  }
  for (const sheetName of sheetNames) {
    let newOption = document.createElement("option");
    newOption.innerHTML = sheetName;
    sheetSelectElement.options.add(newOption)
  }
}

function showSheet(index) {
  let sheet = workbook.Sheets[workbook.SheetNames[index]];
  var d = XLSX.utils.sheet_to_json(sheet, {
    header: "A", 
    range: 0, 
    blankrows: true,
    raw: false,
    defval: ""
  });
  grid.data = d;
  currentSheet = index;
  sheetSelectElement.selectedIndex = index;
}

async function loadFile(e) {
  const file = e.target.files[0];
  const data = await file.arrayBuffer();
  workbook = XLSX.read(data, {dense: false});

  repopulateSheetDropdown(workbook.SheetNames);
  showSheet(0);
}

inputFileElement.addEventListener("input", loadFile, false);

grid.addEventListener('click', function (e) {
  if (!e.cell) return;
  var loc = e.cell.header.name + e.cell.rowIndex;
  activeCell.innerHTML = "Active Cell: " + loc;
});

sheetSelectElement.addEventListener('change', () => showSheet(sheetSelectElement.selectedIndex))
