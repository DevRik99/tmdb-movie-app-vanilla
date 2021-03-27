const init = async () => {
  const token = "?api_key=97ce4b0f504fb11065795483497a713a&language=es";
  const urlBase = "https://api.themoviedb.org/3/";
  const getListGeners = async (url) => {
    const res = await fetch(urlBase + url + token);
    const { genres } = await res.json();
    return genres;
  };
  const getLastedMovies = async (url, query) => {
    const res = await fetch(urlBase + url + token + query);
    const { results } = await res.json();
    return results;
  };
  const createListGeners$ = (ul, data) => {
    data.forEach(({ name, id }) => {
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      li.innerText = name;
      ul.appendChild(li);
    });
  };
  const createCardMovie = (el, data) => {
    data.forEach(
      ({ poster_path, title, vote_average, overview, release_date, adult }) => {
        const cardMovie = /*html*/ `
        <div class="col-md-3">
            <div class="card mb-5 shadow  w-100" >
            <img class="card-img-top" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${poster_path}" alt="${title}">
            <div class="card-body">
            <h5 class="card-title text-center">${title}</h5>
            <p class="card-text">${overview}</p>
            </div>
            <div class="card-footer font-weight-bold text-center"> Valoracion : ${vote_average}</div>
            </div>
        </div>
       `;
        el.innerHTML += cardMovie;
      }
    );
  };
  const genersUl = document.getElementById("listGeneros");
  const geners = await getListGeners("genre/movie/list");
  const cardContainer = document.getElementById("cardContainer");
  const lastedMovies = await getLastedMovies(
    "movie/top_rated",
    "&page=1&region=sa"
  );
  createListGeners$(genersUl, geners);
  createCardMovie(cardContainer, lastedMovies);

  //   genres.forEach(({ name, id }) => {
  //     const li = document.createElement("li");
  //     li.classList.add("list-group-item");
  //     li.innerText = name;
  //     generos.appendChild(li);
  //   });
  //   const app = document.getElementById("app");
  //   const createItemCard = (el, clase, text, src) => {
  //     const el$ = document.createElement(el);
  //     el$.classList.add(clase);
  //     if (text) el$.innerText = text;
  //     if (src) el$.src = src;
  //     return el$;
  //   };
  //   for (const movie of movies) {
  //     const card = createItemCard("div", "card");
  //     const img = createItemCard(
  //       "img",
  //       "card-item-top",
  //       null,
  //       movie.large_cover_image
  //     );
  //     const cardBody = createItemCard("div", "card-body");
  //     const h5 = createItemCard("h5", null, movie.title);
  //     //Aca se construye la card
  //     cardBody.appendChild(h5);
  //     card.appendChild(img);
  //     card.appendChild(cardBody);
  //     app.appendChild(card);
  //   }
};
init();
