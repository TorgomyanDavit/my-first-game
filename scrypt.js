const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")


// const bullets = document.createElement("img")
// bullets.src="https://pngimg.com/uploads/bullets/bullets_PNG35557.png"

const audio = document.createElement("audio")
audio.src="http://www.vertigogaming.org/downloads/zps/sound/Weapons/Firearms/AK-47/ak-47_fire-01.wav"

const target = document.createElement("img")
target.src="https://www.pngarts.com/files/3/Shooting-Target-PNG-Picture.png"

const audiotarget = document.createElement("audio")
audiotarget.src="http://cs.klan-hub.ru/zombie/sound/zombie_plague/claw_strike2.wav"

const magazin  = document.createElement("img")
magazin.src="https://www.lapua.com/wp-content/uploads/2018/11/BulletBullex-NBNS750gr486g.png"

const zarijat = document.createElement("audio")
zarijat.src="http://www.vertigogaming.org/downloads/zps/sound/Weapons/Firearms/AK-47/AK47_Reload_Empty.wav"

const empty = document.createElement("audio")
empty.src="http://www.vertigogaming.org/downloads/zps/sound/Weapons/Firearms/AK-47/AK-47_dryfire.wav"


function Backgroundimg(){
    let SCORE = 0
    let countoftarget = 0
    let i = 0
    
    this.draw = function(){
        const backgraundimg = document.createElement("img")
        backgraundimg.src="https://img.pngio.com/vietnam-war-and-korea-reenactment-stock-footage-vietnam-war-png-1000_583.png"
        context.drawImage(backgraundimg,0,0,canvas.width,canvas.height)
        context.fillStyle = "brown"
        context.font = "bold 32px Arial";
        context.fillText("YOU CAN GUN   " + SCORE + "   TARGET OF   " + countoftarget,0,canvas.height)
    }
  
    this.score = function(){
        return SCORE+=1
    }
    this.count = function(){
        return countoftarget += 1
    }

    this.update = function(){
        if(countoftarget === 20){
            alert("duq vastakel eq   " + SCORE + "   miavor   hnaravor   " +     countoftarget + "ic")
            countoftarget = 0
            SCORE = 0
        }
        if(i === 0){
            parkuch()
            i++
        }
    }
}


function Hero(x,y,width,height){
    const hero = document.createElement("img")
    hero.src="https://purepng.com/public/uploads/large/purepng.com-soldiersoldiersweapon-holderfighterwar-fighterwarriorarmy-14215269721695icez.png"

    let xdelta = 0
    let ydelta = 0
    this.bulx = function(){
        return x + width
    }
    this.buly = function(){
        return y + 50
    }
    this.goRight = function() {
        xdelta = 5
    }
    this.goLeft = function() {
        xdelta = -5
    }
    this.goUp = function() {
        ydelta = -5
    }
    this.goDown = function() {
        ydelta = 5
    }
    this.update = function() {
        x += xdelta
        y += ydelta
    }
    this.draw = function() {
    context.drawImage(hero,x,y,width,height)
    }
    this.stop = function(){
        xdelta = 0
        ydelta = 0
    }
}


function tirax(){

    if(date.target.length === 0){
        while(date.target.length < 1){
            date.target.push(
                {   
                    xdelta:Math.floor(Math.random() * 15)  + 10,
                    x: Math.floor(Math.random() * 400) + 800,
                    y:canvas.height + 200,
                    width:100,
                    height:150
                }   
            )
        }
    }

    date.target.forEach(function(menshen){
        menshen.y -= menshen.xdelta
        if(menshen.y < -menshen.height){
            menshen.xdelta = Math.floor(Math.random() * 10)  + 10
            menshen.y = canvas.height
            menshen.x = 800 + Math.random() * 400
            date.background.count()
        }
    })

}

function pampusht(){
    date.bullets.forEach(function(bul){
        date.target.forEach(function(tar){
            if(intersect(bul,tar)){
                audiotarget.currentTime = 0
                audiotarget.play()
                tar.deleteMe = true
                bul.deleteMe = true
                date.background.score()
                date.background.count()
            }
        })
    })
    date.bullets = date.bullets.filter(function(bul){
        return bul.deleteMe !== true
    })
    date.target = date.target.filter(function(tar){
        return tar.deleteMe !== true
    })
    
    date.bullets.forEach(function(bullet){
        bullet.x += bullet.xdelta
    });

    date.bullets.filter(function(bullet){
        if(bullet.x > canvas.width){
            return false
        }
        return true
    })
}

function parkuch(){
    while(date.magazin.length < 25){
        date.magazin.push(
            {
                xdelta:0,
                x:0,
                y:0,
                width:50,
                height:30
            },
        )
        date.magazin.forEach(function(patron){
            if(patron.x === 0){
                patron.x = 0
            }
            if(patron.x > 0){
                patron.x += 50
            }
            patron.x++
        })
    }
}

let date = {
    background:new Backgroundimg(),
    hero:new Hero(0,100,150,400),
    magazin:[],
    target:[],
    bullets:[]
}

function intersect(rect1, rect2) {
    const x = Math.max(rect1.x, rect2.x),
        num1 = Math.min(rect1.x + rect1.width, rect2.x + rect2.width),
        y = Math.max(rect1.y, rect2.y),
        num2 = Math.min(rect1.y + rect1.height, rect2.y + rect2.height);
    return (num1 >= x && num2 >= y);
};

function licqavorum(){
    zarijat.currentTime = 0
    zarijat.play()
    parkuch()
}



function update(){
    date.hero.update()
    date.background.update()
    tirax()    
    pampusht()
}

function draw (){
    date.background.draw()
    date.hero.draw()

    date.target.forEach(function(menshen){
        context.drawImage(target,menshen.x,menshen.y,menshen.width,menshen.height)
    })

    date.bullets.forEach(function(bullet){
    context.drawImage(bullets,bullet.x,bullet.y,bullet.width,bullet.height)
    })

    date.magazin.forEach(function(countofbul){
    context.drawImage(magazin,countofbul.x,countofbul.y,countofbul.width,countofbul.height)
    })
}

function loop(){
    requestAnimationFrame(loop)
    
    update()
    draw()
}
loop()

document.addEventListener("keydown",function(key){
    if(key.code === "ArrowRight"){
        date.hero.goRight()
    }
    if(key.code === "ArrowLeft"){
        date.hero.goLeft()

    }
    if(key.code === "ArrowUp"){
        date.hero.goUp()
    }
    if(key.code === "ArrowDown"){
        date.hero.goDown()
    }

    if(key.code === "Space" && date.magazin.length === 0){
        empty.currentTime = 0
        empty.play()
    }

    if(key.code === "Space" && date.magazin.length !== 0){
        date.magazin.shift()
        date.bullets.push(
            audio.currentTime = 0,
            audio.play(),
            {
                xdelta:100,
                x:date.hero.bulx(),
                y:date.hero.buly(),
                width:40,
                height:20
            }
            
        )
    }

    if(key.code === "KeyQ"){
        licqavorum()
    }
})

document.addEventListener("keyup",function(){
    date.hero.stop()
})