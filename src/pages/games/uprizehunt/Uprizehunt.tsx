import { useEffect, useRef, useState } from 'react';
import '../../../assets/css/pages/games/uprizehunt/Uprizehunt.css'
import ResultSound from '../../../assets/audio/uprizesound.mp3'

import UserContext from '../../../context/UserContext';
import { useContext } from 'react';
import { db } from '../../../firebase-config';
import { update,ref } from 'firebase/database';
import NeedLogin from '../../../components/NeedLogin';
const Uprizehunt = () => {
    const {userD,setUserD} = useContext(UserContext)
    const [data,setData] = useState<any>([
        0,0,0,0,0,
        0,0,0,0,0,
        0,0,1,0,0,
        0,0,0,0,0,
        0,0,0,0,0,
    ])
    const [selectedCard,setSelectedCard] = useState<any>("")

    const [openBox,setOpenBox] = useState<any>(false)
    const [openBoxErr,setOpenBoxErr] = useState("")
    const [isConfirmSelect,setIsConfirmSelect] = useState<any>(false)
    const [targetPrize,setTargetPrize] = useState<any>("")
    const [resultDone,setResultDone] = useState<any>(false)
    const [resetBtn,setResetBtn] = useState<any>(true)
    const ResSound = useRef<any>()
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
        setData(dats)
        console.log(process.env.REACT_APP_FUNCTION)
    }
    const ChooseCardsBtn = (target:any) => {
        console.log(target)
        console.log(selectedCard)
        if(target === 1) {
            let newData = [...data]
            let dats = shuffle(newData)
            console.log(dats)
            setData(dats)
        }
        else {
        }
    }
   
    const OpenBoxHandler = () => {
        if(!selectedCard) {
            setOpenBoxErr("Please Select a Box")
        }else {
            setOpenBox(true)
        }
    }
    const ConfirmSelectBoxBtn = async () => {
        
        if(parseInt(userD.credits) < 20) {
            return;
        }
        if(parseInt(targetPrize) === 1) {
            ShuffleCardHandler()
        }
        setIsConfirmSelect(true)
        setOpenBox(false)
        setTimeout(() => {
            ResSound.current.play()
        },200)
        setTimeout(() => {
            setResultDone(true)
        },2000)
        setUserD((prev:any) => ({...prev,credits:parseInt(userD.credits) - 1}))
        await update(ref(db,`users/${userD.uid}`),{
            credits: parseInt(userD.credits) - 20
        })
    }
  
    const SelectCardBtn = (target:any,targetVal:any) => {
        setSelectedCard(target)
        setTargetPrize(targetVal)
        setOpenBoxErr("")
        if(targetVal === 1) {
            ShuffleCardHandler()
        }
    }
    const ResetBtnHandler = () => {
        setSelectedCard("")
        ShuffleCardHandler()
        setOpenBox(false)
        setIsConfirmSelect(false)
        setResetBtn(true)
    }
    const CancelSelectBox = () => {
        setSelectedCard("")
        setOpenBox(false)
    }
    useEffect(() => {
        ShuffleCardHandler()
    },[])
  return (
    <section className="uprizehunt-container">
        <NeedLogin/>
        <audio src={ResultSound} ref={ResSound} style={{display:'none'}}></audio>
        <div className="uprize-h-header">
            <h1>500k Jackpot Prize ✨</h1>
        </div>
        {openBoxErr && 
        <div className="uprize-h-pick-e">
            <i className="fa-solid fa-flag"></i>
                <span>{openBoxErr}</span>
            </div>
        }
        <div className="uprize-h-game"
            style={{pointerEvents: isConfirmSelect ? "none": "auto"}}
        >
            {data && data.map((key:number,index:number) => (
                <div style={{
                    background: isConfirmSelect &&  key == 1 ? "radial-gradient(circle, rgba(18,213,18,1) 49%, rgba(47,83,24,1) 100%)" :"",
                    opacity: isConfirmSelect && key !== 1 && selectedCard !== index ? ".8" : "1",
                    border: selectedCard === index ? "5px solid var(--green)": "",
                    animation: isConfirmSelect ? 
                    "open .1s forwards .3s" : "",
                }}  className="uprize-box" key={index}>
                    {isConfirmSelect ? <span>{ key === 1 ? "🏆": "💣"}</span> : ""}
                </div>
            ))}
            {data.map((data:any,index:any) => (
                <div
                    onClick={() => SelectCardBtn(index,data)}
                    key={index}
                    style={{
                        border: selectedCard  === index ? "5px solid var(--green)": "",
                        animation: selectedCard  === index && isConfirmSelect ? "pick .3s forwards " :  isConfirmSelect ? "openall .3s forwards ":"",
                    }}
                className="cover">
                    <span>⭐SMM⭐</span>
                </div>
            ))}
            
            
        </div>

        {resultDone && 
        
        <div className="uprize-result-container">
        <div className="uprize-result">
                <div className="uprize-res-box">
                <div className="uprize-res-text">
                    <span>Opps Sorry Try Again!</span>
                </div>
                <div className="uprize-res-action">
                    <button onClick={() => {
                        setResetBtn(false)
                        setResultDone(false)}}>Ok</button>
                </div>
                </div>
            </div>
        </div>
        }
       
        <div className="uprize-action-btn">
            {/* <button onClick={() => {
                setIsShuffle(true)
               }}>Start</button> */}
               {isConfirmSelect ? 
            <button
            style={{opacity: !resetBtn ? "1": ".5",pointerEvents: !resetBtn? "auto": "none"}}
            disabled={resetBtn}
            className='uab-restart-btn'
                onClick={() => ResetBtnHandler()}
            >Restart</button> : 
               <button
               className='uab-openbox-btn'
               disabled={parseInt(userD.credits) < 20 ? true : false}
               onClick={OpenBoxHandler}>{parseInt(userD.credits) < 20 ? "Not enough credits": "Open Box"}</button>
            }
        </div>
        
        {openBox && 
        <div className="uprize-ss-container">
            <div className="uprize-ss-box">
                <div className="uprize-ss-header">
                    <p>Are you sure you want to open</p>
                    <p>For Credits <span>20.00</span></p>
                </div>
                <div className="uprize-ss-action">
                <button className='ussa-yes-btn' onClick={ConfirmSelectBoxBtn}>Yes</button>
                <button className='ussa-no-btn' onClick={CancelSelectBox}>No</button>
                </div>
            </div>
        </div>
        }
    </section>
  )
}

export default Uprizehunt