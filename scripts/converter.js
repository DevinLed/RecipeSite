
//weight conversion for 6 common cooking measurements LIQUID
function weightConverter(source, valNum) {
    const depends = "Depends on ingredient";
    valNum = parseFloat(valNum);
    let inputOunces = document.getElementById("inputOunces");
    let inputGrams = document.getElementById("inputGrams");
    let inputCups = document.getElementById("inputCups");
    let inputTbl = document.getElementById("inputTbl");
    let inputTspn = document.getElementById("inputTsp");
    let inputMl = document.getElementById("inputMl");
    //if statements for each type of input measurement, switch possible?
    if (source == "inputOunces") {
      inputGrams.value = (valNum * 28.35).toFixed(2);
      inputCups.value = (valNum / 8).toFixed(3);
      inputTbl.value = (valNum * 2).toFixed(2);
      inputTspn.value = (valNum * 6).toFixed(1);
      inputMl.value = (valNum * 29.5735).toFixed();
    }
    if (source == "inputGrams") {
      inputOunces.value = (valNum / 28.35).toFixed(1);
      inputCups.value = (valNum * 0.0041666666666667).toFixed(3);
      inputTbl.value = (valNum * 0.0676132521974307).toFixed(2);
      inputTspn.value = (valNum * 5.69).toFixed(1);
      inputMl.value = (valNum * 1).toFixed();
    }
  
    if (source == "inputCups") {
      inputOunces.value = (valNum * 8).toFixed(1);
      inputGrams.value = (valNum / 0.0041666666666667).toFixed(2);
      inputTbl.value = (valNum * 16).toFixed(2);
      inputTspn.value = (valNum * 48).toFixed(1);
      inputMl.value = (valNum * 236.588).toFixed();
    }
    if (source == "inputTbl") {
      inputOunces.value = (valNum / 2).toFixed(1);
      inputGrams.value = (valNum / 0.0676132521974307).toFixed(2);
      inputCups.value = (valNum / 16).toFixed(3);
      inputTspn.value = (valNum * 236.588).toFixed(1);
      inputMl.value = (valNum * 14.7868).toFixed();
    }
    if (source == "inputTsp") {
      inputOunces.value = (valNum / 6).toFixed(1);
      inputGrams.value = (valNum / 5.69).toFixed(2);
      inputCups.value = (valNum / 48).toFixed(3);
      inputTbl.value = (valNum / 236.588).toFixed(2);
      inputMl.value = (valNum * 4.929).toFixed();
    }
    if (source == "inputMl") {
      inputOunces.value = (valNum / 29.5735).toFixed(1);
      inputGrams.value = (valNum / 0.035274).toFixed(2);
      inputCups.value = (valNum / 236.588).toFixed(3);
      inputTbl.value = (valNum / 14.7868).toFixed(2);
      inputTspn.value = (valNum / 4.929).toFixed(1);
    }
    /* Not needed due to .toFixed()
      if ($("#outputGrams").html().length > 8) {
          short_text = $("#outputGrams").html().substr(0, 8);
          $("#outputGrams").html(short_text + "..");
        }
        if ($("#outputCups").html().length > 8) {
          short_text = $("#outputCups").html().substr(0, 8);
          $("#outputCups").html(short_text + "..");
        }
        if ($("#outputTbl").html().length > 8) {
          short_text = $("#outputTbl").html().substr(0, 8);
          $("#outputTbl").html(short_text + "..");
        }
        if ($("#outputTsp").html().length > 8) {
          short_text = $("#outputTsp").html().substr(0, 8);
          $("#outputTsp").html(short_text + "..");
        }
        if ($("#outputMl").html().length > 8) {
          short_text = $("#outputMl").html().substr(0, 8);
          $("#outputMl").html(short_text + "..");
        }
        */
  }
  //weight conversion for 6 common cooking measurements DRY
  function weightConverterDry(source, valNum) {
    valNum = parseFloat(valNum);
    let inputDOunces = document.getElementById("inputDOunces");
    let inputDGrams = document.getElementById("inputDGrams");
    let inputDCups = document.getElementById("inputDCups");
    let inputDTbl = document.getElementById("inputDTbl");
    let inputDTspn = document.getElementById("inputDTsp");
    let inputDMl = document.getElementById("inputDMl");
  
    if (source == "inputDOunces") {
      inputDGrams.value = (valNum * 29.5735295625).toFixed(2);
      inputDCups.value = (valNum / 4.5).toFixed(3);
      inputDTbl.value = (valNum * 0.5).toFixed(2);
      inputDTspn.value = (valNum * 6).toFixed(1);
      inputDMl.value = (valNum * 29.5735).toFixed();
    }
    if (source == "inputDGrams") {
      inputDOunces.value = (valNum / 29.5735295625).toFixed(1);
      inputDCups.value = (valNum * 0.0041666666666667).toFixed(3);
      inputDTbl.value = (valNum * 0.0676132521974307).toFixed(2);
      inputDTspn.value = (valNum * 5.69).toFixed(1);
      inputDMl.value = (valNum * 1).toFixed();
    }
  
    if (source == "inputDCups") {
      inputDOunces.value = (valNum * 4.5).toFixed(1);
      inputDGrams.value = (valNum / 0.0041666666666667).toFixed(2);
      inputDTbl.value = (valNum * 16).toFixed(2);
      inputDTspn.value = (valNum * 48).toFixed(1);
      inputDMl.value = (valNum * 236.588).toFixed();
    }
    if (source == "inputDTbl") {
      inputDOunces.value = (valNum / 2).toFixed(1);
      inputDGrams.value = (valNum / 0.0676132521974307).toFixed(2);
      inputDCups.value = (valNum / 16).toFixed(3);
      inputDTspn.value = (valNum * 236.588).toFixed(1);
      inputDMl.value = (valNum * 14.7868).toFixed();
    }
    if (source == "inputDTsp") {
      inputDOunces.value = (valNum / 6).toFixed(1);
      inputDGrams.value = (valNum / 5.69).toFixed(2);
      inputDCups.value = (valNum / 48).toFixed(3);
      inputDTbl.value = (valNum / 236.588).toFixed(2);
      inputDMl.value = (valNum * 4.929).toFixed();
    }
    if (source == "inputDMl") {
      inputDOunces.value = (valNum / 29.5735).toFixed(1);
      inputDGrams.value = (valNum / 0.035274).toFixed(2);
      inputDCups.value = (valNum / 236.588).toFixed(3);
      inputDTbl.value = (valNum / 14.7868).toFixed(2);
      inputDTspn.value = (valNum / 4.929).toFixed(1);
    }
  }
  //clear button to wipe out all values in conversion chart
  function clearMeasure() {
    inputOunces.value = (0).toFixed();
    inputGrams.value = (0).toFixed();
    inputCups.value = (0).toFixed();
    inputTbl.value = (0).toFixed();
    inputTsp.value = (0).toFixed();
    inputMl.value = (0).toFixed();
    inputDOunces.value = (0).toFixed();
    inputDGrams.value = (0).toFixed();
    inputDCups.value = (0).toFixed();
    inputDTbl.value = (0).toFixed();
    inputDTsp.value = (0).toFixed();
    inputDMl.value = (0).toFixed();
  }
  