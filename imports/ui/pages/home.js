import {$} from "meteor/jquery";
import {sAlert} from "meteor/juliancwirko:s-alert";
import {Template} from "meteor/templating";
import {Session} from "meteor/session";
import {Teams} from "/imports/api/teams/teams.js";
import "../components/team-lol.js";
import "../components/add-team-modal.js";
import "../components/after-modal.js";
import "../components/complete-modal.js";
import "./home.html";

Template.home.onCreated(function () {
    this.autorun(() => {
        this.subscribe('teams.public');
    });
});

Template.home.onRendered(function () {
    if (Session.get('game') === 'lol') {
        $('#csgo').css('flex', '1 0 40%');
        $('#lol').css('flex', '0 1 60%');
        setTimeout(() => {
            $('#select').css('flex', '0 0 10vh');
        }, 75);
    } else if (Session.get('game') === 'csgo') {
        $('#lol').css('flex', '1 0 40%');
        $('#csgo').css('flex', '0 1 60%');
        setTimeout(() => {
            $('#select').css('flex', '0 0 10vh');
        }, 75);
    }
});

Template.home.helpers({
    selected() {
        return Session.get('game');
    },
    lol() {
        return Session.get('game') === 'lol';
    },
    invalidTeamsExists() {
        return Teams.find({game: 'lol', validated: {$not: true}}).count() > 0;
    },
    invalidTeams() {
        return Teams.find({game: 'lol', validated: {$not: true}});
    },
    validTeamsExists() {
        return Teams.find({game: 'lol', validated: true}).count() > 0;
    },
    csgoTeamsExists() {
        return Teams.find({game: 'csgo'}).count() > 0;
    },
    validTeams() {
        return Teams.find({game: 'lol', validated: true});
    },
    csgoTeams() {
        return Teams.find({game: 'csgo'});
    },
    notReady() {
        return (Session.get('game') === 'lol' && !Meteor.user().profile.summonerName) || (Session.get('game') === 'csgo' && !Meteor.user().profile.steamId);
    }
});

Template.home.events({
    'click #lol'(e, t) {
        Session.set('game', 'lol');
        $('#csgo').css('flex', '1 0 40%');
        $('#lol').css('flex', '0 1 60%');
        setTimeout(() => {
            $('#select').css('flex', '0 0 10vh');
        }, 75);
    },
    'click #csgo'(e, t) {
        Session.set('game', 'csgo');
        $('#lol').css('flex', '1 0 40%');
        $('#csgo').css('flex', '0 1 60%');
        setTimeout(() => {
            $('#select').css('flex', '0 0 10vh');
        }, 75);
    },
    'mouseenter #lol'() {
        $('#lol').find('.overlay').fadeIn('fast');
    },
    'mouseleave #lol'() {
        $('#lol').find('.overlay').fadeOut('fast');
    },
    'mouseenter #csgo'() {
        $('#csgo').find('.overlay').fadeIn('fast');
    },
    'mouseleave #csgo'() {
        $('#csgo').find('.overlay').fadeOut('fast');
    },
    'click #add-team-not-connected'() {
        sAlert.warning('Vous devez être connecté afin de créer une équipe.');
    }
});