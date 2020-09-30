/**
 * References:
 * - History: https://developer.chrome.com/extensions/history
 * - Message Passing: https://developer.chrome.com/extensions/messaging
 */

const options = [
	'warnOnInput',
	'warnOnVisit',
]

// Initialize option values
chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set(options.reduce((object, optionName) => {
		object[`option#${optionName}`] = 1

		return object
	}, {}))
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if ('firstVisitTimeFor' in request) {
		const domain = request.firstVisitTimeFor

		// This fails to send a message if async/await is used, so use promise chains. See https://stackoverflow.com/a/56483156/3246022 for a little more information. This working solution was discovered through trial and error combined with that answer
		getEarliestVisitTime(domain)
			.then(firstVisitDate => {
				const stringified = firstVisitDate ? firstVisitDate.toISOString() : "null"
				console.debug(`sending response ${stringified}`)
				sendResponse(stringified)
			})

		return true // return `true` to make sure the message channel stays open until the response is sent. See https://developer.chrome.com/extensions/runtime#event-onMessage for more details.
	}

	throw new Error(`Not sure how to handle request ${JSON.stringify(request)}`)
})

/**
 * @param {string} domain
 * @return {Promise<Date | null>}
 */
function getEarliestVisitTime(domain) {
	console.debug(`finding history for ${domain}`)

	return new Promise(resolve =>
		// This search only returns the latest visit for each page, so after getting the latest, we'll need to get all visits.
		chrome.history.search(
			{
				text: "",  // this will cause all history entries to be returned. Searching doesn't return all results that I'd expect it to, so get all results, and then filter them in this code.
			},
			async results => {
				const withCorrectDomain = results.filter(result => result.url.startsWith(`http://${domain}`) || result.url.startsWith(`https://${domain}`))

				console.debug(`found matching history results ${JSON.stringify(withCorrectDomain)}`)

				if (withCorrectDomain.length === 0) {
					return resolve(null)
				}

				const allVisits = flatten(await Promise.all(withCorrectDomain.map(({ url }) => getAllVisits(url))))
				const earliestVisitTime = Math.min(...allVisits.map(visit => visit.visitTime))
				const earliestVisit = new Date(earliestVisitTime)

				console.debug(`found all visits: ${JSON.stringify(allVisits)}`)
				console.debug(`earliest visit time: ${earliestVisit}`)

				resolve(earliestVisit)
			}
		)
	)
}

/**
 * @param {string} url exactly as returned by the chrome history search response
 * @return {Promise<Array<chrome.history.VisitItem>>}
 */
function getAllVisits(url) {
	console.debug(`finding visits for ${url}`)

	return new Promise(resolve => {
		chrome.history.getVisits({ url }, resolve)
	})
}

/**
 * @template T
 * @param {Array<Array<T>>} arrays
 * @return {Array<T>}
 */
function flatten(arrays) {
	return arrays.reduce((flattened, array) => flattened.concat(array), [])
}
