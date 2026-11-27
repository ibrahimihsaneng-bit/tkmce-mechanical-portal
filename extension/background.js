// MECH TKMCE Focus Companion — Background Service Worker
chrome.runtime.onInstalled.addListener(() => {
  console.log('MECH TKMCE Focus Companion installed.');
  chrome.storage.local.set({
    focusActive: false,
    currentGoal: 'Understand conduction and solve 3 problems',
    allowedAcademicSites: ['tkmce.ac.in', 'nptel.ac.in', 'ocw.mit.edu', 'wikipedia.org']
  });
});

// Alarm for session expiry
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'focusSessionExpiry') {
    chrome.declarativeNetRequest.updateEnabledRulesets({
      disableRulesetIds: ['ruleset_1']
    });
    chrome.storage.local.set({ focusActive: false });
    console.log('Focus session expired. Rules disabled safely.');
  }
});