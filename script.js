function convert() {
  const type = document.getElementById("converter").value;
  const value = parseFloat(document.getElementById("inputValue").value);
  const resultElement = document.getElementById("result");

  if (isNaN(value)) {
    resultElement.textContent = "⚠️ กรุณากรอกตัวเลขให้ถูกต้อง";
    return;
  }

  let result;

  switch (type) {
    case "km-miles":
      result = value * 0.621371;
      resultElement.textContent = `${value} กิโลเมตร = ${result.toFixed(2)} ไมล์`;
      break;
    case "miles-km":
      result = value / 0.621371;
      resultElement.textContent = `${value} ไมล์ = ${result.toFixed(2)} กิโลเมตร`;
      break;
    case "c-f":
      result = (value * 9 / 5) + 32;
      resultElement.textContent = `${value}°C = ${result.toFixed(2)}°F`;
      break;
    case "f-c":
      result = (value - 32) * 5 / 9;
      resultElement.textContent = `${value}°F = ${result.toFixed(2)}°C`;
      break;
    case "kg-lb":
      result = value * 2.20462;
      resultElement.textContent = `${value} กิโลกรัม = ${result.toFixed(2)} ปอนด์`;
      break;
    case "lb-kg":
      result = value / 2.20462;
      resultElement.textContent = `${value} ปอนด์ = ${result.toFixed(2)} กิโลกรัม`;
      break;
    default:
      resultElement.textContent = "❌ ไม่สามารถแปลงหน่วยนี้ได้";
  }
}

function updateUnitLabel() {
  const type = document.getElementById("converter").value;
  const unitLabel = document.getElementById("unitLabel");

  switch (type) {
    case "km-miles":
      unitLabel.textContent = "กิโลเมตร";
      break;
    case "miles-km":
      unitLabel.textContent = "ไมล์";
      break;
    case "c-f":
      unitLabel.textContent = "°C";
      break;
    case "f-c":
      unitLabel.textContent = "°F";
      break;
    case "kg-lb":
      unitLabel.textContent = "กิโลกรัม";
      break;
    default:
      unitLabel.textContent = "";
  }
}

// อัปเดต label เริ่มต้นเมื่อโหลด
window.onload = updateUnitLabel;
