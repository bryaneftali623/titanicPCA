document.getElementById("predictForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const jsonData = {};

    formData.forEach((value, key) => {
        jsonData[key] = isNaN(value) || value.trim() === "" ? value : Number(value);
    }); 
    console.log("Datos enviados al backend",jsonData);
// ✅ Conversión forzada a string para los campos categóricos
    jsonData["Sex"] = String(jsonData["Sex"]);
    jsonData["Embarked"] = String(jsonData["Embarked"]);
    jsonData["Cabin"] = String(jsonData["Cabin"]);
    jsonData["Ticket"] = String(jsonData["Ticket"]);
    const response = await fetch("/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData)
    });

    const result = await response.json();
    const resText = result.prediction === 1 ? "¡Te Salvaste 😎!" : "¡No Te Salvaste 😵!";
    
    // Obtener el elemento y limpiar clases anteriores
    const resultDiv = document.getElementById("result");
    resultDiv.innerText = resText;
    resultDiv.classList.remove("result-success", "result-fail");

    // Asignar clase dinámica
    if (result.prediction === 1) {
        resultDiv.classList.add("result-success");
    } else {
        resultDiv.classList.add("result-fail");
    }
});
