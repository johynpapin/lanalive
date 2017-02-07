import {sAlert} from 'meteor/juliancwirko:s-alert';
import {Gravatar} from "meteor/jparker:gravatar";
import {Template} from "meteor/templating";
import "../components/license-modal.js";
import "../components/login-modal.js";
import "../components/register-modal.js";
import "../components/profile-modal.js";
import "./main-layout.html";

Template.mainLayout.helpers({
    email() {
        return Meteor.user().emails[0].address;
    },
    gravatar() {
        return Gravatar.imageUrl(Meteor.user().emails[0].address, {
            d: 'retro'
        });
    }
});

Template.mainLayout.events({
    'click #logout'() {
        sAlert.info('Déconnexion en cours...');
        Accounts.logout(err => {
            if (err) {
                sAlert.error('Une erreur est survenue !');
            } else {
                sAlert.success('À bientôt.');
            }
        });
    }
});