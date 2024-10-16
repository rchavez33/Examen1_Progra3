let formNumber = 1;

document.getElementById('formNumber').value = formNumber;

document.getElementById('guardarBtn').addEventListener('click', function() {
    formNumber++;
    document.getElementById('formNumber').value = formNumber;

});
