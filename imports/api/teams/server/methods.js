import {Meteor} from "meteor/meteor";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {Random} from "meteor/random";
import {Teams} from "../teams.js";

Meteor.methods({
    'teams.insert'({game, name, description}) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('teams.insert.unauthorized',
                'Vous devez être connecté pour créer une équipe !');

        }
        if (Meteor.user().profile.teamId) {
            throw new Meteor.Error('teams.insert.unauthorized',
                'Vous êtes déjà dans une équipe, il vous est donc impossible d’en créer une nouvelle.');
        }
        const teamId = Teams.insert({
            game: game,
            name: name,
            description: description,
            validated: false,
            key: Random.hexString(5),
            userId: Meteor.userId()
        });
        Meteor.users.update(Meteor.userId(), {
            $set: {
                "profile.teamId": teamId,
                "profile.mainRole": 'substitute'
            }
        });
        return teamId;
    },
    'teams.join'({teamId, teamKey}) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('teams.join.unauthorized',
                'Vous devez être connecté pour rejoindre une équipe !');
        }
        if (!teamKey) {
            throw new Meteor.Error('teams.join.nokey', 'Vous devez saisir la clé d’invitation pour réjoindre cette équipe !')
        }
        if (Meteor.user().profile.teamId) {
            throw new Meteor.Error('teams.join.unauthorized',
                'Vous ne pouvez rejoindre une autre équipe.');
        }
        if (Teams.findOne(teamId).key === teamKey) {
            Meteor.users.update(Meteor.userId(), {
                $set: {
                    "profile.teamId": teamId,
                    "profile.mainRole": 'substitute'
                }
            });
        } else {
            throw new Meteor.Error('teams.join.unauthorized',
                'La clé d’invitation est invalide !');
        }
    },
    'teams.leave'({teamId}) {
        let team = Teams.findOne(teamId);
        if (!team) {
            throw new Meteor.Error('teams.leave.notfound', 'Cette équipe n’existe pas (incroyable non ?).');
        }
        if (team.userId === Meteor.userId()) {
            throw new Meteor.Error('teams.leave.unauthorized',
                'Vous ne pouvez pas quitter cette équipe, vous en êtes le chef.');
        }
        if (!Meteor.userId()) {
            throw new Meteor.Error('teams.leave.unauthorized', 'Vous devez être connecté pour quitter une équipe !');
        }
        if (Meteor.user().profile.teamId !== teamId) {
            throw new Meteor.Error('teams.leave.unauthorized', 'Vous ne pouvez pas quitter cette équipe, vous n’y êtes déjà plus !');
        }
        Meteor.users.update(Meteor.userId(), {
            $unset: {
                "profile.teamId": 1,
                "profile.mainRole": 1
            }
        });
    },
    'teams.roles.change'({userId, role}) {
        Meteor.users.update(userId, {
            $set: {
                "profile.mainRole": role
            }
        });
    },
    'users.profile.complete'({summonerName, steamId}) {
        Meteor.users.update(Meteor.userId(), {
            $set: {
                "profile.summonerName": summonerName,
                "profile.steamId": steamId
            }
        });
    }
});