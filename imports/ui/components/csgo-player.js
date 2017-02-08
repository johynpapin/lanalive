import {FlowRouter} from "meteor/kadira:flow-router";
import {sAlert} from "meteor/juliancwirko:s-alert";
import {Teams} from "/imports/api/teams/teams.js";
import "./csgo-player.html";

Template.csgoPlayer.onRendered(() => {
    $('select').material_select(); // TODO : id
});

Template.csgoPlayer.helpers({
    isTeamOwner() {
        return this._id === Teams.findOne(FlowRouter.getParam('teamId')).userId;
    }
});

Template.csgoPlayer.events({
    'change select'(e) {
        sAlert.info('Changement du rôle...');
        Meteor.call('teams.roles.change', {
            userId: this._id,
            role: e.currentTarget.value
        }, err => {
            if (err) {
                sAlert.error('Désolé, une erreur est survenue.');
            } else {
                sAlert.success('Le nouveau rôle a bien été enregistré.');
            }
        });
    }
});