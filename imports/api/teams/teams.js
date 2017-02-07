import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const Teams = new Mongo.Collection('teams');

Teams.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    }
});

Teams.schema = new SimpleSchema({
    _id: {type: String, regEx: SimpleSchema.RegEx.Id},
    key: {type: String},
    game: {type: String},
    name: {type: String},
    description: {type: String},
    validated: {type: Boolean},
    userId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}
});

Teams.attachSchema(Teams.schema);

Teams.publicFields = {
    name: 1,
    game: 1,
    description: 1,
    validated: 1,
    userId: 1,
    key: 1 // TODO aaaah que c’est moche damned damned !!! 42 olala
};