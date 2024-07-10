import { useEffect, useState ,useContext} from 'react'
import '../../../assets/css/pages/games/highlow/Highlow.css'
import socket from '../../../socketio'
import UserContext from '../../../context/UserContext'
const HighLow = () => {
    const {userD,setUserD} = useContext(UserContext)

    const [startsIn,setStartsIn] = useState<any>('')
    const [card1,setCard1] = useState<any>('')
    const [card2,setCard2] = useState<any>('')
    const [card1bet,setCard1bet] = useState<any>('')
    const [card2bet,setCard2bet] = useState<any>('')
    const [card1PayoutPercentage,setcard1PayoutPercentage] = useState<any>('')
    const [card2PayoutPercentage,setcard2PayoutPercentage] = useState<any>('')
    const [hlWinner,sethlWinner] = useState<any>('')
    const [socketId,setSocketId] = useState<any>('')
    const [payoutRes,setPayoutRes] = useState<any>('')
    const [hlRestart,setHlRestart] = useState<any>(true)
    const [hlOpenInputAmount,sethlOpenInputAmount] = useState<any>(false)
    const [isCancel,setIsCancel] = useState<any>(false)
    const [betAmount,setBetAmount] = useState<any>(0)
    const [choosenCard,setChoosenCard] = useState<any>('')
    const [payoutVal1,setpayoutVal1] = useState<any>(0)
    const [payoutVal2,setpayoutVal2] = useState<any>(0)
    useEffect(() => {
        socket.connect()
        socket.on('connect',() => {
            console.log('connected')
            let socketid =localStorage.getItem('socketid') as string || null
            if(!socketid) {
                localStorage.setItem("socketid",socket.id as string)
                socket.emit('join-game',socket.id)
                setSocketId(socket.id)
            }
            if(socketid) {
                socket.emit('join-game',socketid)
                setSocketId(socketid)
            }
            socket.emit('join-hl-game')
            // socket.emit('join-game','highlow-game','123')
            socket.on('hl-result-stats',(stats) => {
                if(stats === 'cancel') {
                    hlCancelGame()
                    setHlRestart(true)
                    setcard1PayoutPercentage(0)
                    setcard2PayoutPercentage(0)
                }
            })
           socket.on('hl-starts-in',(startcount)=> {
            setStartsIn(startcount)
           })
           socket.on('hl-result-card',(card_res1,card_res2) => {
            if(card_res1 === 0 && card_res2 === 0) {
                setCard1(card_res1)
                setCard2(card_res2)
                setHlRestart(true)
                return
            }
            setHlRestart(false)
            let cardnumber1 = [] 
            let cardnumber2 = [] 
            for(let i = 0 ; i < card_res1.card[0] ; i ++) {
                cardnumber1.push(i)
            }
            for(let i = 0 ; i < card_res2.card[0] ; i ++) {
                cardnumber2.push(i)
            }
            console.log(card_res1)
            setCard1({card:card_res1.card,identifier:card_res1.identifier,card_num_display: cardnumber1})
            setCard2({card:card_res2.card,identifier: card_res2.identifier,card_num_display: cardnumber2})
           })
           socket.on('hl-bet-card-percentage',(c1_all_bets,c2_all_bets,c1_payout_percentage,c2_payout_percentage) => {
            console.log(c1_all_bets)
            setCard1bet(c1_all_bets)
            setCard2bet(c2_all_bets)
            setcard1PayoutPercentage(c1_payout_percentage)
            setcard2PayoutPercentage(c2_payout_percentage)
           })

           socket.on('hl-winner-result',(winner) => {
            if(winner === 4) {
                sethlWinner('Draw')
            }
            else if(winner === 3) {
                sethlWinner('Waiting')
            }
            else if(winner === 1) {
                sethlWinner('Card 1 Win')
            }else {
                sethlWinner('Card 2 Win')
            }
           })
           socket.on('payout-res',(payoutres) => {
            console.log(payoutres)
            setPayoutRes(payoutres)
           })
           socket.on('payoutval1',value => {
                setpayoutVal1(value)
           })
           socket.on('payoutval2',value => {
            setpayoutVal2(value)
       })
        })
    },[])

    const ConfirmBetButton = () => {
        console.log(choosenCard)
        if(userD && socketId) {
            socket.emit('hl-place-bet',{card: choosenCard,
                betAmount: betAmount.replace(/^0+/, ''),
                name: 'Shit',id:userD.uid,credits:userD.credits,socketId})
        }
    }
    const PlacebetCard1Button = () => {
        if(userD && socketId) {
            socket.emit('hl-place-bet',{card: 'card1',
                betAmount: 20,
                name: 'Holand',id:userD.uid,credits:userD.credits,cardbet:1,socketId})
        }
       
    } 
    const PlacebetCard2Button = () => {
        if(userD && socketId) {
            let betData = {
                card: 'card2',
                betAmount: 20,
                name: 'Holand'
            }
            socket.emit('hl-place-bet',{card: 'card2',
                betAmount: 20,
                name: 'Holand',id:userD.uid,credits:userD.credits,cardbet:1,socketId:socketId})
        }
    } 
    console.log(card1)
    function hlCancelGame() {
        setIsCancel(true)
        setTimeout(() => {
            setIsCancel(false)
        },10000)
    }
  return (
    <section className='hl-container'>
        <div className="hl-start-indicator">
        {startsIn === 0 ? <h1 className='hlc-text'>Closed</h1> : 
            <h1 className='hlsi-text'>Starts in: <span>{startsIn}</span></h1>
        }
        </div>
        {/* <div className="hl-container-header">
            <h1>HIG-LOW</h1>
        </div> */}
        {/* <div className="card">
            <div>
                <h1>Card1: {card1}</h1>
                <h2>Bets: {card1bet}</h2>
                <span>Percentage: {card1PayoutPercentage}%</span>
            </div>
            <br />
            <div>
                <h1>Card2: {card2}</h1>
                <h2>Bets:{card2bet} </h2>
                <span>Percentage: {card2PayoutPercentage}%</span>
            </div>
        </div> */}
        {hlRestart ? 
            <div className="hl-card-cover">
                {isCancel && 
                 <div className="hlcard-cancel">
                 <div className="hl-game-cancel-box">
                    <span>X Game Cancel X</span>
                 </div>
             </div>
                }
                  
                <div className='hl-card1-cover'>
               
                </div>
                <div className='hl-card2-cover'></div>
            </div>
        :
            <div className="hl-card-container">
                
                {hlWinner === "Draw" &&
                    <div className='hldraw-wrapper'>
                    <div className="hldraw-text-box">
                        <span>Draw</span>
                    </div>
                </div>
                }
                {card1 !== 0 && card1 &&
                <div style={
                    {color: card1?.identifier?.color,
                        opacity: hlWinner === "Card 2 Win" ? '.5' : '1',
                        transform: hlWinner === "Card 2 Win" ?   "scale(1)":"scale(1.03)"
                    }
                } 
                className={`hl-card ${ card1?.card[0] <= 10 ? "hl-card-" + card1?.card[1] : ""}`}>
                        {hlWinner === "Card 1 Win" &&
                         <div className="hlcard-win">
                         <span>Winner</span>
                     </div>
                        }
                       

                        <div className="hl-card-text1">
                            {card1.card[0] <= 10 &&
                                <span>{card1?.card[0]}</span>
                            }
                            {card1.card[0] === 11 &&
                                <span>J</span>
                            }
                            {card1.card[0] === 12 &&
                                <span>Q</span>
                            }
                            {card1.card[0] === 13 &&
                                <span>K</span>
                            }
                            
                            <span>{card1.identifier?.suits}</span>
                        </div>
                        {card1.card[0] <= 10 &&
                         <div className="hl-card-type">
                         {card1.card_num_display.map((key:any,index:any) => (
                             <>
                                 <span>{card1.identifier?.suits}</span>
                             </>
                         ))}
                        </div>
                        }
                        {card1.card[0] === 11 &&
                         <div className="card-jqk">
                                <span>🤴🏾</span>
                            <span>🤴🏾</span>
                         </div>
                        }
                       {card1.card[0] === 12 &&
                         <div className="card-jqk">
                                <span>👸🏾</span>
                                <span>👸🏾</span>
                         </div>
                        }
                        {card1.card[0] === 13 &&
                         <div className="card-jqk">
                               <span>🫅🏾</span>
                               <span>🫅🏾</span>
                         </div>
                        }
                        <div className="hl-card-text2">
                        {card1.card[0] <= 10 &&
                                <span>{card1?.card[0]}</span>
                            }
                            {card1.card[0] === 11 &&
                                <span>J</span>
                            }
                            {card1.card[0] === 12 &&
                                <span>Q</span>
                            }
                            {card1.card[0] === 13 &&
                                <span>K</span>
                            }
                            <span>{card1.identifier?.suits}</span>
                        </div>
                </div>
                }
            {card2 !== 0 && card2 &&
                <div style={
                    {
                        color: card2?.identifier?.color,
                        opacity:hlWinner === "Card 1 Win" ? '.5' : '1',
                        transform: hlWinner === "Card 1 Win" ? "scale(1)" : "scale(1.03)" 
                    }
                } 
                className={`hl-card ${ card2?.card[0] <= 10 ? "hl-card-" + card2?.card[1] : ""}`}>
                     {hlWinner === "Card 2 Win" &&
                         <div className="hlcard-win">
                         <span>Winner</span>
                     </div>
                        }
                        <div className="hl-card-text1">
                        {card2.card[0] <= 10 &&
                                <span>{card2?.card[0]}</span>
                            }
                            {card2.card[0] === 11 &&
                                <span>J</span>
                            }
                            {card2.card[0] === 12 &&
                                <span>Q</span>
                            }
                            {card2.card[0] === 13 &&
                                <span>K</span>
                            }
                            <span>{card2.identifier?.suits}</span>
                        </div>
                        {card2.card[0] <= 10 &&
                         <div className="hl-card-type">
                         {card2.card_num_display.map((key:any,index:any) => (
                             <>
                                 <span>{card2.identifier?.suits}</span>
                             </>
                         ))}
                        </div>
                        }
                        {card2.card[0] === 11 &&
                         <div className="card-jqk">
                                <span>🤴🏾</span>
                            <span>🤴🏾</span>
                         </div>
                        }
                       {card2.card[0] === 12 &&
                         <div className="card-jqk">
                                <span>👸🏾</span>
                                <span>👸🏾</span>
                         </div>
                        }
                        {card2.card[0] === 13 &&
                         <div className="card-jqk">
                               <span>🫅🏾</span>
                               <span>🫅🏾</span>
                         </div>
                        }
                        <div className="hl-card-text2">
                        {card2.card[0] <= 10 &&
                                <span>{card2?.card[0]}</span>
                            }
                            {card2.card[0] === 11 &&
                                <span>J</span>
                            }
                            {card2.card[0] === 12 &&
                                <span>Q</span>
                            }
                            {card2.card[0] === 13 &&
                                <span>K</span>
                            }
                            <span>{card2.identifier?.suits}</span>
                        </div>
                </div>
                }
            
        </div>
        
        }
        <div className="hl-bet-percentage">
            <div className="hlbp-details">
                <h2>{card1bet}</h2>
                <span>{card1PayoutPercentage}%</span>
            </div>
            <div className="hlbp-details">
                <h2>{card2bet}</h2>
                <span>{card2PayoutPercentage}%</span>
            </div>
        </div>
        <div className="hl-bet-payout">
            <div className="hlbp-details">
                <span>Payout = {parseFloat(payoutVal1).toFixed(2)}</span>
            </div>
            <div className="hlbp-details">
                <span>Payout = {parseFloat(payoutVal2).toFixed(2)}</span>
            </div>
        </div>
        <div className="hl-bet-action">
            <div className="hlba-wrapper">
                <button onClick={() => {
                    setChoosenCard('card1')
                    sethlOpenInputAmount(true)}}>CHOOSE</button>
            </div>
            <div className="hlba-wrapper">
                <button onClick={() => {
                    setChoosenCard('card2')
                    sethlOpenInputAmount(true)}}>CHOOSE</button>
            </div>
        </div>
        {hlOpenInputAmount && 
         <div className="hl-iab-container">
         <div className="hliab-box">
             <h2>Input Amount</h2>
             <input type="number" 
             onChange={(e) => setBetAmount(e.target.value)}
             value={betAmount}
             />
             <div className="hliab-box-action">
                 <button
                 onClick={() => {
                    ConfirmBetButton()
                    sethlOpenInputAmount(false)
                 }}
                 >Confirm</button>
                 <button onClick={() => sethlOpenInputAmount(false)}>Cancel</button>
             </div>
         </div>
     </div>
        }
       
        {/* <div className="winner">
            {hlWinner === 3 ? 
            <h1>Waiting ...</h1>
            : 
            <h1>Winner: {hlWinner}</h1>
            }
        </div> */}
            {payoutRes ? payoutRes.p_status === "Win" ? 
                <div className="hl-win-container">
                <div className="hl-win-box">
                    <h1>You Won</h1>
                    <h2>PHP {payoutRes.p_detail}</h2>
                    <button onClick={() => setPayoutRes("")}>Confirm</button>
                </div>
            </div>
            : "" : ""}
        {/* <div className="hl-action-container">
            <button onClick={PlacebetCard1Button}>Bet Card1</button>
            <button onClick={PlacebetCard2Button}>Bet Card2</button>
        </div> */}
    </section>
  )
}

export default HighLow