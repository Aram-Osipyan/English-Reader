function fetchComponent(container, source){
    fetch(source)
        .then(response => response.text())
        .then(html => {
            container.innerHTML = html;
            loadScripts(container);
        });
}

function loadScripts(container){
    const scripts = container.querySelectorAll('script');

    if (scripts !== null && scripts.length > 0) {
        const loadScript = index => {
            if (index < scripts.length) {
                const newScript = document.createElement("script");

                if (scripts[index].innerText) {
                    const inlineScript = document.createTextNode(scripts[index].innerText);
                    newScript.appendChild(inlineScript);
                }
                else {
                    newScript.src = scripts[index].src;
                }
                scripts[index].parentNode.removeChild(scripts[index]);
                newScript.addEventListener("load", event => loadScript(index + 1));
                newScript.addEventListener("error", event => loadScript(index + 1));
                container.appendChild(newScript);
            }
        }

        loadScript(0); // Start loading script 0. Function is recursive to load the next script after the current one has finished downloading.
    }
}
export {fetchComponent}