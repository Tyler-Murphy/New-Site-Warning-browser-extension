const oneMinuteMilliseconds = 60e3;
const pageDomain = location.hostname;
const page = document.documentElement
// top sites from https://moz.com/top500
const topSites = new Set([
    'youtube.com',
    'www.google.com',
    'apple.com',
    'microsoft.com',
    'cloudflare.com',
    'play.google.com',
    'support.google.com',
    'www.blogger.com',
    'youtu.be',
    'linkedin.com',
    'wordpress.org',
    'maps.google.com',
    'en.wikipedia.org',
    'adobe.com',
    'docs.google.com',
    'plus.google.com',
    'vimeo.com',
    'sites.google.com',
    'accounts.google.com',
    'europa.eu',
    'googleusercontent.com',
    'mozilla.org',
    'drive.google.com',
    'uol.com.br',
    'istockphoto.com',
    'medium.com',
    'bp.blogspot.com',
    'bbc.co.uk',
    'es.wikipedia.org',
    'amazon.com',
    'vk.com',
    'facebook.com',
    'line.me',
    'github.com',
    'buydomains.com',
    'reuters.com',
    'www.yahoo.com',
    'myspace.com',
    'paypal.com',
    'w3.org',
    'feedburner.com',
    'mail.google.com',
    'pt.wikipedia.org',
    'live.com',
    'fr.wikipedia.org',
    't.me',
    'whatsapp.com',
    'nytimes.com',
    'imdb.com',
    'gstatic.com',
    'mail.ru',
    'google.co.uk',
    'developers.google.com',
    'news.google.com',
    'google.es',
    'who.int',
    'dailymotion.com',
    'msn.com',
    'creativecommons.org',
    'wikimedia.org',
    'slideshare.net',
    'hugedomains.com',
    'globo.com',
    'theguardian.com',
    'google.co.jp',
    'nih.gov',
    'cnn.com',
    'dropbox.com',
    'bbc.com',
    'google.de',
    'news.yahoo.com',
    'google.com.br',
    'get.google.com',
    'policies.google.com',
    'forbes.com',
    'google.fr',
    'jimdofree.com',
    'change.org',
    'ok.ru',
    'marketingplatform.google.com',
    'opera.com',
    'harvard.edu',
    'office.com',
    'abril.com.br',
    'time.com',
    'draft.blogger.com',
    'aboutads.info',
    'nasa.gov',
    'www.wix.com',
    'plesk.com',
    'books.google.com',
    'elpais.com',
    'bing.com',
    'steampowered.com',
    'namecheap.com',
    'gravatar.com',
    'bit.ly',
    'networkadvertising.org',
    'cpanel.net',
    'huffingtonpost.com',
    'twitter.com',
    'dan.com',
    'un.org',
    'rakuten.co.jp',
    'id.wikipedia.org',
    'fandom.com',
    'google.it',
    'independent.co.uk',
    'amazon.co.jp',
    'samsung.com',
    'archive.org',
    'dailymail.co.uk',
    'tools.google.com',
    'ft.com',
    'wikia.com',
    'cpanel.com',
    'scribd.com',
    'ipv4.google.com',
    'usatoday.com',
    'youronlinechoices.com',
    'themeforest.net',
    'it.wikipedia.org',
    'lefigaro.fr',
    'wsj.com',
    'washingtonpost.com',
    'abcnews.go.com',
    'files.wordpress.com',
    'mediafire.com',
    'picasaweb.google.com',
    'aol.com',
    'fb.com',
    'booking.com',
    'wired.com',
    'www.gov.uk',
    'search.google.com',
    'de.wikipedia.org',
    'ig.com.br',
    'issuu.com',
    'sedo.com',
    'myaccount.google.com',
    'businessinsider.com',
    'goo.gl',
    'android.com',
    'webmd.com',
    'bloomberg.com',
    'amazon.de',
    'code.google.com',
    'photos.google.com',
    'cnet.com',
    'aliexpress.com',
    'amazon.co.uk',
    'pinterest.com',
    'terra.com.br',
    'telegraph.co.uk',
    'hatena.ne.jp',
    'telegram.me',
    'ebay.com',
    'tinyurl.com',
    'thesun.co.uk',
    'cdc.gov',
    'foxnews.com',
    'translate.google.com',
    'google.ru',
    'twitch.tv',
    'ox.ac.uk',
    'gmail.com',
    'secureserver.net',
    'hp.com',
    'stanford.edu',
    'vox.com',
    'thetimes.co.uk',
    'asus.com',
    'ietf.org',
    'wikihow.com',
    'academia.edu',
    'amazon.es',
    'techcrunch.com',
    'eventbrite.com',
    'disney.com',
    'oup.com',
    'welt.de',
    'surveymonkey.com',
    'skype.com',
    'addtoany.com',
    '4shared.com',
    'espn.com',
    'ign.com',
    'ovh.co.uk',
    'newyorker.com',
    'doubleclick.net',
    'wiley.com',
    'enable-javascript.com',
    'wa.me',
    'indiatimes.com',
    'lemonde.fr',
    'nginx.com',
    'naver.com',
    'cbc.ca',
    'rapidshare.com',
    'spotify.com',
    'huffpost.com',
    'imageshack.us',
    'google.co.id',
    'pexels.com',
    'buzzfeed.com',
    'pl.wikipedia.org',
    'xbox.com',
    'britannica.com',
    'dell.com',
    'icann.org',
    'shopify.com',
    'quora.com',
    'ziddu.com',
    'blackberry.com',
    'stackoverflow.com',
    'gizmodo.com',
    'yahoo.co.jp',
    'sciencedaily.com',
    'sputniknews.com',
    'wp.com',
    'channel4.com',
    'google.pl',
    'mit.edu',
    'soundcloud.com',
    'sciencemag.org',
    't.co',
    'pbs.org',
    'dw.com',
    'bitly.com',
    'yandex.ru',
    'deezer.com',
    'sciencedirect.com',
    'vice.com',
    'engadget.com',
    'theatlantic.com',
    'finance.yahoo.com',
    'elmundo.es',
    'weibo.com',
    'worldbank.org',
    'goodreads.com',
    'mashable.com',
    'npr.org',
    'arxiv.org',
    'pixabay.com',
    'photobucket.com',
    'smh.com.au',
    '000webhost.com',
    'sapo.pt',
    'alibaba.com',
    'digg.com',
    'mega.nz',
    'ikea.com',
    'ea.com',
    'cambridge.org',
    'usnews.com',
    'kickstarter.com',
    'nikkei.com',
    'www.wikipedia.org',
    'picasa.google.com',
    'columbia.edu',
    'bt.com',
    'e-recht24.de',
    'metro.co.uk',
    'berkeley.edu',
    'ggpht.com',
    'www.weebly.com',
    'imageshack.com',
    'google.nl',
    'cornell.edu',
    'gofundme.com',
    'netflix.com',
    'afternic.com',
    'sfgate.com',
    'yale.edu',
    'ytimg.com',
    'abc.es',
    'express.co.uk',
    'orange.fr',
    'storage.googleapis.com',
    'shutterstock.com',
    'depositfiles.com',
    'ja.wikipedia.org',
    'akamaihd.net',
    'privacyshield.gov',
    'goo.ne.jp',
    'whitehouse.gov',
    'nypost.com',
    'nydailynews.com',
    'my.yahoo.com',
    'php.net',
    'instagram.com',
    'researchgate.net',
    'over-blog-kiwi.com',
    'mysql.com',
    'loc.gov',
    'target.com',
    'm.wikipedia.org',
    'disqus.com',
    'princeton.edu',
    'ru.wikipedia.org',
    'google.com.tw',
    'detik.com',
    'nvidia.com',
    'list-manage.com',
    'ted.com',
    'news.com.au',
    'playstation.com',
    'unesco.org',
    'spiegel.de',
    'ovh.com',
    'rt.com',
    'bandcamp.com',
    'groups.google.com',
    'naver.jp',
    'nokia.com',
    'www.over-blog.com',
    'nature.com',
    'yadi.sk',
    'forms.gle',
    'search.yahoo.com',
    'amazon.fr',
    'yelp.com',
    'cnbc.com',
    'tripadvisor.com',
    'oracle.com',
    'windowsphone.com',
    'godaddy.com',
    'instructables.com',
    'urbandictionary.com',
    'adssettings.google.com',
    'google.co.in',
    'apache.org',
    'latimes.com',
    'sendspace.com',
    'washington.edu',
    'standard.co.uk',
    'netvibes.com',
    'bp2.blogger.com',
    'psychologytoday.com',
    'cbsnews.com',
    'economist.com',
    'gnu.org',
    'ovh.net',
    'newsweek.com',
    'fifa.com',
    'ibm.com',
    'walmart.com',
    'box.com',
    'bloglovin.com',
    'theverge.com',
    'ria.ru',
    'trustpilot.com',
    'biglobe.ne.jp',
    'guardian.co.uk',
    'about.com',
    'hollywoodreporter.com',
    'hm.com',
    'nationalgeographic.com',
    'umich.edu',
    'google.ca',
    'zendesk.com',
    'scoop.it',
    'variety.com',
    'utexas.edu',
    'addthis.com',
    'mozilla.com',
    'googleblog.com',
    'noaa.gov',
    'mirror.co.uk',
    'abc.net.au',
    'nginx.org',
    'www.livejournal.com',
    'iso.org',
    'prezi.com',
    'oreilly.com',
    'liveinternet.ru',
    'nicovideo.jp',
    'shop-pro.jp',
    'marketwatch.com',
    'm.me',
    'chicagotribune.com',
    'so-net.ne.jp',
    'ap.org',
    'sina.com.cn',
    'evernote.com',
    'bp1.blogger.com',
    'bund.de',
    'repubblica.it',
    'digitaltrends.com',
    'soratemplates.com',
    'ca.gov',
    'zeit.de',
    'xinhuanet.com',
    'offset.com',
    'corriere.it',
    'biblegateway.com',
    'rediff.com',
    'axs.com',
    'vchecks.me',
    'snapchat.com',
    'airbnb.com',
    'lifehacker.com',
    'dreniq.com',
    'uber.com',
    'ebay.co.uk',
    'softpedia.com',
    'merriam-webster.com',
    'avast.com',
    'sports.yahoo.com',
    'adweek.com',
    'megaupload.com',
    'calameo.com',
    'last.fm',
    'interia.pl',
    'state.gov',
    'techradar.com',
    'businessinsider.com.au',
    'cia.gov',
    'pinterest.co.uk',
    'steamcommunity.com',
    'about.me',
    'imgur.com',
    'ftc.gov',
    'example.com',
    'chinadaily.com.cn',
    'ameblo.jp',
    'geocities.com',
    'amzn.to',
    'sky.com',
    'www.canalblog.com',
    'fortune.com',
    'coursera.org',
    'stuff.co.nz',
    'slate.com',
    'lycos.com',
    'ehow.com',
    'apnews.com',
    'fda.gov',
    'mystrikingly.com',
    'plos.org',
    'reverbnation.com',
    'irs.gov',
    'elsevier.com',
    'indiegogo.com',
    'discovery.com',
    'usgs.gov',
    'thestar.com',
    'prestashop.com',
    'upenn.edu',
    'amazon.ca',
    'dreamstime.com',
    'oecd.org',
    'epa.gov',
    'eonline.com',
    'qq.com',
    'chron.com',
    'feedburner.google.com',
    'allaboutcookies.org',
    'ed.gov',
    'rollingstone.com',
    'amazon.in',
    'intel.com',
    'springer.com',
    'fastcompany.com',
    'cam.ac.uk',
    'cbslocal.com',
    'boston.com',
    'answers.yahoo.com',
    'ssl-images-amazon.com',
    'kinja.com',
    '20minutos.es',
    'rottentomatoes.com',
    'entrepreneur.com',
    'doi.org',
    'nba.com',
    'pastebin.com',
    'arstechnica.com',
    'mayoclinic.org',
    'thehill.com',
    'storage.canalblog.com',
    'huawei.com',
    'eff.org',
    'mixcloud.com',
    'allrecipes.com',
    'amazon.it',
    'inc.com',
    'rambler.ru',
    'asahi.com',
    'home.neustar',
    'redhat.com',
    'prnewswire.com',
    'theglobeandmail.com',
    'histats.com',
    'answers.com',
    'a8.net',
    'video.google.com',
    'calendar.google.com',
    'ibtimes.com',
    'fb.me',
    'tabelog.com',
])

    ;
(async function main() {
    const pendingOptions = loadOptions()

    if (await isTrustedSite() || isPopularSite()) {
        return debugLog(`This site is trusted, so no warning.`) // maybe set the icon to a neutral or safe-looking color, rather than red?
    }

    const firstVisitTime = await getResponse({ firstVisitTimeFor: pageDomain })
    const haveVisitedBeforeVeryRecently =
        firstVisitTime !== "null"
        &&
        ((new Date().valueOf() - new Date(firstVisitTime).valueOf()) > oneMinuteMilliseconds)

    if (haveVisitedBeforeVeryRecently) {
        return debugLog(`This site's most recent visit is not in the very recent past, so there's no need for a warning`)
    }

    const warningText = `You have not visited this ${isEmbeddedPage() ? `embedded page (${pageDomain})` : `site`} before or first visited it very recently, according to your browser history. Be aware of phishing attempts.`

    const {
        warnOnVisit,
        warnOnInput,
    } = await pendingOptions

    if (warnOnVisit) {
        displayWarning(warningText)
    }

    if (warnOnInput) {
        page.addEventListener(
            'input',
            () => displayWarning(`It looks like you're entering text. ` + warningText),
            { once: true },
        )
    }
})()

async function loadOptions() {
    return new Promise((resolve, reject) => chrome.storage.sync.get(results => {
        if (!results) {
            return reject(chrome.runtime.lastError)
        }

        resolve(
            Object.keys(results).filter(key => key.startsWith('option#')).reduce((options, key) => {
                options[key.replace(/^option#/, '')] = results[key]

                return options
            }, {})
        )
    }))
}

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
    const warningDiv = document.createElement('div')
    const warningText = document.createElement('p')
    const footerText = document.createElement('p')
    const closeWarning = () => page.removeChild(warningDiv)

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
    warningDiv.appendChild(button('close', closeWarning))
    warningDiv.appendChild(button('report phishing', () => window.open('https://www.phishing.org/how-to-report-phishing', '_blank')))
    warningDiv.appendChild(button('prevent future warnings for this domain', () => {
        closeWarning()
        trustSite()
    }))

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

/**
 * Causes the current site to be permanently trusted.
 *
 * This uses synchronized chrome storage.
 * - docs: https://developer.chrome.com/extensions/storage
 * - quotas: https://developer.chrome.com/extensions/storage#property-sync
 */
async function trustSite() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.set({ [pageDomain]: 1 }, async () => {
            // errors will cause this to "fail immediately" and put the error in `runtime.lastError`, but it's not clear how to tell whether the `lastError` was a result of this failing, or how to tell that this failed "immediately", so there's no error handling for now. I'd like to add some in the future if there's a good way. So this is how error handling works, even though it seems kind of roundabout.
            if (!(await isTrustedSite())) {
                return reject(new Error(`Failed to trust this site: ${chrome.runtime.lastError ? chrome.runtime.lastError.message : `unknown error`}`))
            }


            resolve()
        })
    })
}

/**
 * @return {Promise<boolean>}
 */
async function isTrustedSite() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(pageDomain, items => {
            if (!items) {
                return reject(new Error(`Failed to determine whether this is a trusted site: ${chrome.runtime.lastError ? chrome.runtime.lastError.message : `unknown error`}`))
            }

            if (!Reflect.has(items, pageDomain)) {
                return resolve(false)
            }

            resolve(Boolean(items[pageDomain]))
        })
    })
}

/**
 * @return {boolean}
 */
function isPopularSite() {
    return topSites.has(pageDomain)
}


function debugLog(...messages) {
    console.debug(`[New Site Warning browser extension running on ${location.hostname}] -`, ...messages)
}
