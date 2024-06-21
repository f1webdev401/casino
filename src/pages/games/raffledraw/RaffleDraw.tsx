import { useState ,useContext, useEffect} from 'react'
import '../../../assets/css/pages/games/raffledraw/RaffleDraw.css'
import UserContext from '../../../context/UserContext'
import { set ,ref ,update,onValue} from 'firebase/database'
import { db } from '../../../firebase-config'
import NeedLogin from '../../../components/NeedLogin'
const RaffleDraw = () => {

    const {userD,setUserD} = useContext(UserContext)

    const [takenNumber,setTakenNumber] = useState<any>('')

    const [selectedNumber,setSelectedNumber] = useState<any>('')
    const [tempSelectNum,setTempSelectNum] = useState<any>("")
    const [isLoading,setIsLoading] = useState<boolean>(false)

    const [errorMsg,setErrorMsg] = useState<any>("")
    const [numdata] = useState<number[]>(Array.from({ length: 3000 }, (_, i) => i + 1));
    const [isBuyTicket,setIsBuyTicket] = useState<any>(false)
    const [filteredData, setFilteredData] = useState<any>(numdata);
    const [sucessPnum,setSuccessPNum] = useState<any>('')
    const [successP,setSuccessP] = useState<boolean>(false)
    const [buyInfo,setBuyInfo] = useState<any>({
        fullname: "",
        mobileNumber: "",
        address: ""
    })
    const [biError,setbiError] = useState<string>("")
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
                        raffle:[{fullname: buyInfo.fullname,mobilenumber:buyInfo.mobileNumber,address:buyInfo.mobileNumber,ticketnumber:selectedNumber}],
                        credits: parseInt(userD.credits) - 500
                    })
                }
                if(userD.raffle[0] !== "null") {
                    await update(ref(db,`users/${userD.uid}`),{
                        raffle:[...userD.raffle,{fullname: buyInfo.fullname,mobilenumber:buyInfo.mobileNumber,address:buyInfo.mobileNumber,ticketnumber:selectedNumber}],
                        credits: parseInt(userD.credits) - 500
                    })
                }
                setIsLoading(false)
                
                setSelectedNumber("")
                setSuccessP(true)
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
    const InfoHandlerInp = (e:any) => {
        const {name,value} = e.target
        setBuyInfo((prev:any) => ({...prev,[name]:value}))        
    } 
    const CancleInfoHandler = () =>  {
        setIsBuyTicket(false)
        setBuyInfo({fullname: "",
            mobileNumber: "",
            address: ""})
    }
    const ConfirmInfoHandler = () => {
        if(buyInfo.fullname === "" || buyInfo.address === "" || buyInfo.mobileNumber === "") {
            setbiError("Please fill all fields")
            return;
        }
        setIsBuyTicket(false)
        setSelectedNumber(tempSelectNum)
    }

    const BuyTicketBtn = () => {
        setIsBuyTicket(true)
        setBuyInfo({fullname: "",
            mobileNumber: "",
            address: ""})
        setErrorMsg("")
        
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
        <NeedLogin/>
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
            <div className="raffle-draw-h-wrapper">
            <h1>Raffle Draw 3000 slots</h1>
            <h2>500 per slot buy now</h2>
            <h3>Prize: 1 Million PHP</h3>
            </div>
        </div>

        <div className="raffle-draw-num-left">
            {takenNumber && 
                    <div className='rdnl-av-number'>
                        <span>{ 3001 - (takenNumber.length)} Slots Available</span>
                    </div>
                }
        </div>

        <div className="raffle-search-number">
            <div className="raffle-search-inp">
                <input placeholder='search number ...' onChange={(e) => SearchInpHandler(e)} type="text" />
                <button><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
        </div>
        <div className="raffle-my-raffle-ticket">
            <div className="rmrt-ticket-wrapper">
                <span className='rmrt-txt'>Your Ticket:</span>
                {userD && userD.raffle && userD.raffle[0] !== "null"  ?
                userD?.raffle.map((key:any,index:any) => (
                    <span className='rmrt-tickets' key={index}>{key.ticketnumber}</span>
                )) : <span className="rmrt-no-tickets">No tickets</span>
            }
            </div>
        </div>
        <div className="raffle-number-container">
            <div className="raffle-number-box-wrapper">
            {
          filteredData.map((key:any,index:any) => (
            <button
            onClick={() => {
                setTempSelectNum(key)
                setSuccessPNum(key)
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
      
        </div>
        
        <div className="raffle-buy-button">
            <button onClick={BuyTicketBtn}>Buy Ticket</button>
        </div>
        {
            isBuyTicket && 
            <div className="rd-join-info-container">
            <div className="rd-join-info">
                <div className="rdji-header">
                    <span>Please Fill Up the FORM</span>
                </div>
                {
                    biError && 
                    <div className="rdji-error">
                        <span>{biError}</span>
                        <button onClick={() => setbiError("")}><i className="fa-solid fa-xmark"></i></button>
                    </div>
                }
               
                <div className="rdji-input">
                    <label htmlFor="fullname">Full Name</label>
                    <input
                    name='fullname'
                    value={buyInfo.fullname}
                    onChange={(e) => InfoHandlerInp(e)}
                    id='fullname'
                    type="text" />
                </div>
                <div className="rdji-input">
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <input 
                    name='mobileNumber'
                    value={buyInfo.mobileNumber}
                    onChange={(e) => InfoHandlerInp(e)}
                    id='mobileNumber'
                    type="text" />
                </div>
                <div className="rdji-input">
                    <label htmlFor="address">Address</label>
                    <input 
                    name='address'
                    value={buyInfo.address}
                    onChange={(e) => InfoHandlerInp(e)}
                    id='address'
                    type="text" />
                </div>
                <div className="rdj-action">
                    <button onClick={ConfirmInfoHandler}>Confirm</button>
                    <button onClick={CancleInfoHandler}>Cancel</button>
                </div>
            </div>
            </div>
        }
      
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
        {
            successP &&
            <div className="raffle-success-purchase">
            <div className="rsp-body">
                <div className="rsp-body-content">
                <span>Successfully Purchase Ticket</span>
                <i className="fa-solid fa-check-to-slot"></i>
                <span className='rsp-number'>Number: <span>"{sucessPnum}"</span></span>
                </div>
                <div className="rsp-action">
                <button onClick={() => {
                    setSuccessPNum("")
                    setSuccessP(false)}}>Close</button>
                </div>
            </div>
        </div>
        }
      
        <div className="raffle-draw-instruction">
            <div className="raffle-draw-note">
                <span>! Please note that tickets are non-refundable after purchase.</span>
            </div>
            <div className="raffle-live-link">
                <span>Raffle Draw Live Stream Link</span><a href="#">Soon!</a>
            </div>

            <div className="raffle-draw-text">
                    <div className="rdt-content-head">
                        <span>How To Play?</span>
                    </div>
                    <div className="rdt-instruct">
                            <span>1. Deposit at least ₱ 500 into your account.</span>
                            <span>2.Select the number of your choice, which will be highlighted in yellow.</span>
                            <span>3.Click the "Buy Ticket" button.</span>
                            <span>4. A confirmation window will appear. Click "Yes" if you have selected the correct number.</span>
                            <span>5. A form will pop up. Fill in your name, phone number, and address, then click "Proceed."</span>
                            <span>6. A success message will appear, confirming your transaction.</span>
                    </div>
           
            </div>

            <div className="raffle-draw-conduct">
                <div className="rdc-header">
                    <span>"How the raffle drawing will be conducted"</span>
                </div>

                <div className="rdc-content-text">
                    <span>The raffle draw will begin once all slots are filled</span>
                    
                    <span>We will be using an app-based random raffle generator for the draw, tested by an RNG testing tech company to ensure fairness and accuracy.</span>
                </div>
            </div>
        </div>

    </section>
  )
}

export default RaffleDraw