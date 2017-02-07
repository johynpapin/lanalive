import {Template} from "meteor/templating";
import {Accounts} from "meteor/accounts-base";
import {sAlert} from "meteor/juliancwirko:s-alert";
import "./register-modal.html";

Template.registerModal.onRendered(() => {
    $('#register-modal').modal();
});

Template.registerModal.events({
    'submit #register-form, click #register-button'(e) {
        e.preventDefault();
        let username = $('#reg-username'),
            email = $('#reg-email'),
            password = $('#reg-password'),
            password2 = $('#reg-password-2'),
            firstName = $('#reg-first-name'),
            lastName = $('#reg-last-name');
        let full = true;
        if (!username.val()) {
            username.removeClass('valid').addClass('invalid');
            full = false;
        }
        if (!email.val()) {
            email.removeClass('valid').addClass('invalid');
            full = false;
        }
        if (!password.val()) {
            password.removeClass('valid').addClass('invalid');
            full = false;
        }
        if (!password2.val()) {
            password2.removeClass('valid').addClass('invalid');
            full = false;
        }
        if (!firstName.val()) {
            firstName.removeClass('valid').addClass('invalid');
            full = false;
        }
        if (!lastName.val()) {
            lastName.removeClass('valid').addClass('invalid');
            full = false;
        }
        if (!full) {
            sAlert.warning('Vous devez remplir tous les champs du formulaire.');
        } else {
            if (password.val() !== password2.val()) {
                password.removeClass('valid').addClass('invalid');
                password2.removeClass('valid').addClass('invalid');
                sAlert.warning('Les mots de passes ne correspondent pas.');
            } else if (email.hasClass('invalid')) {
                sAlert.warning('Votre adresse email est invalide.');
            } else {
                sAlert.info('Inscription en cours...');
                Accounts.createUser({
                    username: username.val(),
                    email: email.val(),
                    password: password.val(),
                    profile: {
                        firstName: firstName.val(),
                        lastName: lastName.val()
                    }
                }, error => {
                    if (error) {
                        console.error(error);
                        sAlert.error('Désolé, une erreur est survenue.');
                    } else {
                        sAlert.success('Bienvenue, ' + Meteor.user().profile.firstName + ' !');
                    }
                });
            }
        }
    }
});