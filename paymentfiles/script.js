function saveResult() {
  let types = document.querySelectorAll(".paymentTypeInput:checked");
  let type = types[0].value;
  let file = type == "mpay" ? "D01.dat" : "M01.dat";
  file = type == "apo" ? "apo.txt" : file;
  let resultText = document.getElementById("exampleFormControlTextarea1");

  let downloadFile = new Blob([resultText.value], { type: "text/plain" });
  document.getElementById("downloadURL").href =
    URL.createObjectURL(downloadFile);
  document.getElementById("downloadURL").download = file;
}

function doDownloadLink() {
  let dwnldLink = document.getElementById("downloadURL");
  dwnldLink.click();
}

function copyResult() {
  let resultText = document.getElementById("exampleFormControlTextarea1");
  resultText.select();
  navigator.clipboard.writeText(resultText.value);

  alert("Copied text:" + resultText.value);
}
function addRow() {
  const copyRow = document.getElementsByClassName("line-row")[0];
  document.querySelector(".delete-row").classList.remove("disabled");
  document.querySelector(".delete-row").disabled = false;
  const cloneRow = copyRow.cloneNode(true);
  document.getElementById("line-rows").appendChild(cloneRow);
  checkFields();
}
function deleteRow() {
  document.querySelector("#line-rows .line-row:last-child").remove();
  if (document.getElementsByClassName("line-row").length < 2) {
    document.querySelector(".delete-row").classList.add("disabled");
    document.querySelector(".delete-row").disabled = true;
  }
  checkFields();
}
function update() {
  let today = new Date(document.getElementById("processDateInput").valueAsDate);
  let types = document.querySelectorAll(".paymentTypeInput:checked");
  //types returns an array, so we only use the first value.

  if (types && types.length > 0) {
    let type = types[0].value;
    var lines = [];
    let payType = document.getElementById("pay-type");
    if (type == "mpay") {
      let rows = document.querySelectorAll(".line-row");
      lines.push(
        "01,CBABPAY,WALICE01," +
          today.getFullYear() +
          (today.getMonth() + 1 < 10
            ? "0" + (today.getMonth() + 1)
            : today.getMonth() + 1) +
          (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) +
          ",0133,1,,,2/",
        "02," + payType.value + ",CBA,1,0,,,3/",
      );
      var rowLines = [];
      var rowTotal = 0;
      for (let r = 0; r < rows.length; r++) {
        let amount = rows[r].querySelector(".amount");
        let accountNumber = rows[r].querySelector(".accountNumber");

        rowTotal = rowTotal + parseFloat(amount.value.replace(".", ""));
        rowLines.push(
          "30,399," +
            parseFloat(amount.value.replace(".", "")) +
            ",1,00" +
            accountNumber.value +
            "," +
            payType.value +
            ",0,05,CHQ," +
            today.getFullYear() +
            (today.getMonth() + 1 < 10
              ? "0" + (today.getMonth() + 1)
              : today.getMonth() + 1) +
            (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) +
            ",103458,LBX,,,,,,6042,,,/",
        );
      }
      lines.push("03, 00000000000,,231," + rowTotal + ",1,,250,,1,,550,0,0,/"); //includes total
      lines.push(rowLines.join("\r\n"));

      //PUSH EACH ROW
      lines.push(
        "49,426782144," + (rows.length + 2) + "/",
        "98,426782144,1," + (rows.length + 4) + "/",
        "99,426782144,1," + (rows.length + 6) + "/",
      );
    } else if (type == "bpay") {
      let rows = document.querySelectorAll(".line-row");
      lines.push(
        "01,CBABPAY,WALICE24," +
          today.getFullYear() +
          (today.getMonth() + 1 < 10
            ? "0" + (today.getMonth() + 1)
            : today.getMonth() + 1) +
          (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) +
          ",0142,1,,,2/",
        "02,484634,CBA,1," +
          today.getFullYear() +
          (today.getMonth() + 1 < 10
            ? "0" + (today.getMonth() + 1)
            : today.getMonth() + 1) +
          (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) +
          ",,,3/",
      );
      var rowLines = [];
      var rowTotal = 0;
      for (let r = 0; r < rows.length; r++) {
        let amount = rows[r].querySelector(".amount");
        let accountNumber = rows[r].querySelector(".accountNumber");
        let payType = document.getElementById("pay-type");
        rowTotal = rowTotal + parseFloat(amount.value.replace(".", ""));
        rowLines.push(
          "30,399," +
            parseFloat(amount.value.replace(".", "")) +
            ",0," +
            accountNumber.value +
            ",CBA201610240446164619,0,05,001," +
            today.getFullYear() +
            (today.getMonth() + 1 < 10
              ? "0" + (today.getMonth() + 1)
              : today.getMonth() + 1) +
            (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) +
            ",112716,004,,,,,,,,,/",
        );
      }
      lines.push("03,604012400201,,231," + rowTotal + ",1,,250,,0,,550,0,0,/"); //includes total
      lines.push(rowLines.join("\r\n"));

      //PUSH EACH ROW
      lines.push(
        "49,426782144," + (rows.length + 2) + "/",
        "98,426782144,1," + (rows.length + 4) + "/",
        "99,426782144,1," + (rows.length + 6) + "/",
      );
    } else {
      // do nothing
    }

    let e = document.getElementById("exampleFormControlTextarea1");
    e.innerHTML = lines.join("\r\n");
    let file = type == "mpay" ? "D01.dat" : "B01.dat";
    file = type == "apo" ? "apo.txt" : file;
    let resultText = document.getElementById("exampleFormControlTextarea1");

    let downloadFile = new Blob([resultText.value], { type: "text/plain" });
    document.getElementById("downloadURL").href =
      URL.createObjectURL(downloadFile);
    document.getElementById("downloadURL").download = file;
  } else {
    return; //do nothing as the value doesn't exist.
  }
}
document.getElementById("processDateInput").valueAsDate = new Date(); //Set default date

function checkFields() {
  let changeFields = document.getElementsByClassName("update-values");
  for (let i of changeFields) {
    i.addEventListener("change", update);
  }
    const fields = document.querySelectorAll('.form-field');

  fields.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('active');
    });

    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('active');
    });
  });
  update();
}



checkFields();
