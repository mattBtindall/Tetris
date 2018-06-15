(() => {
    let link = document.createElement('link');
    let ran = getRandomInt( 1, 5);
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = `img/block${ran}.png`;
    document.head.appendChild(link);
})();

function getRandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}