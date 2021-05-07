$ = (s) => document.querySelector(s)
const magic8BallInit = () => {
  var movementsCounter = 0,
      shaking = false,
      shaken = false,
      shakeTimeout

  function getMovementTotal(a) {
    return Math.abs(a.x) + Math.abs(a.y)
  }

  function getAnswer() {
    var responses = [
      "It is certain",
      "It is decidedly so",
      "Without a doubt",
      "Yes, definitely",
      "You may rely on it",
      "As I see it, yes",
      "Most likely",
      "Outlook good",
      "Yes",
      "Signs point to yes",
      "Reply hazy try again",
      "Ask again later",
      "Better not tell you now",
      "Cannot predict now",
      "Concentrate and ask again",
      "Don't count on it",
      "My reply is no",
      "My sources say no",
      "Outlook not so good",
      "Very doubtful"
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  function showAnswer() {
    answer.style = "opacity: 1"
    answerText.innerText = getAnswer()
  }

  function motionHandler(frem) {
    var e = window.motionEventData
    
    let movementTotal = getMovementTotal(e.acceleration || e.accelerationIncludingGravity)

    // debug.innerText = frem
    
    if(getMovementTotal(e.acceleration) > 5) {
      
      const x = Math.floor(e.acceleration.x) * 5
      const y = Math.floor(e.acceleration.y*-1) * 5
      
      eightball.style.transitionDuration = `0`
      eightball.style.transform = `translate(${x}px, ${y}px)`
    }
    else {
      eightball.style.transform = `none`
    }

    if(movementTotal > 10) {
      movementsCounter++
      if(movementsCounter > 15) {
        shaking = true
        answer.classList.add('bubbling')
        clearTimeout(shakeTimeout) // Prevents multiple answers
        shakeTimeout = setTimeout(() => {
          shaken = true
        }, 1000)
        numbereight.style = "opacity: 0;display: none"
      }
    }
    else if(movementTotal < 7) {
      if(shaken === true) {
        showAnswer()
        shaking = false
        shaken = false
        answer.classList.add('active')
        answer.classList.remove('bubbling')
      }
      movementsCounter = 0
    }
  }
  
  window.addEventListener('devicemotion', e => {
    if(window.motionAnimationFrame)
      cancelAnimationFrame(window.motionAnimationFrame)
    window.motionEventData = e
    
    window.motionAnimationFrame = window.requestAnimationFrame(motionHandler)
  })

  numbereight.addEventListener('click', () => {
    if(typeof DeviceMotionEvent != 'undefined' && DeviceMotionEvent) {
      if(typeof DeviceMotionEvent.requestPermission == 'function') {
        DeviceMotionEvent.requestPermission()
      }
    }
    else {
      requestAnimationFrame(function() {
        document.querySelector('.prompt').style.opacity = 1
        document.querySelector('.prompt').innerText = "Your device does not support motion"
        document.querySelector('.prompt').style.color = "red"
      })
    }
    numbereight.classList.add('inactive')
    answer.classList.add('active')
    
    document.querySelector('.prompt').style = 'opacity: 0'
  })
}
magic8BallInit();

const iOSWebAppPopup = () => {
  if(window.navigator.userAgent.match(/iPhone|iPad/) && ! window.navigator.standalone) {
    const popup = $('#ios-add-to-homescreen-popup')
    popup.style.display = "block"
    popup.onclick = (e) => e.currentTarget.style.display = 'none'
  }
}
iOSWebAppPopup()
