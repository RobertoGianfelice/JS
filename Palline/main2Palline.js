let canvas = document.getElementById('myCanvas');
canvas.width = 1200;
canvas.height = 800;
let numeroPallina=10000;
let pallineInGioco = numeroPallina;
let balls = [];
let vincitori = [];
let counter=0;
let fermaAnimazione=false;

let ctx = canvas.getContext('2d');
class Ball {
    constructor() {
        // inizializza la pallina: parte dal centro della canvas, con raggio, colore, velocità X/Y casuali                                                                                                                                              /Y casuali
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.radius = Math.random() * (30 - 10) + 10;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.speedX = Math.random() * 5 - 2.5;
        this.speedY = Math.random() * 5 - 2.5;
        this.stop=false;
        this.accelera=1;
    }

    draw() {
        // disegna la pallina
        if (!this.stop){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#000';
        ctx.stroke();
        }
    }
    update() {
        // verifica se la pallina ha toccato i bodi, aggiorna la posizone in base ai parametri attuali su X e Y
        this.edgeIsTouched();
        if (fermaAnimazione) {
            this.accelera+=0.03;
        } 
        this.x += this.speedX * this.accelera;
        this.y += this.speedY * this.accelera;
    }

    edgeIsTouched() {
        //se la pallina tocca i bordi verticali, inverte la velocità X
        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
            if (fermaAnimazione) {
                this.stop=true;
                numeroPallina--;
            }
            this.speedX = -this.speedX;
        }

        //se la pallina tocca i bordi orizzontali, inverte la velocità Y
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            if (fermaAnimazione) {
                this.stop = true;
            }
            this.speedY = -this.speedY;
        }
    }
}

function mescola() {
    let numeri=[];
    let numeriMescolati=[];
    for (i = 1; i <= 58; i++) {
        numeri.push(i);
    }
    for (i=0; i<21; i++){
        casuale=Math.floor(Math.random()*numeri.length);
        numeriMescolati.push(numeri[casuale]);
        numeri.splice(casuale,1);
    }
    return(numeriMescolati);
}

function stopPalline() {
    fermaAnimazione=true;
    document.getElementById("elenco").style.display="block";
    document.getElementById("logoScuola").style.display="block";
    document.getElementById("logoStreetScience").style.display = "block";

}
let init = () => {
    // crea le palline e le inserisce nel vettore balls
    for (i = 0; i < numeroPallina; i++) {
        balls.push(new Ball())
    }
    vincitori = mescola();

    //avvia il loop dei frame
    requestAnimationFrame(loop)
}

let loop = () => {
    // gestione del frame: cancello il canvas, disegno tutte le palline in balls e ne aggiorno la posizione
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //balls.map(pallina => {
    //    pallina.draw();
    //    pallina.update();
    //})

    if (fermaAnimazione) {
        ctx.font = 'bold 102px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = "red";
        ctx.fillText('Le magliette vanno a....', 600, 200);
        ctx.font = 'bold 92px sans-serif';

        stringa = "";
        for (i = 0; i < 20; i++) {
            if (stringa == "") {
                stringa = stringa + vincitori[i];
            } else {
                stringa = stringa + "-" + vincitori[i];
            }
            if ((i + 1) % 5 == 0) {
                ctx.fillText(stringa, 600, 300 + 20 * i);
                stringa = "";

            }
        }
    } 

    balls.forEach((pallina)=>{
                    if(!pallina.fermaAnimazione){
                    pallina.draw();
                    pallina.update();}
                })


    //document.getElementById("contatore").innerHTML=counter;
        // gestione frame successivo
    requestAnimationFrame(loop);

    

}

// avvia l'animazione
init()
