import { useEffect, useState } from 'react'
import '../../../assets/css/pages/games/colorgame/ColorGame.css'
import socket from '../../../socketio'

const ColorGame = () => {
    const [randomGeneratedColor,setRandomGeneratedColor] = useState<any>(0)
    const [colorWinner,setColorWinner] = useState<any>(0)
    const [isstartColorGame,setisStartColorGame] = useState<any>(1)
    useEffect(() => {
        socket.on('connect',() => {
            socket.emit('join color game',"color-game-room")
            socket.on("start-color-game",(res) => {
                console.log( res,res,'is start game 1 = true 2 == false')
                setisStartColorGame(res)
            })
            socket.on('random-number-color-game',(num) => {
                setRandomGeneratedColor(num)
        
            })
            socket.on('random-number-winner',(winner) => {
                setRandomGeneratedColor(0)
                setColorWinner(winner)
            })
        })
    },[])
  return (
    <section className='colorgame-container'>

        <div className="colorgame-header">
            <h1>Color Game {isstartColorGame}</h1>
        </div>

        <div className="cc-color-container">
            {['red','blue','orange','yellow','purple','green'].map((key:any,index:any) => (
                <button style={
                    {
                        backgroundColor:key,
                        // transform: randomGeneratedColor === (index + 1) ? "scale(1.05)" : 'scale(1)',
                        border: parseInt(isstartColorGame) === 1 ?randomGeneratedColor === (index + 1) ? "10px solid rgb(6, 180, 211)" : "" : colorWinner === (index + 1) ? "10px solid rgb(6, 180, 211)" :"",
                        // boxShadow: randomGeneratedColor === (index + 1) ? "0px 0px 10px white" : "",
                        opacity:parseInt(isstartColorGame) === 2 ? colorWinner === (index + 1) ? "1" : ".5" : "1"
                    }
                    
                } key={index}>{(index + 1 ) === colorWinner && parseInt(isstartColorGame) === 2 ? "true" : "false"}{colorWinner}</button>
            ))}
        </div>

        <div className="cc-action-container">
            {['red','blue','orange','yellow','purple','green'].map((key:string,index:number) => (
                <button key={index} style={{backgroundColor:key}}>BET</button>
            ))}
           
        </div>
    </section>
  )
}

export default ColorGame