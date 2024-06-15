import { useState } from 'react';
import '../../../assets/css/pages/games/uprizehunt/Uprizehunt.css'
const Uprizehunt = () => {
    const [data,setData] = useState<any>([
        0,0,0,0,0,
        0,0,0,0,0,
        0,0,1,0,0,
        0,0,0,0,0,
        0,0,0,0,0,
    ])
    const [clickStart,setClickStart] = useState<boolean>(false)
    const animation = [
        "ub4 1s forwards"
    ]
    function shuffle(array:any) {
        let currentIndex = array.length;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array
      }
    const ShuffleCardHandler = () => {
        let newData = [...data]
        let dats = shuffle(newData)
        console.log(dats)
        setData(dats)
        console.log(data,'this data')
    }
    const ChooseCardsBtn = (target:any) => {
        console.log(target)
        if(target === 1) {
            let newData = [...data]
            let dats = shuffle(newData)
            console.log(dats)
            setData(dats)
        }
        else {
        }
    }
  return (
    <section className="uprizehunt-container">

        <div className="uprize-h-header">
            <h1>500k Jackpot Prize</h1>
        </div>

        <div className="uprize-h-game">
            
            {data && data.map((key:number,index:number) => (
                <div onClick={() => ChooseCardsBtn(key)} className="uprize-box" key={index}>
                    <span>{key}</span>
                </div>
            ))}
            {data.map((key:any,index:any) => (
                <div className="cover">
                    
                </div>
            ))}
        </div>
        <div className="uprize-action-btn">
            <button onClick={() => setClickStart(true)}>Start</button>
        </div>
        
        {clickStart && 
        <div className="uprize-ss-container">
            <div className="uprize-ss-box">
                <div className="uprize-ss-header">
                    <p>Are you sure you want to start</p>
                    <p>For Credits 20.00</p>
                </div>
                <div className="uprize-ss-action">
                <button>Yes</button>
                <button onClick={() => setClickStart(false)}>No</button>
                </div>
            </div>
        </div>
        }
    </section>
  )
}

export default Uprizehunt