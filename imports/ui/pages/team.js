import {Template} from "meteor/templating";
import {FlowRouter} from "meteor/kadira:flow-router";
import {sAlert} from "meteor/juliancwirko:s-alert";
import {Teams} from "/imports/api/teams/teams.js";
import "../components/join-team-modal.js";
import "../components/lol-player.js";
import "./team.html";

Template.team.onCreated(function () {
    this.autorun(() => {
        this.subscribe('teams.public');
        this.subscribe('users.public');
    });
});
Template.team.onRendered(function () {
    $(".button-collapse").sideNav();
});

Template.team.helpers({
    teamId() {
        return FlowRouter.getParam('teamId');
    },
    team() {
        return Teams.findOne(FlowRouter.getParam('teamId'));
    },
    joinable() {
        return !Meteor.user().profile.teamId;
    },
    isMember() {
        if (Meteor.user()) {
            return Meteor.user().profile.teamId === FlowRouter.getParam('teamId');
        }
    },
    players() {
        return Meteor.users.find({
            "profile.teamId": FlowRouter.getParam('teamId'),
            "profile.mainRole": {
                $not:'substitute'
            }
        });
    },
    substitutes() {
        return Meteor.users.find({
            "profile.teamId": FlowRouter.getParam('teamId'),
            "profile.mainRole": 'substitute'
        });
    },
    imTeamOwner() {
        return Meteor.userId() === Teams.findOne(FlowRouter.getParam('teamId')).userId;
    }
});

Template.team.events({
    'click #leave-button'() {
        sAlert.info('Le système traite votre demande...');
        Meteor.call('teams.leave', {
            teamId: FlowRouter.getParam('teamId')
        }, err => {
            if (err) {
                sAlert.error(err.reason);
            } else {
                sAlert.success('Vous n’êtes désormais plus dans cette équipe !');
            }
        });
    },
    'click #join-team-logout'() {
        sAlert.warning('Vous devez être connecté pour rejoindre une équipe.');
    }
});