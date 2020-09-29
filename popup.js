// Load and display trusted sites. Provide a way to remove them.
chrome.storage.sync.get(function (results) {
	const table = document.getElementById('trustedSites')

	Object.keys(results).forEach(domain => {
		const row = document.createElement('tr')
		const domainCell = document.createElement('td')
		const deleteCell = document.createElement('td')

		row.appendChild(domainCell)
		row.appendChild(deleteCell)

		domainCell.innerHTML = domain
		deleteCell.innerHTML = "&#128465;"
		deleteCell.setAttribute('style', `cursor: pointer;`)
		deleteCell.addEventListener('click', () => {
			chrome.storage.sync.remove(domain)
			table.removeChild(row)
		})
		table.appendChild(row)
	})
})

// TODO: Attach functionality to the options checkboxes in `popup.html`. They should save their state in `chrome.storage.sync`, and `content.js` should load their values before running.
