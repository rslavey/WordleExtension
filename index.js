window.WordleStats = {};
async function injectScript() {
    chrome.storage.sync.get({
        showTotals: false,
        consoleWords: false,
        hideGuess: false
    }, function (items) {
        window.WordleStats.showTotals = items.showTotals;
        window.WordleStats.consoleWords = items.consoleWords;
        window.WordleStats.hideGuess = items.hideGuess;
        var scriptElement = document.createElement("script");
        scriptElement.id = 'WordleStats_script'
        scriptElement.setAttribute('src', chrome.runtime.getURL('code.js'));
        document.head.appendChild(scriptElement);
    });
    await sleepUntil(() => document.getElementById('WordleStats_script'), 5000).then((value) => {
        document.dispatchEvent(new CustomEvent('WordleStats_connectInjectedOptions', { "detail": { "hideGuess": window.WordleStats.hideGuess, "consoleWords": window.WordleStats.consoleWords, "showTotals": window.WordleStats.showTotals,  } }));
    });
}

async function sleepUntil(f, timeoutMs) {
    return new Promise((resolve, reject) => {
        let timeWas = new Date();
        let wait = setInterval(function () {
            if (f) {
                clearInterval(wait);
                resolve();
            } else if (new Date() - timeWas > timeoutMss) { // Timeout
                clearInterval(wait);
                reject();
            }
        }, 20);
    });
}

// function processRows() {
//     var gs = JSON.parse(localStorage.gameState);
//     var bs = gs.boardState;
//     var evals = gs.evaluations;

//     var missingLetters = [];

//     var aws = [];
//     var exs = [];
//     var awTest = false;
//     var exTest = false;
//     for (var i = 0; i < bs.length; i++) {
//         if (bs[i] != '') {
//             var ls = [...bs[i]];
//             var aw = new Array(5);
//             var ex = new Array(5);
//             var lml = []
//             for (var ii = 0; ii < ls.length; ii++) {
//                 switch (evals[i][ii]) {
//                     case 'correct':
//                         ex[ii] = [ii, bs[i][ii]];
//                         exTest = true;
//                         break;
//                     case 'present':
//                         aw[ii] = [ii, bs[i][ii]];
//                         awTest = true;
//                         break;
//                     default:
//                         lml.push(ls[ii]);
//                 }
//             }
//             aws.push(aw);
//             exs.push(ex);
//             missingLetters = missingLetters.concat(lml.filter(x => !aws.some(xx => { return xx.some(xxx => xxx[1] == x) })).filter(x => !exs.some(xx => { return xx.some(xxx => xxx[1] == x) })));
//             console.log(missingLetters);
//             const matchWords = wordList.filter(function (v) {
//                 if ([...v].some(vl => {
//                     return missingLetters.includes(vl);
//                 })) {
//                     return false;
//                 }
//                 var awm = aws.every(aw => {
//                     return aw.every(w => {
//                         return v.indexOf(w[1], w[0]) != w[0] && v.indexOf(w[1]) >= 0;
//                     });
//                 });
//                 var exm = exs.every(ex => {
//                     return ex.every(w => {
//                         return v.indexOf(w[1], w[0]) == w[0];
//                     });
//                 });
//                 return awTest && exTest ? awm && exm : awTest ? awm : exTest ? exm : true;
//             });
//             if (window.WordleStats.consoleWords) {
//                 console.log(matchWords);
//             }
//             var valEle = document.getElementById(`row${i}Totals`);
//             if (valEle) {
//                 var pct = matchWords.length / wordList.length;
//                 var pctText = `${((1 - (bs[i] == gs.solution ? 0 : Math.round((pct + Number.EPSILON) * 10000) / 10000)) * 100).toFixed(3)}`;
//                 var text = `${(window.WordleStats.showTotals ? `${(bs[i] == gs.solution ? 0 : matchWords.length)}` : `${pctText}%`)}`;
//                 valEle.innerText = text;
//             }
//         }
//     }
// }

// document.addEventListener('WordleStats_connectExtension', function (e) {
//     processRows();
// });

// document.addEventListener('WordleStats_tile', function (e) {
//     console.log(e);
//     return false;
//     // sendResponse({ hideElement: true }); //respond however you like
// }, false);

// window.addEventListener('WordleStats_tileUpdated', function (e) {
//     console.log(e);
//     // if (event.origin !== "http://example.org:8080")
//     //   return;

//     // // ...
// }, false);

(async function main() {
    await injectScript();
})();

