import {FlowRouter} from "meteor/kadira:flow-router";
import {sAlert} from "meteor/juliancwirko:s-alert";
import {Teams} from "/imports/api/teams/teams.js";
import "./lol-player.html";

Template.lolPlayer.onRendered(() => {
    $('select').material_select(); // TODO : id
});

Template.lolPlayer.helpers({
    isTeamOwner() {
        return this._id === Teams.findOne(FlowRouter.getParam('teamId')).userId;
    },
    color() {
        if (this) {
            switch (this.profile.mainRole) {
                case 'assassin':
                    return 'red';
                case 'combattant':
                    return 'orange';
                case 'mage':
                    return 'deep-purple';
                case 'support':
                    return 'teal';
                case 'tank':
                    return 'indigo';
                case 'tireur':
                    return 'green';
                case 'substitute':
                    return 'blue-grey';
            }
        }
    }
});

Template.lolPlayer.events({
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