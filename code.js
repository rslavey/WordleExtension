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
async function solve(callback) {
    await sleepUntil(() => document.getElementById('game-app').children, 5000).then((value) => {
        var rows = document.body.getElementsByTagName('game-app')[0].$board.children;
        for (var i = 0; i < rows.length; i++) {
            var pd = document.body.getElementsByTagName('game-app')[0].$board.children[i];
            var bc = pd.getBoundingClientRect();
            const rowTotals = document.createElement('div');
            rowTotals.id = `row${i}Totals`;
            rowTotals.style.cssText = `position:absolute;top:${bc.bottom - 10 - (bc.height / 2)}px;left:${bc.right + 20}px;width: 200px;height: 20px;color: #fff;`;
            document.body.appendChild(rowTotals);
        }
        document.dispatchEvent(new CustomEvent('WordleStats_connectExtension', {}));
    });
}

function resize() {
    var rows = document.body.getElementsByTagName('game-app')[0].$board.children;
    for (var i = 0; i < rows.length; i++) {
        var valEle = document.getElementById(`row${i}Totals`);
        var pd = document.body.getElementsByTagName('game-app')[0].$board.children[i];
        var bc = pd.getBoundingClientRect();
        valEle.style.cssText = `position:absolute;top:${bc.bottom - 10 - (bc.height / 2)}px;left:${bc.right + 20}px;width: 200px;height: 20px;color: #fff;`;
    }
}



this.wordle.bundle.GameApp.prototype.evaluateRow = (function () {
    var cached_function = this.wordle.bundle.GameApp.prototype.evaluateRow;
    return function () {
        var result = cached_function.apply(this, arguments);
        document.dispatchEvent(new CustomEvent('WordleStats_connectExtension', {}));
        return result;
    };
})();

window.addEventListener('resize', resize);

(async function main() {
    await solve();
})();


