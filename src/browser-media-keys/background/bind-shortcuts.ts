import { commandFromString, CommandMessage } from 'browser-media-keys/common';

export function bindMediaShortcuts() {
  console.log('binding media shortcuts');
  browser.commands.onCommand.addListener(cmdStr =>{
    console.log('cmdstr', cmdStr);
    getTabs().then(tabs => sendMediaCommand(cmdStr, tabs));
  });
}

function sendMediaCommand(cmdStr: string, tabs: browser.tabs.Tab[]) {
  console.log('send media command', cmdStr, tabs);
  let command = commandFromString(cmdStr);
  let message: CommandMessage = {command};
  for (let tab of tabs) {
    browser.tabs.sendMessage(tab.id || browser.tabs.TAB_ID_NONE, message);
  }
}

function getTabs() {
  console.log('get tabs');
  return browser.tabs.query({}); // TODO: smarter query for tabs?
}
