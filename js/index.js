

let allGames = [];
let gameImage;
let clickeditem;
let detailsofgame=[];
let gameId;
let items;
   let item = document.getElementById('gameContainer').firstElementChild;
 console.log(item);
  
 
 let navLinks =document.querySelectorAll('.navLinks  a')
  for(let i=0;i<navLinks.length;i++){
    navLinks[i].addEventListener('click',function(eventInfo){
    let categoryGame = eventInfo.target.getAttribute('data-code');
    getGames(categoryGame)
    })
}

getGames('shooter')


async function getGames(categoryGame){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '15a178694cmshfbf69d3921a7dd1p13fad2jsnbe65031aae76',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    let api =await   fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?platform=browser&category=${categoryGame}&sort-by=release-date`, options)
    let response =await api.json();
    allGames =response;
    for(let i=0;i<allGames.length;i++){
      gameImage = allGames[i].thumbnail
      items = allGames[i]
      gameId= allGames[i].id
    }
    
    displayGames()
   
}
function displayGames(){
 let game=``;  
  for(let i=0;i<allGames.length;i++){
    game+=`
   
    <div id="card"  class="col-md-3" onclick="openGame(${gameId})">
    <div class="gameItem p-4 text-center">
        <img class="w-100 h-25" src="${allGames[i].thumbnail}" alt="games">
        <div class="d-flex m-2 justify-content-between"> 
        <h5 id="title" class="text-light" >${allGames[i].title}</h5>
        <button class="btn btn-primary btn-sm">Free</button>  </div>
        <p class="text-muted">${allGames[i].short_description}</p>
        <p class="text-primary">${allGames[i].id}</p>
    <div class="btns d-flex justify-content-between">
        <button class="btn btn-dark btn-sm text-white">ARBG</button>
        <button class="btn btn-dark btn-sm text-white">pc(windows)</button>
    </div>
    </div>
  </div>
    `
  }
  document.getElementById('gameContainer').innerHTML=game  
} 
 async function getDetails(gameId){
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '15a178694cmshfbf69d3921a7dd1p13fad2jsnbe65031aae76',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };
   let api =await  fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`, options)
    let response =await api.json();
    detailsofgame = response;
    displayDetails()
}
    function displayDetails(){
 let details=``;
  details+=`
  <div id="detail" class="row">
  <div class="col-md-4  p-3"><img class="w-100" src="${detailsofgame.thumbnail}" alt=""></div>
  <div class="col-md-8  ">
    <h2 class="mt-3"  >Title:${detailsofgame.title} </h2>
    <h6 class="mt-3"   >Category:  <span>${detailsofgame.genre}</span>  </h6>
    <h6 class="mt-3"  >Platform:   <span>${detailsofgame.platform}</span>  </h6>
    <h6 class="mt-3"  >Status: <span>${detailsofgame.status} </span> </h6>
    <p  class="mt-3"  >${detailsofgame.description}</p>
    <a href="${detailsofgame.game_url}" ><button class="btn btn-outline-warning text-light"  >show Game</button></a>
  </div>
</div>  
  `
document.getElementById('detailscontainer').innerHTML = details
    }
 function openGame(gameId){
  document.getElementById('gameDetails').classList.replace('d-none','d-block')
  document.getElementById('closeBtn').addEventListener('click',function(){
    document.getElementById('gameDetails').classList.replace('d-block','d-none')
    getDetails(gameId)
  })
 }