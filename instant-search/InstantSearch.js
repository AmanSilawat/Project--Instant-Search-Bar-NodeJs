/**
 * @typeof {Object} InstantSearchOptinos
 * @property {URL} searchUrl the url which the search bar will query to retrive resutls
 * @property {string} queryPrams the name of the query parameter to be userd in each request
 * @property {Fucntion} responseParser Takes the response from the instant search and returns an array of results
 * @property {Fucntion} templateFuntion Takes an instant search result and produces the HTML for it
 */
class InstantSearch {
    /**
     * 
     * @param {HTMLElement} instantSearch The container for the instant search 
     * @param {InstantSearchOptinos} options  A list of options for configration
     */
    constructor(instantSearch, options) {
        this.options = options;
        this.elements = {
            main: instantSearch,
            input: instantSearch.querySelector('.instant-search__input'),
            resultsContainer: document.createElement('div')
        }

        this.elements.resultsContainer.classList.add('instant-search__results-container');
        this.elements.main.appendChild(this.elements.resultsContainer);

        this.addListeners();
    }

    /**
     * Added event listners for element of the instant search.
     */
    addListeners() {
        let delay;

        this.elements.input.addEventListener('input', () => {
            clearTimeout(delay);

            const query = this.elements.input.value;

            delay = setTimeout(() => {
                if (query.length < 3) {
                    this.populateResults([]);
                    return;
                }

                this.performSearch(query).then((reuslt) => {
                    this.populateResults(reuslt);
                });
            }, 500);
        });

        this.elements.input.addEventListener('focus', () => {
            this.elements.resultsContainer.classList.add('instant-search__results-container--visible');
        });

        this.elements.input.addEventListener('blur', () => {
            this.elements.resultsContainer.classList.remove('instant-search__results-container--visible');
        });
    }

    /**
     * Updates the HTML to display each result under the search bar.
     * 
     * @param {Object[]} results
     */
    populateResults(results) {
        // Clear all exisiting results
        while (this.elements.resultsContainer.firstChild) {
            this.elements.resultsContainer.removeChild(this.elements.resultsContainer.firstChild);
        }

        // update list of results under the search bar
        for (const result of results) {
            this.elements.resultsContainer.appendChild(this.createResultElement(result));
        }

    }

    /**
     * Crate the HTML respresnt a single result in the list of results.
     * 
     * @param {Object} result An instant search result
     * @returns {HTMLAnchorElement}
     */
    createResultElement(result) {
        const anchorElement = document.createElement('a');

        anchorElement.classList.add('instant-search__result');
        anchorElement.insertAdjacentHTML('afterbegin', this.options.templateFunction(result));

        // If provided, add a link for the result
        if ('href' in result) {
            anchorElement.setAttribute('href', result.href);
        }

        return anchorElement;
    }

    /**
     * Makes a request at the search URL and retrives results.
     * 
     * @param {query} query Search query
     * @returns {Promise<Object[]>}
     */
    performSearch(query) {
        const url = new URL(this.options.searchUrl.toString());
        console.log(url);

        url.searchParams.set(this.options.queryParam, query);

        // console.log(url.toString());
        this.setLoading(true);
        return fetch(url, {
            method: 'get'
        }).then((response) => {
            if (response.status != 200) {
                throw new Error('Someting went wrong with the search!');
            }

            return response.json();
        }).then((responseData) => {
            console.log(responseData);

            return this.options.responseParser(responseData);
        }).catch(error => {
            console.log(error);

            return [];
        }).finally((result) => {
            this.setLoading(false);

            return result;
        });
    }

    /**
     * Show or hides the loading indicator for the search bar.
     * 
     * @param {boolean} b  True will show the loading indicator, false will not
     */
    setLoading(b) {
        this.elements.main.classList.toggle('instant-search--loading');
    }
}

export default InstantSearch;