// get the search button element
const btnSearch = document.getElementById('btnSearch');

function searchRecommendation() {
    // get the input value
    const input = document.getElementById('searchInput').value.toLowerCase();
    // get the result div
    const resultDiv = document.getElementById('result');
    // fetch the data
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            // fetch the exact data
            const countries = data.countries.find(item => item.name.toLowerCase() === input);
            const temples = data.temples.find(item => item.name.toLowerCase() === input);
            const beaches = data.beaches.find(item => item.name.toLowerCase() === input);
            let all_countries;
            let all_temples;
            let all_beaches;
            // if the given word is beach
            if (['beach', 'beaches'].includes(input.toLowerCase())) {
                // get all beaches
                all_beaches = data.beaches;
            } else if (['country', 'countries'].includes(input.toLowerCase())) {
                // get all countries
                all_countries = data.countries;
            } else if (['temple', 'temples'].includes(input.toLowerCase())) {
                // get all temples
                all_temples = data.temples;
            }
            // if there are no results
            if (countries==null && temples==null && beaches==null && all_countries==null && all_beaches==null && all_temples==null) {
                // return that no results were found
                resultDiv.innerHTML = 'Results not found.';
            // if there are results
            } else {
                // if there are all_countries results
                if (all_countries) {
                    all_countries.forEach(country => {
                        // get the exact cities therein
                        const cities=country.cities;
                        // return the exact results
                        resultDiv.innerHTML += `<h2>${country.name}</h2>`;
                        // return the exact results cities therein
                        cities.forEach(city => {
                            resultDiv.innerHTML += `<p><strong>${city.name}</strong></p>`;
                            resultDiv.innerHTML += `<img src="${city.imageUrl}">`
                            resultDiv.innerHTML += `<p><strong>Description:</strong> ${city.description}</p>`;
                        });
                    });
                }
                // if there are all_beaches results
                if (all_beaches) {
                    all_beaches.forEach(beach => {
                        // return the exact results beaches therein
                        resultDiv.innerHTML += `<p><strong>${beach.name}</strong></p>`;
                        resultDiv.innerHTML += `<img src="${beach.imageUrl}">`
                        resultDiv.innerHTML += `<p><strong>Description:</strong> ${beach.description}</p>`;
                    });
                }
                // if there are all_temples results
                if (all_temples) {
                    all_temples.forEach(temple => {
                        // return the exact results temples therein
                        resultDiv.innerHTML += `<p><strong>${temple.name}</strong></p>`;
                        resultDiv.innerHTML += `<img src="${temple.imageUrl}">`
                        resultDiv.innerHTML += `<p><strong>Description:</strong> ${temple.description}</p>`;
                    });
                }
                // if there are countries results
                if (countries) {
                    // get the exact cities therein
                    const cities=countries.cities;
                    // return the exact results
                    resultDiv.innerHTML += `<h2>${countries.name}</h2>`;
                    // return the exact results cities therein
                    cities.forEach(city => {
                        resultDiv.innerHTML += `<p><strong>${city.name}</strong></p>`;
                        resultDiv.innerHTML += `<img src="${city.imageUrl}">`
                        resultDiv.innerHTML += `<p><strong>Description:</strong> ${city.description}</p>`;
                    });
                }
                // if there are temples results
                if (temples) {
                    // return the exact results temples therein
                    resultDiv.innerHTML += `<p><strong>${temples.name}</strong></p>`;
                    resultDiv.innerHTML += `<img src="${temples.imageUrl}">`
                    resultDiv.innerHTML += `<p><strong>Description:</strong> ${temples.description}</p>`;
                }
                // if there are beaches results
                if (beaches) {
                    // return the exact results beaches therein
                    resultDiv.innerHTML += `<p><strong>${beaches.name}</strong></p>`;
                    resultDiv.innerHTML += `<img src="${beaches.imageUrl}">`
                    resultDiv.innerHTML += `<p><strong>Description:</strong> ${beaches.description}</p>`;
                }
            }
        })
        .catch(error => {
            console.log('Error:',error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
    }

// add an event listener to the search button
btnSearch.addEventListener('click', searchRecommendation);