$(document).ready(function() {
    // Chargement des contacts depuis le localStorage
    var tableauDeContacts = JSON.parse(localStorage.getItem('tableauDeContacts')) || [];

    // Fonction pour construire le tableau HTML
    function construitTable(tableauDeContacts) {
        var html = '<tr><th></th><th>Prénom</th><th>Nom</th><th>Téléphone</th><th>Email</th><th>Action</th></tr>';

        $.each(tableauDeContacts, function(index, contact) {
            html += '<tr draggable="true">';
            html += '<td><img src="document.png" class="dragDocument" data-index="' + index + '" alt="Document"></td>';
            html += '<td>' + contact.prenom + '</td>';
            html += '<td>' + contact.nom + '</td>';
            html += '<td>' + contact.telephone + '</td>';
            html += '<td>' + contact.email + '</td>';
            html += '<td><img src="delete.jpg" class="deleteContact" data-index="' + index + '" alt="Supprimer"></td>';
            html += '</tr>';
        });

        return html;
    }

    // Affichage initial du tableau
    $('#contactsTable').html(construitTable(tableauDeContacts));

    // Soumission du formulaire
    $('#contactForm').submit(function(e) {
        e.preventDefault();

        var contact = {
            prenom: $('#prenom').val(),
            nom: $('#nom').val(),
            telephone: $('#telephone').val(),
            email: $('#email').val()
        };

        tableauDeContacts.push(contact);

        // Mise à jour du tableau HTML et sauvegarde dans le localStorage
        $('#contactsTable').html(construitTable(tableauDeContacts));
        localStorage.setItem('tableauDeContacts', JSON.stringify(tableauDeContacts));

        // Réinitialisation du formulaire
        this.reset();
    });

    // Suppression d'un contact
    $(document).on('click', '.deleteContact', function() {
        var index = $(this).data('index');
        tableauDeContacts.splice(index, 1);

        // Mise à jour du tableau HTML et sauvegarde dans le localStorage
        $('#contactsTable').html(construitTable(tableauDeContacts));
        localStorage.setItem('tableauDeContacts', JSON.stringify(tableauDeContacts));
    });


var poubelleSound = document.getElementById('poubelleSound');
 // Fonction pour supprimer un contact
 function SupprimeContact(index) {
    tableauDeContacts.splice(index, 1);
    localStorage.setItem('tableauDeContacts', JSON.stringify(tableauDeContacts));
    $('#contactsTable').html(construitTable(tableauDeContacts));
    poubelleSound.play();
}


// Drag handler pour l'icône de document
$(document).on('dragstart', '.dragDocument', function(event) {
    var index = $(this).data('index');
    event.originalEvent.dataTransfer.setData('text/plain', index);
});

// Drop handler pour la poubelle
$('#poubelle').on('drop', function(event) {
    event.preventDefault();
    var index = event.originalEvent.dataTransfer.getData('text/plain');
    SupprimeContact(index);
});

// Empêcher le comportement par défaut du drop pour éviter les erreurs
$('#poubelle').on('dragover', function(event) {
    event.preventDefault();
});
});