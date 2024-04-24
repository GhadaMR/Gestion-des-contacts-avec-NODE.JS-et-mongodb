function verifdate() {
    var dateNaissance = document.getElementById("date_naissance").value;
    var today = new Date();
    var selectedDate = new Date(dateNaissance);
    if (selectedDate > today) {
        alert("La date de naissance doit être dans le passé.");
        return false;
    }
    return true;
}

function validateInput(input) {
    if (input.checkValidity()) {
        input.classList.remove('invalid');
        input.classList.add('valid');
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
    }
}



   
