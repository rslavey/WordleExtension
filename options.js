function save_options() {
    var showTotals = document.getElementById('showtotals').checked;
    var consoleWords = document.getElementById('consolewords').checked;
    chrome.storage.sync.set({
        showTotals: showTotals,
        consoleWords: consoleWords
    }, function () {
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        showTotals: false,
        consoleWords: false
    }, function (items) {
        document.getElementById('showtotals').checked = items.showTotals;
        document.getElementById('consolewords').checked = items.consoleWords;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);