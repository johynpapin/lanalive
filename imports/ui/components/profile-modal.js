import {Template} from "meteor/templating";
import {Accounts} from "meteor/accounts-base";
import {sAlert} from "meteor/juliancwirko:s-alert";
import "./profile-modal.html";

Template.profileModal.onRendered(() => {
    $('#profile-modal').modal();
    $('.collapsible').collapsible();
});

Template.profileModal.helpers({
    email() {
        return this.emails[0].address;
    },
    summonerLabelActive() {
        if (this.profile) {
            return this.profile.summonerName ? 'active' : '';
        }
    },
    steamIdLabelActive() {
        if (this.profile) {
            return this.profile.steamId ? 'active' : '';
        }
    }
});

Template.profileModal.events({
    'submit #profile-form, click #profile-button'(e) {
        e.preventDefault();
        let summonerName = $('#profile-summoner-name'),
            steamId = $('#profile-steam-id');
        sAlert.info('Modification de votre profil en cours...');
        Meteor.call('users.profile.complete', {
            summonerName: summonerName.val(),
            steamId: steamId.val()
        }, err => {
            if (err) {
                sAlert.error('Une erreur est survenue.');
            } else {
                sAlert.success('Votre profil a bien été complété.');
            }
        });
    }
});