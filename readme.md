### What it does

This browser extension displays a warning for any page or embedded page  with a domain that you haven't visited before, or that you've first visited very recently. It can help to prevent phishing attacks by warning you about pages that may look legitimate, but are spoofed, and don't match the legitimate domains in your browser history.

It can be configured to show warnings when you first visit a page, or when you input text on a page.

### Installation

The extension hasn't yet been published anywhere. To install:
1. Download the code: https://github.com/Tyler-Murphy/New-Site-Warning-browser-extension/archive/master.zip
2. Unzip it
3. Go to [chrome://extensions](chrome://extensions)
4. Use the toggle in the upper right corner to enable developer mode
5. Click the "Load Unpacked" button and select the unzipped code folder

### How it works

`content.js` runs on all pages. It sends queries to the back-end, `background.js`, which has access to the browser's history API, and can tell `content.js` whether a page has been visited before. If the page hasn't been visited before, `content.js` displays a warning on the page.

### Development

Development resources:
* Extension examples: https://chromium.googlesource.com/chromium/src/+/master/chrome/common/extensions/docs/examples

To do:
* Allow persistent warnings for a site as long as you've never entered data on the site
* A mode in which warnings for a domain must be disabled explicitly to prevent them from showing up every time you use the site.

### Credits

[Danny Rivers](https://github.com/cdeevfrr) had the idea for this extension.

Icons are from https://freeiconshop.com/icon/error-icon-flat/
