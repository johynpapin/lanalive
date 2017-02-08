import {Session} from "meteor/session";
import {Teams} from "/imports/api/teams/teams.js";
import "./after-modal.html";

Template.afterModal.onRendered(() => {
    $('#after-modal').modal();
});

Template.afterModal.helpers({
    team() {
        return Teams.findOne(Session.get('afterTeam'));
    },
    lol() {
        return Teams.findOne(Session.get('afterTeam')).game === 'lol';
    }
});