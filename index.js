const API_KEY = "6f895e086fef4384af27c0873c6fa867";
const url = "https://newsapi.org/v2/everything?q=";


window.addEventListener("load", () => fetchNews("India"));

function relode() {
    window.location.reload();
}

async function fetchNews(query)
{
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles); 
}

function bindData(articles)
{
    const cardsContainer = document.getElementById('cards-container');
    const newsCradTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML='';
    
    articles.forEach((article) => {
        if(!article.urlToImage) return;

        const cardsClone = newsCradTemplate.content.cloneNode(true);
        fillDataInCards(cardsClone, article);
        console.log(article);
        cardsContainer.appendChild(cardsClone);

    });

    function fillDataInCards(cardsClone, article)
    {
        const newsImg = cardsClone.querySelector('#news-img');
        const newsTitle = cardsClone.querySelector('#news-title');
        const newsSource = cardsClone.querySelector('#news-source');
        const newsDesc = cardsClone.querySelector('#news-desc');


        newsImg.src = article.urlToImage;
        newsTitle.innerHTML = article.title;
        newsDesc.innerHTML = article.description;


        const date = new Date(article.publishedAt).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta"
        });
        
        newsSource.innerHTML = `${article.source.name} . ${date}`

        cardsClone.firstElementChild.addEventListener("click", () => {
            window.open(article.url, "_blank");
        })
    

    }
}

let curSelectedNav = null;
function onNavItemClick(id)
{
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-input');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
})