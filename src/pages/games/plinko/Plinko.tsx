import { useEffect, useRef } from 'react'
import '../../../assets/css/pages/games/plinko/Plinko.css'


const Plinko = () => {
    const PlinkoCanvasRef = useRef<any>(null)
    useEffect(() => {
        let canvas = PlinkoCanvasRef.current
        let context = canvas.getContext('2d')
        canvas.width = 450
        canvas.height = 400
        canvas.style.background = "blue"
        class Circle {
            xpos: any;
            ypos: any;
            radius: any;
            color: any;
            text: any;
            speed:any;
            dx:any;
            dy:any;
            constructor(xpos:any,ypos:any,radius:any,color:any,text:any,speed:any) {
                this.xpos = xpos
                this.ypos = ypos
                this.radius = radius
                this.color = color
                this.text = text
                this.speed = speed
                this.dx = 1 * this.speed
                this.dy = 1 * this.speed
            }

            draw(context:any) {
                context.beginPath()
                context.strokeStyle = this.color
                context.textAlign = "center"
                context.textBaseline = "middle"
                context.font = "15px Poppins"
                context.fillText(this.text,this.xpos,this.ypos)
                context.arc(this.xpos,this.ypos,this.radius,0,Math.PI * 2 , false)
                context.stroke()
            }
            update() {
                this.draw(context)
                if((this.xpos + this.radius) > 450) {
                    this.dx = -this.dx
                }
                if((this.xpos - this.radius) < 0) {
                    this.dx = -this.dx

                }
                if((this.ypos - this.radius) < 0) {
                    this.dy = -this.dy

                }
                if((this.ypos + this.radius) > 400) {
                    this.dy = -this.dy
                }
                this.xpos += this.dx
                this.ypos += this.dy
            }
        }
        
        // let random_x = Math.random() * 450
        // let random_y = Math.random() * 400

        let getDistance = function(xpos1:any,ypos1:any,xpos2:any,ypos2:any) {
            let result = Math.sqrt(Math.pow(xpos2 - xpos1,2) + Math.pow(ypos2 - ypos1,2))
            return result;
        }
        let myCircle1 = new Circle(100,100,20,"black",'A',1)
        let myCircle2 = new Circle(225,200,100,"black",'B',0)
        console.log(getDistance(myCircle1.xpos,myCircle1.ypos,myCircle2.ypos,myCircle2.xpos))

        myCircle1.draw(context)
        myCircle2.draw(context)
        let updateCircle = function() {
            requestAnimationFrame(updateCircle)
            context.clearRect(0,0,450,400)
            myCircle1.update()
            myCircle2.update()

            if(getDistance(myCircle1.xpos,myCircle1.ypos,myCircle2.xpos,myCircle2.ypos) < (myCircle2.radius + myCircle1.radius)) {
                    myCircle2.color = "red"
            }
            if(getDistance(myCircle1.xpos,myCircle1.ypos,myCircle2.ypos,myCircle2.xpos) >= (myCircle2.radius + myCircle1.radius)) {
                myCircle2.color = "black"
        }
        }
        updateCircle()
        // let all_circles = []
        // let createCircle = (circle:any) => {
        //     circle.draw(context)
        // }
        // for(let i = 0 ; i < 1 ; i ++) {
        //     let random_x = Math.random() * 450
        //     let random_y = Math.random() * 350
        //     let myCircle = new Circle(random_x,random_y ,20,"black",i+1,1)
        //     all_circles.push(myCircle)
        //     createCircle(all_circles[i])
        // }
        
    },[])
  return (
    <section className='plinko-container'>
        <div className="plink-header">
            <h1>Plinko</h1>
        </div>
        <div className="plinko-canvas-container">
            <canvas ref={PlinkoCanvasRef}></canvas>        
        </div>
    </section>
  )
}

export default Plinko