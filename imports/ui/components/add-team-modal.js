import {$} from "meteor/jquery";
import {Session} from "meteor/session";
import {sAlert} from 'meteor/juliancwirko:s-alert';
import "./add-team-modal.html";

Template.addTeamModal.onRendered(() => {
    $('#add-team-modal').modal();
});

Template.addTeamModal.helpers({
    game() {
        return Session.get('game') === 'lol' ? 'League of Legends' : 'CS: GO';
    }
});

Template.addTeamModal.events({
    'click #add-team-next'() {
        sAlert.info('Création de l’équipe...');
        Meteor.call('teams.insert', {
            game: Session.get('game'),
            name: $('#team-name').val(),
            description: $('#team-description').val()
        }, (err, res) => {
            if (err) {
                sAlert.error(err.reason);
            } else {
                sAlert.success('L’équipe a bien été enregistrée.');
                $('#add-team-modal').modal('close');
                $('#after-modal').modal('open');
            }
        });
    }
});