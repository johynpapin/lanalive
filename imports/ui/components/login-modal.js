import {Template} from "meteor/templating";
import {sAlert} from 'meteor/juliancwirko:s-alert';
import "./login-modal.html";

Template.loginModal.onRendered(() => {
    $('#login-modal').modal();
});

Template.loginModal.events({
    'submit #login-form, click #login-button'(e) {
        e.preventDefault();
        sAlert.info('Connexion en cours...');
        $('#login-modal').find('input').removeClass('valid').removeClass('invalid');
        Meteor.loginWithPassword($('#login-username').val(), $('#login-password').val(), error => {
            if (error) {
                $('#login-modal').find('input').removeClass('valid').addClass('invalid');
                if (error.error === 403) {
                    sAlert.error("Mauvais couple utilisateur / mot de passe.");
                } else {
                    sAlert.error(error);
                }
            } else {
                $('#login-modal').modal('close');
                $('#login-modal').find('input').removeClass('invalid').addClass('valid');
                sAlert.success('Salut, ' + Meteor.user().profile.firstName + ' !');
            }
        });
    }
});