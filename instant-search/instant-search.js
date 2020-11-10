import InstantSearch from './InstantSearch.js';

const searchUsers = document.querySelector('#searchUsers');
const instantSearchUsers = new InstantSearch(searchUsers, {
    searchUrl: new URL('http://localhost:3030/search', window.location.origin),
    queryParam: 'q',
    responseParser: (responseData) => {
        return responseData.results;
    },
    templateFunction: (result) => {
        result`
            <div class="instant-search__title">${result.firstName} ${result.lastName}</div>
            <p class="instant-search__paragraph">${result.occupation}</p>
        `;
    }
});

console.log(instantSearchUsers);
