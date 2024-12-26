const form = document.getElementById("search-form");
const input = document.getElementById("Input");
const container = document.getElementById("show");

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const search = input.value.toLowerCase();
    input.value = '';

    fetch("./travel_recommendation.json")
        .then(response => response.json())
        .then(data => {
            const results = [];

            if (data.countries) {
                if ("countries".toLowerCase().includes(search)) {
                    data.countries.forEach(country => {
                        country.cities.forEach(city => {
                            results.push({
                                category: 'countries > cities',
                                itemName: city.name,
                                description: city.description,
                                imageUrl: city.imageUrl,
                                country: country.name
                            });
                        });
                    });
                } else {
                    data.countries.forEach(country => {
                        country.cities.forEach(city => {
                            if (city.name.toLowerCase().includes(search)) {
                                results.push({
                                    category: 'countries > cities',
                                    itemName: city.name,
                                    description: city.description,
                                    imageUrl: city.imageUrl,
                                    country: country.name
                                });
                            } else if (city.description && city.description.toLowerCase().includes(search)) {
                                results.push({
                                    category: 'countries > cities',
                                    itemName: city.name,
                                    description: city.description,
                                    imageUrl: city.imageUrl,
                                    country: country.name
                                });
                            }
                        });
                    });
                }
            }

            if (data.temples) {
                if ("temples".toLowerCase().includes(search)) {
                    data.temples.forEach(temple => {
                        results.push({
                            category: 'temples',
                            itemName: temple.name,
                            description: temple.description,
                            imageUrl: temple.imageUrl
                        });
                    });
                } else {
                    data.temples.forEach(temple => {
                        if (temple.description && temple.description.toLowerCase().includes(search)) {
                            results.push({
                                category: 'temples',
                                itemName: temple.name,
                                description: temple.description,
                                imageUrl: temple.imageUrl
                            });
                        }
                    });
                }
            }

            if (data.beaches) {
                if ("beaches".toLowerCase().includes(search)) {
                    data.beaches.forEach(beach => {
                        results.push({
                            category: 'beaches',
                            itemName: beach.name,
                            description: beach.description,
                            imageUrl: beach.imageUrl
                        });
                    });
                } else {
                    data.beaches.forEach(beach => {
                        if (beach.description && beach.description.toLowerCase().includes(search)) {
                            results.push({
                                category: 'beaches',
                                itemName: beach.name,
                                description: beach.description,
                                imageUrl: beach.imageUrl
                            });
                        }
                    });
                }
            }

            if (results.length > 0) {
                container.innerHTML = `<div class="results-container">${results.map(item => `
                    <div class="result-card">
                        <img src="${item.imageUrl}" alt="${item.itemName}" class="result-image">
                        <div class="result-info">
                            <h4 class="result-title">${item.itemName}</h4>
                            <p>${item.description}</p>
                        </div>
                    </div>`).join('')}</div>`;
                    console.log("results displayed", results);
            } else {
                container.innerHTML = "<p>No results found.</p>";
            }

        })
        .catch(error => {
            console.log("ERROR 404: Unable to fetch data", error);
        });
});

const clear = document.getElementById("Clear-button");

clear.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('Input').value = '';
    container.innerHTML = ''; // Clear the results
});


