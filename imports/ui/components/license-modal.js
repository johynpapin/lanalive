import {$} from "meteor/jquery";
import "./license-modal.html";

Template.licenseModal.onRendered(() => {
    $('#license-modal').modal();
});