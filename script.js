
var gk_isXlsx = false;
var gk_xlsxFileLookup = {};
var gk_fileData = {};
function filledCell(cell) {
  return cell !== '' && cell != null;
}
function loadFileData(filename) {
if (gk_isXlsx && gk_xlsxFileLookup[filename]) {
    try {
		var workbook = XLSX.read(gk_fileData[filename], { type: 'base64' });
		var firstSheetName = workbook.SheetNames[0];
		var worksheet = workbook.Sheets[firstSheetName];

		var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, blankrows: false, defval: '' });

		var filteredData = jsonData.filter(row => row.some(filledCell));

		var headerRowIndex = filteredData.findIndex((row, index) =>
		  row.filter(filledCell).length >= filteredData[index + 1]?.filter(filledCell).length
		);
		if (headerRowIndex === -1 || headerRowIndex > 25) {
		  headerRowIndex = 0;
		}
		var csv = XLSX.utils.aoa_to_sheet(filteredData.slice(headerRowIndex));
		csv = XLSX.utils.sheet_to_csv(csv, { header: 1 });
		return csv;
	} catch (e) {
			console.error(e);
			return "";
		}
	}
return gk_fileData[filename] || "";
}

document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    let fontSize = 16; // tamanho em px
	
    // aumentar fonte
    window.increaseFont = () => {
        fontSize += 2;
        root.style.fontSize = `${fontSize}px`;
    };

    // diminuir fonte
    window.decreaseFont = () => {
        if (fontSize > 12) {
            fontSize -= 2;
            root.style.fontSize = `${fontSize}px`;
        }
    };
	
});