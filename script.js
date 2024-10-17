let formNumber = 1;

document.getElementById('formNumber').value = formNumber;

// Función para agregar ":00" a la hora si no tiene segundos
function formatTime(timeString) {
    if (timeString.length === 5) {
        return timeString + ":00";  // Agregar ":00" para los segundos
    }
    return timeString; // Si ya tiene segundos, lo dejamos igual
}

document.getElementById('guardarBtn').addEventListener('click', function() {
    formNumber++;
    document.getElementById('formNumber').value = formNumber;

    const formData = {
        formNumber: formNumber,
        cantidadInvestigadores: document.getElementById('cantidadInvestigadores').value,
        correo: document.getElementById('correo').value,
        fechaInicio: document.getElementById('fechaInicio').value.split('-').reverse().join('-'), // Cambiar a YYYY-MM-DD
        fechaFin: document.getElementById('fechaFin').value.split('-').reverse().join('-'), // Cambiar a YYYY-MM-DD
        organizacion: document.getElementById('organizacion').value,
        especie: document.getElementById('especie').value,
        zona: document.getElementById('zona').value,
        estacion: document.getElementById('estacion').value,
        especimenes: document.getElementById('especimenes').value,
        adultos: document.getElementById('adultos').value,
        crias: document.getElementById('crias').value,
        horaCaza: document.getElementById('horaCaza').value,
        horaDormir: document.getElementById('horaDormir').value,
        horaMigracion: document.getElementById('horaMigracion').value,
        guardabosques: document.getElementById('guardabosques').value,
        cazadores: document.getElementById('cazadores').value
    };

    fetch('/api/guardarFormulario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Datos guardados exitosamente');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error al guardar los datos: ' + error.message);
    });
});