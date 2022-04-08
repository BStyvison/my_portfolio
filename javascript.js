//Fullscreen Sticky Header

window.addEventListener("scroll", function(){
    const header = this.document.querySelector('header')
    header.classList.toggle('sticky', window.scrollY > 0)

})
const navigation = document.querySelector('nav')
document.querySelector('.toggle').onclick = function(){
    this.classList.toggle('active')
    navigation.classList.toggle('active')
}

//ScroolBar

//Recalcula a dimensão da pagina
window.onresize=function(){
    location.reload();
}
let progress = document.getElementById('progressBar');
let totalHeight = document.body.scrollHeight - window.innerHeight;
window.onscroll = function(){
let progressHeight = (window.pageYOffset / totalHeight) * 100;
progress.style.height = progressHeight + "%";
}


//smooth scroll

// Identificar o clique no menu
const menuItems = document.querySelectorAll('.menu a[href^="#"]')

// Verificar o item que foi clicado e fazer referência com o alvo
menuItems.forEach(item => {
    item.addEventListener('click', scroolToIdOnClick)
})




// Verificar a distância entre o alvo e o topo
function getScroolTopByHref(element) {
    const id = element.getAttribute('href')
    return document.querySelector(id).offsetTop
}

// Animar o scroll até o alvo
function scroolToIdOnClick(event) {
    event.preventDefault()  //Evitar o padrão
    const to = getScroolTopByHref(event.target) - 80

    if (to == '57') {
        scroolToPosition (to + 80)
    } else {
        scroolToPosition (to) 
    }
}


if ('scrollBehavior' in document.documentElement.style) { 
    function scroolToPosition(to) {
        window.scroll({
            top: to,
            behavior: "smooth",
        })
    }
    } else {
        function scroolToPosition(to) {
            smoothScrollTo(0, to)
        }
    }



/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int} endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
 function smoothScrollTo(endX, endY, duration) {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();
  
    duration = typeof duration !== 'undefined' ? duration : 400;
  
    // Easing function
    const easeInOutQuart = (time, from, distance, duration) => {
      if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
      return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
    };
  
    const timer = setInterval(() => {
      const time = new Date().getTime() - startTime;
      const newX = easeInOutQuart(time, startX, distanceX, duration);
      const newY = easeInOutQuart(time, startY, distanceY, duration);
      if (time >= duration) {
        clearInterval(timer);
      }
      window.scroll(newX, newY);
    }, 1000 / 60); // 60 fps
  };
