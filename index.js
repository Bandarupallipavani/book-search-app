require('dotenv').config();
document.getElementById("search-button").addEventListener("click", function () {
    const query = document.getElementById("search-input").value;
    const apiKey = process.env.api_key;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById("results");
            resultsContainer.innerHTML = ""; 

            if (data.items) {
                data.items.forEach(item => {
                    const book = item.volumeInfo;

                    const bookElement = document.createElement("div");
                    bookElement.classList.add("result-item");

                    
                    bookElement.innerHTML = `
                    <h3>${book.title || "No Title"}</h3>
                    <p><strong>Authors:</strong> ${book.authors ? book.authors.join(", ") : "Unknown"}</p>
                    <p>${book.description || "No description available"}</p>
                    <img src="${book.imageLinks?.thumbnail || ""}" alt="Book Image" />
                    <p><a href="${book.infoLink || "#"}" target="_blank">More Info</a></p>
                    ${item.accessInfo.pdf.isAvailable ? `<p><a href="${item.accessInfo.webReaderLink}" target="_blank">Read PDF</a></p>` : "<p>PDF not available</p>"}
`;

                    resultsContainer.appendChild(bookElement);
                });
            } else {
                resultsContainer.innerHTML = "<p>No books found.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("results").innerHTML = "<p>Error fetching data. Please try again later.</p>";
        });
});
