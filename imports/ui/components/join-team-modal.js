import {sAlert} from "meteor/juliancwirko:s-alert";
import {Template} from "meteor/templating";
import "./join-team-modal.html";

Template.joinTeamModal.onRendered(() => {
    $('#join-team-modal').modal();
});

Template.joinTeamModal.events({
    'click #join-team-button'(e, t) {
        sAlert.info('Le système traite votre demande...');
        Meteor.call('teams.join', {
            teamId: this.teamId,
            teamKey: $('#join-team-key').val()
        }, err => {
            if (err) {
                sAlert.error(err.reason);
            } else {
                sAlert.success('Vous avez bien rejoint cette équipe !');
            }
        });
    }
});