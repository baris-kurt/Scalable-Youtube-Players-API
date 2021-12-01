let playerObjects = {};

window.addEventListener('message', function(event) {
    switch(event.data.transactionType)
    {
        case "playSound":
            play(event.data.transactionData);
        break;
        case "stopSound":
            stop();
        break;
        case "volume":
            setVolume(event.data.transactionData);
        break;
    }
})

let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

let ytScript = document.getElementsByTagName('script')[0];
ytScript.parentNode.insertBefore(tag, ytScript);



function onYouTubeIframeAPIReady()
{
    function create(){
      return new YT.Player("p"+Object.keys(playerObjects).length, {
        width: '50',
        height: '50',
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'disablekb': 1,
            'enablejsapi': 1,
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
          //  'onError': onPlayerError
        }
    });
    }
  
  document.querySelector("#tikla").addEventListener("click", ()=>{
  let g = document.createElement('div');
  g.id = "p"+Object.keys(playerObjects).length;
  document.querySelector('#players').appendChild(g);
  playerObjects["p"+Object.keys(playerObjects).length] = create();
  });
}

function onPlayerReady(event)
{
    title = event.target.getVideoData().title;
    player.setVolume(30);
}

function onPlayerStateChange(event)
{
    if(event.data == YT.PlayerState.PLAYING)
        title = event.target.getVideoData().title;
    
    if (event.data == YT.PlayerState.ENDED)
    {
        musicIndex++;
        play();
    }
}

function skip()
{
    play();
}

function play(id, data)
{
    console.log(data);
    title = "none";
    
    player.loadVideoById(id, data, "tiny");
    player.playVideo();
}

function resume()
{
    player.playVideo();
}

function pause()
{
    player.pauseVideo();
}

function stop()
{
    player.stopVideo();
}

function setVolume(volume)
{
    player.setVolume(volume)
}
