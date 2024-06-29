import { useRef, useState } from 'react';
import '../../../assets/css/pages/games/keno/Keno.css'
import KenoSound from '../../../assets/audio/keno-sound.mp3'
import KenoWin from '../../../assets/audio/uprizesound.mp3'
import UserContext from '../../../context/UserContext';
import { useContext } from 'react';
import { db } from '../../../firebase-config';
import { update,ref } from 'firebase/database';
const Keno = () => {
  const {userD,setUserD} = useContext(UserContext)
  const kenosoundRef = useRef<any>(null)
  const kenoWinRef = useRef<any>(null)
  const kenoNumbers = Array.from({ length: 80 }, (_, i) => i + 1);
  const [pickedNumber,setPickNumber] = useState<any>([])
  const [drawnNumber,setDrawnNumber] = useState<any>('')
  const [start,setStart] = useState<boolean>(false)
  const [hitNumber,setHitNumber] = useState<any>('')
  const [payout,setPayout] = useState<any>('')
  const [betAmount,setBetAmount] = useState<any>(0)
  const [kenoReminder,setKenoReminder] = useState<any>('')
  const [amountSet,setIsAmountSet] = useState<any>(false)
  const [isAlinkHtp,setIsAlinkHtp] = useState<any>(true)
  const [fixedBet,setFixedBet] = useState<any>(0)
  const kenoPayoutData = [
    [2,2,"x2"],
    [3,2,"x1.5"],
    [3,3,"x5"],
    [4,3,"x1"],
    [4,4,"x8"],
    [5,4,"x2.5"],
    [5,5,"x15"],
    [6,4,"x2"],
    [6,5,"x4"],
    [6,6,"x20"],
    [7,5,"x2"],
    [7,6,"x6"],
    [7,7,"x50"],
    [8,5,"x2"],
    [8,6,"x4"],
    [8,7,"x20"],
    [8,8,"x100"],
    [9,6,"x2"],
    [9,7,"x15"],
    [9,8,"x70"],
    [9,9,"x150"],
    [10,7,"x10"],
    [10,8,"x30"],
    [10,9,"x70"],
    [10,10,"x500"],
  ]
  const PickNumberHandler = (number:number) => {
    if(pickedNumber.includes(number)) {
      let newPickNumber = [...pickedNumber]
      let removePickedNumber = newPickNumber.filter(num => num !== number)
      setPickNumber(removePickedNumber)
      return;
    }
    if(pickedNumber.length === 10) {
      console.log("Max Number to pick is 10")
      return;
    }
   
    setPickNumber((prev:any) => ([...prev,number]))
  }

  const StartButtonHandler = async () => {
    console.log(parseInt(fixedBet))

    if(parseInt(userD.credits) < parseInt(fixedBet)) {
      setKenoReminder("Not enough credits")
      return ;
    }
    if(pickedNumber.length < 2) {
      setKenoReminder("Minimum pick is 2 numbers")
      return ;
    }
    if(parseInt(fixedBet) < 10 && betAmount > 9) {
      setKenoReminder("Please Set your Bet")
      return
    }
    if(betAmount < 10) {
      console.log("Minimum bet is 10")
      setKenoReminder("Minimum bet is 10 credit")
      return;
    }
    
    if(start && drawnNumber.length !== 20) {
      return;
    }
    if(start) {
      setDrawnNumber([])
      setPickNumber([])
      setStart(false)
    }else {
      setStart(true)
      setUserD((prev:any) => ({...prev,credits:parseInt(userD?.credits) - parseInt(fixedBet)

      }))
      await update(ref(db,`users/${userD?.uid}`), {
        credits: parseInt(userD?.credits) - parseInt(fixedBet)
      })
      kenosoundRef.current.play()
      kenosoundRef.current.currentTime = .3
      let generate_num = [...GenerateNum()]
      for(let i = 0 ;  i < 20 ; i ++) {
        await new Promise(res => setTimeout(res,100))
        setDrawnNumber((prev:any) => ([...prev , generate_num[i]]))
      }
      console.log('gasd')
      kenosoundRef.current.pause()
      kenosoundRef.current.currentTime = 0

      let matchNumbers = pickedNumber.filter((num:any) => drawnNumber.includes(num))
      console.log(matchNumbers)
      setHitNumber(matchNumbers.length)
      setTimeout(() => {
        CheckPayout(generate_num)
      },500)
    }
  }
  const SetBetAmountHandler = () => {
   
    setIsAmountSet((prev:any) => (!prev))
    if(amountSet) {
      setFixedBet(0)
      return
    }
    if(parseInt(betAmount.slice(0,1)) === 0) {
      setBetAmount(betAmount.slice(1))
      setFixedBet(betAmount.slice(1))
    }else {
      setBetAmount(betAmount)
      setFixedBet(betAmount)
    }
  }
  function GenerateNum() {
    let numbers:any = []
    while(numbers.length !== 20) {
      let num = Math.floor(Math.random() * 80) + 1
      if(!numbers.includes(num)) {
        numbers.push(num)
      }
    }
    return numbers
  }

   function CheckPayout(generate_num:any) {
    console.log(generate_num)
    console.log(pickedNumber)
    let matchNumbers = pickedNumber.filter((num:any) => generate_num.includes(num))
    if(pickedNumber.length === 2 && matchNumbers.length === 2) {
      kenoWinRef.current.play()
      setPayout({
        payout_amount: parseInt(betAmount) * 2,
        payout_multiplier: '2'
      })
      UpdateCreditsWin(2)
      return;
    }
    if(pickedNumber.length === 3 && matchNumbers.length === 2) {
      kenoWinRef.current.play()
      setPayout({
        payout_amount:  parseInt(betAmount)* 1.5,
        payout_multiplier: '1.5',
      })
      UpdateCreditsWin(1.5)
      return;
    }
    if(pickedNumber.length === 3 && matchNumbers.length === 3) {
      kenoWinRef.current.play()
      setPayout({
        payout_amount:  parseInt(betAmount)* 5,
        payout_multiplier: '5',
      })
      UpdateCreditsWin(5)
      return;
    }
    if(pickedNumber.length === 4 && matchNumbers.length === 3) {
      setPayout({
        payout_amount:  parseInt(betAmount)* 1,
        payout_multiplier: '1',
      })
      UpdateCreditsWin(1)
      return;
    }
    if(pickedNumber.length === 4 && matchNumbers.length === 4) {
      setPayout({
        payout_amount:  parseInt(betAmount)* 8,
        payout_multiplier: '8',
      })
      UpdateCreditsWin(8)
      return;
    }
    if(pickedNumber.length === 5 && matchNumbers.length === 4) {
      setPayout({
        payout_amount:  parseInt(betAmount)* 2.5,
        payout_multiplier: '2.5',
      })
      UpdateCreditsWin(2.5)
      return;
    }
    if(pickedNumber.length === 5 && matchNumbers.length === 5) {
      setPayout({
        payout_amount:  parseInt(betAmount)* 15,
        payout_multiplier: '15',
      })
      UpdateCreditsWin(15)
      return;
    }
    if(pickedNumber.length === 6 && matchNumbers.length === 4) {
      setPayout({
        payout_amount:  parseInt(betAmount)* 2,
        payout_multiplier: '2',
      })
      UpdateCreditsWin(2)
      return;
    }
    if(pickedNumber.length === 6 && matchNumbers.length === 5) {
      setPayout({
        payout_amount:  parseInt(betAmount)* 4,
        payout_multiplier: '4',
      })
      UpdateCreditsWin(4)
      return;
    }
    if(pickedNumber.length === 6 && matchNumbers.length === 6) {
      setPayout({
        payout_amount:  parseInt(betAmount)* 20,
        payout_multiplier: '20',
      })
      UpdateCreditsWin(20)
      return;
    }
    if(pickedNumber.length === 7 && matchNumbers.length === 5) {
      setPayout({
        payout_amount:  parseInt(betAmount)* 2,
        payout_multiplier: '2',
      })
      UpdateCreditsWin(2)
      return;
    }
    if(pickedNumber.length === 7 && matchNumbers.length === 6) {
      setPayout({
        payout_amount:  parseInt(betAmount)* 6,
        payout_multiplier: '6',
      })
      UpdateCreditsWin(6)
      return;
    }
    if(pickedNumber.length === 7 && matchNumbers.length === 7) {
      setPayout({
        payout_amount:  parseInt(betAmount)* 50,
        payout_multiplier: '50',
      })
      UpdateCreditsWin(50)
      return;
    }
    if(pickedNumber.length === 8 && matchNumbers.length === 5) {
      setPayout({
        payout_amount:  parseInt(betAmount)* 2,
        payout_multiplier: '2',
      })
      UpdateCreditsWin(2)
      return;
    }
    if(pickedNumber.length === 8 && matchNumbers.length === 6) {
      setPayout({
        payout_amount:  parseInt(betAmount)* 4,
        payout_multiplier: '4',
      })
      UpdateCreditsWin(4)
      return;
    }
    if(pickedNumber.length === 8 && matchNumbers.length === 7) {
      setPayout({
        payout_amount:  parseInt(betAmount)* 20,
        payout_multiplier: '20',
      })
      UpdateCreditsWin(20)
      return;
    }
    if(pickedNumber.length === 8 && matchNumbers.length === 8) {
      setPayout({
        payout_amount:  parseInt(betAmount)* 100,
        payout_multiplier: '100',
      })
      UpdateCreditsWin(100)
      return;
    }
    if(pickedNumber.length === 9 && matchNumbers.length === 6) {
      setPayout({
        payout_amount:  parseInt(betAmount)* 2,
        payout_multiplier: '2',
      })
      UpdateCreditsWin(2)
      return;
    }
    if(pickedNumber.length === 9 && matchNumbers.length === 7) {
      setPayout({
        payout_amount:  parseInt(betAmount)* 15,
        payout_multiplier: '15',
      })
      UpdateCreditsWin(15)
      return;
    }
    if(pickedNumber.length === 9 && matchNumbers.length === 8) {
      setPayout({
        payout_amount:  parseInt(betAmount)* 70,
        payout_multiplier: '70',
      })
      UpdateCreditsWin(70)
      return;
    }
    if(pickedNumber.length === 9 && matchNumbers.length === 9) {
      setPayout({
        payout_amount:  parseInt(betAmount)* 150,
        payout_multiplier: '150',
      })
      UpdateCreditsWin(150)
      return;
    }
    if(pickedNumber.length === 10 && matchNumbers.length === 7) {
      setPayout({
        payout_amount:  parseInt(betAmount)* 10,
        payout_multiplier: '10',
      })
      UpdateCreditsWin(10)
      return;
    }
    if(pickedNumber.length === 10 && matchNumbers.length === 8) {
      setPayout({
        payout_amount:  parseInt(betAmount)* 30,
        payout_multiplier: '30',
      })
      UpdateCreditsWin(30)
      return;
    }
    if(pickedNumber.length === 10 && matchNumbers.length === 9) {
      setPayout({
        payout_amount:  parseInt(betAmount)* 70,
        payout_multiplier: '70',
      })
      UpdateCreditsWin(70)
      return;
    }
    if(pickedNumber.length === 10 && matchNumbers.length === 10) {
      setPayout({
        payout_amount:  parseInt(betAmount)* 500,
        payout_multiplier: '500',
      })
      UpdateCreditsWin(500)
      return;
    }
  }
  async function UpdateCreditsWin(num:any) {
    setUserD((prev:any) => ({...prev,credits:(parseInt(userD?.credits) + (parseInt(fixedBet) * num)) - parseInt(fixedBet)}))
    await update(ref(db,`users/${userD?.uid}`), {
      credits:( parseInt(userD?.credits) + (parseInt(fixedBet) * num)) - parseInt(fixedBet)
    })
  }
  return (
    <section className='keno-container'>
      <audio style={{display: 'none'}} src={KenoWin} ref={kenoWinRef}></audio>
      <audio  loop src={KenoSound} ref={kenosoundRef}
      style={{display: 'none'}}
      ></audio>
      <div className="kc-box-container">
      <div className="keno-header">
          <h1>Welcome to Keno Win Big</h1>
          {isAlinkHtp && 
          <div className='kh-a-htp'>
            <a href="#khp-container">How to Play?</a>
            <button onClick={() => setIsAlinkHtp(false)}>Remove</button>
          </div>
          }
        </div>
        {
          kenoReminder &&
        <div className="keno-reminder">
          <span>{kenoReminder}</span>
          <button 
          onClick={() => setKenoReminder('')}
          ><i className="fa-solid fa-rectangle-xmark"></i></button>
        </div>
        }
        
        <div className="keno-numbers-container">
          <div className="keno-numbers-wrapper">
            {kenoNumbers.map((key:number , index:number) => (
              <button
              style={{
                userSelect: start ? "none" : "auto",
                pointerEvents: start ? "none": "auto",
                backgroundColor: pickedNumber.includes(key) ? "var(--yellow)" : "",
                border: drawnNumber.includes(key) ? "5px solid var(--red)" : ""
              }}
              onClick={() => PickNumberHandler(key)}
              className="keno-number" key={index}>
                <span>{key}</span>
              </button>
            ))}
            </div>
        </div>
          
        <div className="keno-action-container">
          <div className="win-stat div-wrapper">
            <div className='win-wrapper'>
              <span>Cards Play: </span>
              <span>{pickedNumber.length}</span>
            </div>
            <div className='win-wrapper'>
              <span>Amount Bet: </span>
              <span>{fixedBet}</span>
            </div>
            <div className="stat-wrapper">
              <span>Hit: </span>
              <span>{pickedNumber.filter((num:any) => drawnNumber.includes(num)).length}</span>
            </div>
          </div>
          <div className="bet-number-choose div-wrapper">
            
            <div className="num-choose-wrapper">
              <span>Number Picked:</span>
              <div className='num-choose-div'>
              {
                pickedNumber.map((key:any,index:number) => (
                  <span key={index}>{key}</span>
                ))
              }
              </div>
            </div>
          </div>

          <div className="amount-b-start div-wrapper">
            <div className="amount-b-wrapper">
              <span>Amount:</span>
              <input
              style={{
                userSelect: amountSet ? "none": "auto",
                pointerEvents: amountSet ? "none": "auto",

              }}
              onChange={(e) => setBetAmount(e.target.value)}
              value={betAmount}
              type="number" />
              <button
              style={{backgroundColor: amountSet ? "var(--yellow)" : "var(--green)"}}
              onClick={SetBetAmountHandler}>{amountSet ? "Change": "Set"}</button>
            </div>
            <div className="start-wrapper">
              <button
              onClick={StartButtonHandler}
              // style={{opacity: pickedNumber.length < 2 ? ".5": '1'}}
              // disabled={pickedNumber.length < 2 && pickedNumber ? true : false}
              >{start ? "Restart": "Start"}</button>
            </div>
          </div>
        </div>
      </div>
       

        {
          payout &&
<div className="payout-container">
          <div className="payout-box">
            <h1>{payout.payout_multiplier}<span>x</span> </h1>
            <h2>+ {payout.payout_amount} credits</h2>
            <button onClick={() =>{ 
              kenoWinRef.current.pause()
              kenoWinRef.current.currentTime = 0
              setPayout('')}}>Ok</button>
          </div>
        </div>
        }
        
        <div className="khp-container" id='khp-container'>
          <div className="khp-header">
            <h1>How to Play?</h1>
          </div>
          <div className="khp-body">
            <div className="khp-body-txt">
            <ol>
    <li>Choose numbers by clicking on them in the box. To remove a number, simply click on it again.</li>
    <li>Enter the amount you wish to bet in the input box next to the "Amount" label.</li>
    <li>Click the Set Button. To set the bet amount</li>
    <li>Click "Start" to begin the draw.</li>
  </ol>

  <p className='khp-remind'><strong>Reminder:</strong></p>
  <ul>
    <li>You must pick at least 2 numbers.</li>
    <li>The minimum bet is 10 credits.</li>
    <li>The maximum Number Pick is 10 numbers</li>
  </ul>
            </div>
          </div>
        </div>

        <div className="kp-container">
          <h1 className='kp-title'>How Payout works</h1>

          <div className="kp-table">
            <div className="kp-header">
              <div className="table-no-picked kph-h">
                <h2>No. Picked</h2>
              </div>
              <div className="table-no-picked kph-h">
                <h2>Match Number</h2>
              </div>
              <div className="table-payout kph-h">
                <h2>Payout</h2>
              </div>
            </div>

            <div className="kp-table-body">
            {kenoPayoutData && kenoPayoutData.map((key:any,index:any) => (
                <div className="kp-table-data" key={index}>
                <div className='kp-data'>
                  <h3>{key[0]}</h3>
                </div>
                <div className='kp-data'>
                  <h3>{key[1]}</h3>
                </div>
                <div className='kp-data'>
                  <h3>{key[2]}</h3>
                </div>
              </div>
            ))}
            </div>
           
          
          </div>
        </div>
    </section>
  )
}

export default Keno