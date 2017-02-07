import {Template} from "meteor/templating";
import {Session} from "meteor/session";
import "./complete-modal.html";

Template.completeModal.onRendered(() => {
    $('#complete-modal').modal();
});

Template.completeModal.helpers({
    game() {
        return Session.get('game') === 'lol' ? 'League of Legends' : 'CS: GO';
    }
});

Template.completeModal.events({
    'click #complete-profile-button'() {
        $('#complete-modal').modal('close');
    }
});