// Load and display trusted sites. Provide a way to remove them.
chrome.storage.sync.get(function (results) {
	const table = document.getElementById('trustedSites')

	Object.keys(results).filter(key => !key.startsWith('option#')).forEach(domain => {
		const row = document.createElement('tr')
		const domainCell = document.createElement('td')
		const deleteCell = document.createElement('td')

		row.appendChild(deleteCell)
		row.appendChild(domainCell)

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

// Load and display options. Hook them up to storage for interactivity.
chrome.storage.sync.get(function (results) {
	const options = Object.keys(results).filter(key => key.startsWith('option#')).reduce((filtered, key) => {
		filtered.set(key.replace(/^option#/, ''), results[key])

		return filtered
	}, new Map())

	for (const [optionName, optionValue] of options) {
		const input = document.getElementById(optionName)

		if (!input) {
			throw new Error(`Unable to find input element for option ${optionName}`)
		}

		if (!(input instanceof HTMLInputElement && input.type === `checkbox`)) {
			throw new Error(`Element for option ${optionName} is not a checkbox input.`)
		}

		input.checked = Boolean(optionValue)
		input.addEventListener('change', () => chrome.storage.sync.set({ [`option#${optionName}`]: Number(input.checked) }))
	}
})

// TODO: Attach functionality to the options checkboxes in `popup.html`. They should save their state in `chrome.storage.sync`, and `content.js` should load their values before running.
