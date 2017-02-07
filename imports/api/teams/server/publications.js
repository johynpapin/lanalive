import {Meteor} from "meteor/meteor";
import {Teams} from "../teams.js";

Meteor.publish('teams.public', () => {
    return Teams.find({}, {
        fields: Teams.publicFields
    });
});