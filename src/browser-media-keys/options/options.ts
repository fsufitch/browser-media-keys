import * as $ from 'jquery';
import 'bootstrap-sass';

import { loadSettings, MediaKeysSettings } from 'browser-media-keys/common';
import './options.scss';

function checkNativeModeSupport() {
  Promise.resolve(false)
    .then(supported => {
      if (!supported) {
        $("#nativeMode").addClass('clickDenied');
        $("#nativeMode input").prop('disabled', true);
        $("#notSupportedWarning").removeClass('d-none');
      }
    });
}

function displaySettings(settings: MediaKeysSettings) {

}

function saveSettings() {
  console.log("Submit clicked");
}

$(document).ready(() => {
  checkNativeModeSupport();
  loadSettings().then(s => displaySettings(s));

  $("#submit").click(() => saveSettings());
});
