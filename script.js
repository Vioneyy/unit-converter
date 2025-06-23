const units = {
  length: {
    label: "ความยาว",
    units: {
      km: { name: "กิโลเมตร", toBase: (val) => val * 1000, fromBase: (val) => val / 1000 },
      m: { name: "เมตร", toBase: (val) => val, fromBase: (val) => val },
      cm: { name: "เซนติเมตร", toBase: (val) => val / 100, fromBase: (val) => val * 100 },
      miles: { name: "ไมล์", toBase: (val) => val * 1609.34, fromBase: (val) => val / 1609.34 },
      ft: { name: "ฟุต", toBase: (val) => val * 0.3048, fromBase: (val) => val / 0.3048 }
    }
  },
  temperature: {
    label: "อุณหภูมิ",
    units: {
      c: {
        name: "เซลเซียส",
        toBase: (val) => val,
        fromBase: (val) => val
      },
      f: {
        name: "ฟาเรนไฮต์",
        toBase: (val) => (val - 32) * 5/9,
        fromBase: (val) => (val * 9/5) + 32
      }
    }
  },
  weight: {
    label: "น้ำหนัก",
    units: {
      kg: { name: "กิโลกรัม", toBase: (val) => val, fromBase: (val) => val },
      lb: { name: "ปอนด์", toBase: (val) => val * 0.453592, fromBase: (val) => val / 0.453592 }
    }
  }
};

const inputValue = document.getElementById("inputValue");
const unitFrom = document.getElementById("unitFrom");
const unitTo = document.getElementById("unitTo");
const convertBtn = document.getElementById("convertBtn");
const resultEl = document.getElementById("result");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

function populateSelectOptions() {
  unitFrom.innerHTML = "";
  unitTo.innerHTML = "";

  for (const category in units) {
    const optgroupFrom = document.createElement("optgroup");
    const optgroupTo = document.createElement("optgroup");
    optgroupFrom.label = units[category].label;
    optgroupTo.label = units[category].label;

    for (const key in units[category].units) {
      const optionFrom = document.createElement("option");
      optionFrom.value = `${category}:${key}`;
      optionFrom.textContent = units[category].units[key].name;

      const optionTo = optionFrom.cloneNode(true);

      optgroupFrom.appendChild(optionFrom);
      optgroupTo.appendChild(optionTo);
    }

    unitFrom.appendChild(optgroupFrom);
    unitTo.appendChild(optgroupTo);
  }

  unitFrom.selectedIndex = 0;
  unitTo.selectedIndex = 1;
}

function formatNumber(num) {
  if (Number.isInteger(num)) {
    return num.toString();
  } else {
    return num.toFixed(4).replace(/\.?0+$/, '');
  }
}

function convert() {
  const value = parseFloat(inputValue.value);
  if (isNaN(value)) {
    resultEl.textContent = "⚠️ กรุณากรอกตัวเลขให้ถูกต้อง";
    return;
  }

  const [categoryFrom, keyFrom] = unitFrom.value.split(":");
  const [categoryTo, keyTo] = unitTo.value.split(":");

  if (categoryFrom !== categoryTo) {
    resultEl.textContent = "❌ ไม่สามารถแปลงระหว่างประเภทหน่วยต่างกันได้";
    return;
  }

  const fromUnit = units[categoryFrom].units[keyFrom];
  const toUnit = units[categoryTo].units[keyTo];

  const baseValue = fromUnit.toBase(value);
  const converted = toUnit.fromBase(baseValue);

  const resultStr = `${formatNumber(value)} ${fromUnit.name} = ${formatNumber(converted)} ${toUnit.name}`;
  resultEl.textContent = resultStr;

  saveToHistory(resultStr);
  renderHistory();
}

function saveToHistory(entry) {
  let history = JSON.parse(localStorage.getItem("conversionHistory")) || [];
  history.unshift(entry);
  if (history.length > 10) history.pop();
  localStorage.setItem("conversionHistory", JSON.stringify(history));
}

function renderHistory() {
  let history = JSON.parse(localStorage.getItem("conversionHistory")) || [];
  historyList.innerHTML = "";
  history.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    li.tabIndex = 0;
    li.setAttribute("role", "button");
    li.addEventListener("click", () => {
      resultEl.textContent = item;
    });
    historyList.appendChild(li);
  });
}

function clearHistory() {
  localStorage.removeItem("conversionHistory");
  renderHistory();
}

convertBtn.addEventListener("click", convert);
clearHistoryBtn.addEventListener("click", clearHistory);

window.addEventListener("DOMContentLoaded", () => {
  populateSelectOptions();
  renderHistory();
});
