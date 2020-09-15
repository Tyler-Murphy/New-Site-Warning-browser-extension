const oneMinuteMilliseconds = 60e3;

(async function main() {
    const firstVisitTime = await getResponse({ firstVisitTimeFor: location.hostname })
    const haveVisitedBeforeVeryRecently =
        firstVisitTime !== "null"
        &&
        ((new Date().valueOf() - new Date(firstVisitTime).valueOf()) > oneMinuteMilliseconds)

    if (haveVisitedBeforeVeryRecently) {
        return debugLog(`This site's most recent visit is not in the very recent past, so there's no need for a warning`)
    }

    displayWarning(`Warning: You have not visited this ${isEmbeddedPage() ? `embedded page (${pageDomain})` : `site`} before or first visited it very recently, according to your browser history. Be aware of phishing attempts.`)
})()

async function getResponse(message) {
    debugLog(`sending request: ${JSON.stringify(message)}`)

    return new Promise((resolve, reject) =>
        chrome.runtime.sendMessage(message, function (response) {
            if (!response) {
                debugLog(`no response, checking errors: ${JSON.stringify(chrome.runtime.lastError)}`)
                reject(chrome.runtime.lastError)
            }

            debugLog(`got response: ${response}`)
            resolve(response)
        })
    )
}

/**
 * @param {string} message
 */
function displayWarning(message) {
    const page = document.documentElement
    const warningDiv = document.createElement('div')
    const warningText = document.createElement('p')
    const footerText = document.createElement('p')

    warningDiv.setAttribute('style', `
        all: unset;
        position: fixed;
        z-index: 2147483647;
        background-color: #cc3300;
        color: white;
        font-family: sans-serif;
        margin: 1em;
        padding: 1.5em;
        box-shadow: 0 0 3em 0 #4a4a4a;
    `)

    warningText.innerHTML = message
    warningText.setAttribute('style', `
        all: unset;
        font-weight: bold;
        font-size: 1.4em;
    `)
    warningDiv.appendChild(warningText)

    warningDiv.appendChild(document.createElement('br'))
    warningDiv.appendChild(button('close', () => page.removeChild(warningDiv)))
    warningDiv.appendChild(button('report phishing', () => window.open('https://www.phishing.org/how-to-report-phishing', '_blank')))

    footerText.innerHTML = 'This message was generated by the New Site Warning browser extension.'
    footerText.setAttribute('style', `
        all: unset;
        font-weight: lighter;
        font-size: 0.8em;
    `)
    warningDiv.appendChild(document.createElement('br'))
    warningDiv.appendChild(footerText)

    page.insertAdjacentElement('afterbegin', warningDiv)
}

/**
 * @param {string} text
 * @param {HTMLButtonElement['onclick']} onClick
 * @return {HTMLButtonElement}
 */
function button(text, onClick = () => { }) {
    const element = document.createElement('button')
    const style = `
        all: unset;
        padding: 0.5em;
        margin-top: 1em;
        margin-bottom: 1em;
        margin-right: 1em;
        border: 0.2em solid white;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 0 0.5em 0;
    `

    element.innerHTML = text
    element.setAttribute('style', style)
    element.addEventListener('click', onClick)
    element.addEventListener('mouseenter', () => element.setAttribute('style', style + 'box-shadow: 0 0 1.5em 0;'))
    element.addEventListener('mouseleave', () => element.setAttribute('style', style))

    return element
}

/**
 * From https://stackoverflow.com/a/326076/3246022
 *
 * @return {boolean}
 */
function isEmbeddedPage() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function debugLog(...messages) {
    console.debug(`[New Site Warning browser extension] -`, ...messages)
}
