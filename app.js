const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

// ye HTML WALE TAG
const main = document.getElementById("main");
const main1=document.getElementById('main1');
const form = document.getElementById("form");
const search = document.getElementById("search");
///initalyy get fav movies
getMovies(APIURL);

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  // movie aa gyi
  console.log(respData);
  // yaha pe show karenge
  showMovies(respData.results);
  showTopMovies(respData.results);
}
function showTopMovies(movies){
  main1.innerHTML='';
  let moviesData=movies.sort((a,b)=>b.vote_average-a.vote_average)
  let top10Movies=moviesData.filter(ele=>ele.vote_average>6.7);
  // console.log(top10Movies)
  top10Movies.forEach((movie)=>{
    const {poster_path,title,vote_average,overview}=movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    

    movieEl.innerHTML = `
    <img src="${IMGPATH + poster_path}" alt="${title}"/>
    
    <div class="movie-info">
    <h3>${title}</h3>
         <span class="${getClassByRate(vote_average)}">${vote_average}</span>
     </div> 

     <div class="overview">
     <i class="fa-solid fa-heart heart" ></i>
     <h2>Overview:</h2>
     <p>${overview}</p>
     </div>
     `;
     main1.appendChild(movieEl)
    })
  }

function showMovies(movies) {
  //clear main
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;
    // raja
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");


    movieEl.innerHTML = `
    <img src="${IMGPATH + poster_path}" alt="${title}"/>
    
    <div class="movie-info">
    <h3>${title}</h3>
    <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div> 

    <div class="overview">
    <i class="fa-solid fa-heart heart" ></i>
     <h2>Overview:</h2>
     <p>${overview}</p>
     </div>
     `;

     main.append(movieEl)
     
    });

  }

  
function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red';
  }

}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  
  const searchTerm = search.value;
  document.getElementById('slide').style.display='none';
  document.getElementById('heading').style.display='none';
  main.style.display='none';
  document.getElementById('heading1').style.display='none';

  
  if (searchTerm) {
    
    getMovies(SEARCHAPI + searchTerm);
    
    search.value = "";
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const dots = document.querySelectorAll(".dot");
  const totalVideos = dots.length;
  let currentIndex = 0;
  
  // Function to move the carousel to the selected video
  const moveCarousel = (index) => {
    const offset = -index * 85; // Each video is 80vw wide
    track.style.transform = `translateX(${offset}vw)`;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
  };
  
  // Automatic carousel movement
  const autoMove = () => {
    currentIndex = (currentIndex + 1) % totalVideos;
    moveCarousel(currentIndex);
  };
  
  // Start auto-move every 30 seconds
  setInterval(autoMove, 5000); // 30 seconds

  // Manual navigation via dots
  dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      currentIndex = parseInt(e.target.dataset.index);
      moveCarousel(currentIndex);
    });
  });
});

let wishlist=document.getElementById('wishlist');
let val=document.getElementById('val');
let arr=[];

document.addEventListener("DOMContentLoaded", () => {
  // Attach a single event listener to the parent element
  main1.addEventListener("click", (e) => {
    //count wishlist 
    
    // Check if the clicked element has the class 'heart'
    if (e.target.classList.contains("heart")) {
      e.target.classList.toggle("added-to-wishlist");
      alert('added to wishlist.')
      val.innerHTML=Number(val.textContent)+1
       let h3=e.target.closest(".movie").querySelector("h3").innerText;
      let img=e.target.closest(".movie").querySelector("img").src;
      let span=e.target.closest(".movie").querySelector("span").innerText;
      let data={
        heading:h3,
        image:img,
        rating:span
      }
      console.log(data.heading);
      arr.push(data);
      
      localStorage.setItem('wishlistData',JSON.stringify(arr))
    }

  }
);
});
document.addEventListener("DOMContentLoaded", () => {
  // Attach a single event listener to the parent element
  main.addEventListener("click", (e) => {
    //count wishlist 
    
    // Check if the clicked element has the class 'heart'
    if (e.target.classList.contains("heart")) {
      e.target.classList.toggle("added-to-wishlist");
      alert('added to wishlist.')
      count=Number(val.textContent)+1
      val.innerHTML=count;
       let h3=e.target.closest(".movie").querySelector("h3").innerText;
      let img=e.target.closest(".movie").querySelector("img").src;
      let span=e.target.closest(".movie").querySelector("span").innerText;
      let data={
        heading:h3,
        image:img,
        rating:span
      }

      arr.push(data);
      localStorage.setItem('wishlistData',JSON.stringify(arr))
    }

  }
);
});
