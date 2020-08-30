### How it works

`content.js` runs on all pages. It sends queries to the back-end, `background.js`, which has access to the browser's history API, and can tell `content.js` whether a page has been visited before. If the page hasn't been visited before, `content.js` displays a warning on the page.

The extension hasn't yet been published anywhere. To install it, clone the repository, and then follow your browser's instructions for enabling extension developer mode and installing a development extension.

### Development

Development resources:
* Extension examples: https://chromium.googlesource.com/chromium/src/+/master/chrome/common/extensions/docs/examples

To do:
* Add a closeable overlay to the site, rather than using `alert`s. This is partly because the alerts should be associated with the part of the page they go with. For example, if there's an iframe on the page, the alert for the iframe's domain should go in the iframe, because the top-level page may be a familiar page that doesn't need a warning.
* Allow persistent warnings for a site as long as you've never entered data on the site
* A mode in which warnings for a domain must be disabled explicitly to prevent them from showing up every time you use the site.

### Credits

Icons are from https://freeiconshop.com/icon/error-icon-flat/
