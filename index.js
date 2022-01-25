async function injectScript(){
    var scriptElement = document.createElement("script");
    scriptElement.setAttribute('src', chrome.runtime.getURL('code.js'));
    document.head.appendChild(scriptElement);
}

(async function main() {
    await injectScript();
})();