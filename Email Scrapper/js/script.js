let domainName = document.getElementById("domainName"),
  txtInput = document.getElementById("inpTxt"),
  txtOutput = document.getElementById("outTxt"),
  btnExtract = document.getElementById("btnExtract");

let wordLength, i, res;

// Execute Button functionality

btnExtract.addEventListener("click", function () {
  res = [];
  let domain = domainName.value,
    txtInp = txtInput.value.split(/\s+/);
  wordLength = txtInp.length;
  for (i = 0; i < wordLength; i++) {
    if (txtInp[i][txtInp[i].length - 1] == ".") {
      txtInp[i] = txtInp[i].split("");
      txtInp[i].pop();
      txtInp[i] = txtInp[i].join("");
    }
    if (
      txtInp[i].indexOf(domain) + domain.length < txtInp[i].length ||
      txtInp[i] == domain
    ) {
      continue;
    }
    if (txtInp[i].includes(domain)) {
      res.push(txtInp[i]);
    }
  }

  res = new Set(res);

  res = new Array(...res);

  txtOutput.value = res.join("\n");
});
