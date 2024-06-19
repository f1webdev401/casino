import { useState ,useContext, useEffect} from 'react'
import '../../../assets/css/pages/games/raffledraw/RaffleDraw.css'
import UserContext from '../../../context/UserContext'
import { set ,ref ,update,onValue} from 'firebase/database'
import { db } from '../../../firebase-config'

const RaffleDraw = () => {

    const {userD,setUserD} = useContext(UserContext)

    const [takenNumber,setTakenNumber] = useState<any>('')

    const [selectedNumber,setSelectedNumber] = useState<any>('')
    const [tempSelectNum,setTempSelectNum] = useState<any>("")
    const [isLoading,setIsLoading] = useState<boolean>(false)

    const [errorMsg,setErrorMsg] = useState<any>("")
    let numdata :any = []
    for(let i = 1 ; i < 3001 ; i ++) {
        numdata.push(i)
    }
    const [filteredData, setFilteredData] = useState<any>(numdata);
    const ConfirmBuyHandler = async() => {
        setIsLoading(true)
        if(userD) {
            if(userD.credits > 500) {
                console.log("success")
                setUserD((prev:any) => ({...prev,credits:parseInt(userD.credits) - 500 , 
                }))
                await update(ref(db,`raffle/1mprize`),{
                    takenNumber: [...takenNumber,parseInt(selectedNumber)]
                })

                if(userD.raffle[0] === "null") {
                    await update(ref(db,`users/${userD.uid}`),{
                        raffle:[selectedNumber],
                        credits: parseInt(userD.credits) - 500
                    })
                }
                if(userD.raffle[0] !== "null") {
                    await update(ref(db,`users/${userD.uid}`),{
                        raffle:[...userD.raffle,selectedNumber],
                        credits: parseInt(userD.credits) - 500
                    })
                }
                setIsLoading(false)
                setSelectedNumber("")
            }else {
                console.log("Not enough balance")
                setErrorMsg("Not enough credits !")
                setIsLoading(false)
            }
        }
    }   
    
    const SearchInpHandler = (e:any) => {
        const {value} = e.target
        const newNumData = [...numdata]
        const filterNumData = newNumData.filter(num => num.toString().includes(value))
        setFilteredData(filterNumData)
    }
    useEffect(() => {
        const raffleNumRef = ref(db,`raffle/1mprize/takenNumber`)
        onValue(raffleNumRef,(snapshot) => {
            const data = snapshot.val()
            setTakenNumber(data)
            console.log(data)
        })
    },[])
   
  return (
    <section className='raffle-draw-container'>
        {!takenNumber && 
        <div className="raffle-draw-loader-container">
        <div className="loader"></div>
    </div>
        }
        {isLoading && 
        <div className="raffle-draw-loader-container">
            <div className="loader"></div>
        </div>
        }
        <div className="raffle-draw-header">
            <h1>Raffle Draw 3000 slots</h1>
            <h2>500 per slot buy now</h2>
            <h3>Prize: 1 Million PHP</h3>
        </div>
        <div className="raffle-search-number">
            <div className="raffle-search-inp">
                <input onChange={(e) => SearchInpHandler(e)} type="text" />
                <button><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
        </div>
        <div className="raffle-my-raffle-ticket">
            <div className="rmrt-ticket-wrapper">
                <span className='rmrt-txt'>Your Ticket:</span>
                {userD && userD.raffle && userD.raffle[0] !== "null"  ?
                userD?.raffle.map((key:any,index:any) => (
                    <span className='rmrt-tickets' key={index}>{key}</span>
                )) : "No tickets"
            }
            </div>
        </div>
        <div className="raffle-number-container">
        {
          filteredData.map((key:any,index:any) => (
            <button
            onClick={() => {
                setTempSelectNum(key)
            }}
            style={{
                pointerEvents : takenNumber.includes(key) ? "none" : "auto",

                border: parseInt(tempSelectNum) === key ? "1px solid yellow":"",
                background: parseInt(tempSelectNum) === key ? "var(--yellow)" : 
                takenNumber.includes(key) ?
                "var(--red)":"var(--green)"
            }}
            className='raffle-number-box' key={index}>
                <span>{key}</span>
            </button>
          ))
        }
        </div>
        
        <div className="raffle-buy-button">
            <button onClick={() => setSelectedNumber(tempSelectNum)}>Buy Ticket</button>
        </div>
        {
            selectedNumber && 
        <div className="raffle-cbuy-container">
                <div className="raffle-cbuy-body">
                    {
                        errorMsg &&
                        <div className="rcbuy-err-msg">
                        <span>{errorMsg}</span>
                    </div>

                    }
                   
                    <div className="raffle-cbuy-text">
                        <p>Are you sure you want to buy</p>
                        <p>number: <span>{selectedNumber}</span></p>
                    </div>
                    <div className="raffle-cbuy-action">
                        <button
                        onClick={ConfirmBuyHandler} className='r-cbuy-yes'>YES</button>
                        
                        <button onClick={() => {setSelectedNumber("")
                        setErrorMsg("")}
                        } className='r-cbuy-no'>CANCEL</button>
                    </div>
                </div>
        </div>
        }
    </section>
  )
}

export default RaffleDraw