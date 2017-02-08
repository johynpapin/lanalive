import {Template} from "meteor/templating";
import "./key-modal.html";

Template.keyModal.onRendered(() => {
    $('#key-modal').modal();
});