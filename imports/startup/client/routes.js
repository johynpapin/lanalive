import {FlowRouter} from "meteor/kadira:flow-router";
import {BlazeLayout} from "meteor/kadira:blaze-layout";
import "../../ui/layouts/main-layout.js";
import "../../ui/pages/app-not-found.js";
import "../../ui/pages/home.js";
import "../../ui/pages/team.js";

FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('mainLayout', {content: 'home'});
    }
});

FlowRouter.route('/:teamId', {
    name: 'team',
    action: function() {
        BlazeLayout.render("mainLayout", {content: 'team'});
    }
});