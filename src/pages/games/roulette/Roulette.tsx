import '../../../assets/css/pages/games/roulette/Roulette.css'
import { useRef, useState } from 'react'
const Roulette = () => {
    const rouletteBox = useRef<any>(null)
    const [price,setPrice] = useState<any>('')
    const [btnDisabled ,setBtnDisabled] = useState<boolean>(false)
    const [isSpin,setIsSpin] = useState<any>(false)
    const roulette_numbers = [
        [3557,3560],
        [3565,3571],
        [3575.5,3584],
        [3588,3587],
        [3601.5,3613],
        [3616,3624],
        [3628.5,3634],
        [3638.5,3642.4],
        [3647,3651],
        [3655,3661],
        [3665,3673],
        [3679,3686],
        [3693,3700],
        [3707,3713],
        [3719,3724],
        [3729,3732],
        [3739],
        [3745.5,3751],
        [3756,3763.5],
        [3763.5],
        [3782,3791],
        [3796.5,3804],
        [3809,3814],
        [3820],
        [3827,3830],
        [3835,3840],
        [3846,3853],
        [3858,3867],
        [3872,3881],
        [3886,3894],
        [3899,3904],
        [3910],
    ]
    const data = [
        {value:"Try Again" ,color: "var(--yellow)",price:"Try Again"},
        {value: "100 Lucky Points",color: "var(--green)",price:"100 Lucky Points"},
        {value:"Try Again",color: "var(--red)",price:"Try Again"},
        {value: "20 PHP",color: "var(--yellow)",price:"20 PHP"},
        {value: "200 Lucky Points",color: "var(--green)",price:"200 Lucky Points"},
        {value: "20 PHP",color: "var(--red)",price:"20 PHP"},
        {value: "300 Lucky Points",color: "var(--yellow)",price:"300 Lucky Points"},
        {value: "20 PHP",color: "var(--green)",price:"20 PHP"},
        {value:"Try Again",color: "var(--red)",price:"Try Again"},
        {value: "100 PHP",color: "var(--yellow)",price:"100 PHP"},
        {value: "400 Lucky Points",color: "var(--green)",price:"400 Lucky Points"},
        {value: "200 PHP",color: "var(--red)",price:"200 PHP"},
        {value:"Try Again",color: "var(--yellow)",price:"Try Again"},
        {value: "20 PHP",color: "var(--green)",price:"20 PHP"},
        {value: "500 Lucky Points",color: "var(--red)",price:"500 Lucky Points"},
        {value: "20 PHP",color: "var(--yellow)",price:"20 PHP"},
        {value: "100 Lucky Points",color: "var(--green)",price:"100 Lucky Points"},
        {value:"Try Again",color: "var(--red)",price:"Try Again"},
        {value: "100 Lucky Points",color: "var(--yellow)",price:"100 Lucky Points"},
        {value: "⭐ Jackpot ⭐",color: "var(--light-black)",price:"100 Lucky Points"},
        {value:"Try Again",color: "var(--red)",price:"Try Again"},
        {value: "300 Lucky Points",color: "var(--yellow)",price:"300 Lucky Points"},
        {value: "20 PHP",color: "var(--green)",price:"20 PHP"},
        {value: "20 PHP",color: "var(--red)",price:"20 PHP"},
        {value:"Try Again",color: "var(--yellow)",price:"Try Again"},
        {value: "400 Lucky Points",color: "var(--green)",price:"400 Lucky Points"},
        {value:"Try Again",color: "var(--red)",price:"Try Again"},
        {value: "20 PHP",color: "var(--yellow)",price:"20 PHP"},
        {value:"Try Again",color: "var(--green)",price:"Try Again"},
        {value: "20 PHP",color: "var(--red)",price:"20 PHP"},
        {value:"Try Again",color: "var(--yellow)",price:"Try Again"},
        {value: "20 PHP",color: "var(--green)",price:"20 PHP"},
    ]

    const StartSpin = () => {
        setIsSpin(false)
        setBtnDisabled(true)
        rouletteBox.current.style.transform = `rotate(0deg)`
        rouletteBox.current.style.transition = `none`
        rouletteBox.current.style.animation = 'start .5s forwards'
        
        const spinList = Math.floor(Math.random() * (roulette_numbers.length - 1)) + 1
        // console.log(roulette_numbers.length)
        console.log(spinList)
        console.log(roulette_numbers.length)
        setTimeout(() => {

            if(roulette_numbers[spinList].length ===1 ){
                console.log(data[spinList])
                rouletteBox.current.style.transform = `rotate(${-roulette_numbers[spinList][0]}deg)`
                rouletteBox.current.style.transition = `all ease-in-out 15s`
            }
            else {
                const price = (min:number,max:number) => {
                    return Math.floor(Math.random() * ((max - min) + 1)) + min;
                }
                console.log('price', price(roulette_numbers[spinList][0],roulette_numbers[spinList][1]))
        
                rouletteBox.current.style.transform = `rotate(-${price(roulette_numbers[spinList][0],roulette_numbers[spinList][1])}deg)`
                rouletteBox.current.style.transition = `all ease-in-out 15s`
            }
        },100)
        
        setTimeout(() => {
            console.log(data[spinList])
            setPrice(data[spinList])
            rouletteBox.current.style.animation = ''
        },15500)
    }
  return (
    <section className='roulette-container'>
        <div className="roulette-c-bg">

        <div className="roulette-header">
            <h1>500k Jackpot Price. Play now!</h1>
        </div>
        <div className="roulette-game-box">
            <div className="main-roulette">
            <div className="roulette-arrow">
            </div>
            {/* <i className="fa-solid fa-arrow-down-long roulette-pointer"></i> */}
                <div ref={rouletteBox} className="roulette-box">
                    {data.map((val,index) => (
                        <div key={index} className="box-data" style={{backgroundColor: val.color}}>
                            <span>
                            {val.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
        <div className="roulette-action-button">
            <button disabled={btnDisabled} onClick={() => setIsSpin(true)}>Start Spin</button>
        </div>
        </div>


        
        {price && 
        
        <div className="roulette-price-model">
            <div className="roulette_price_container">
                <div className="roulette-price-text">
                    <h1>Congratulation You Won!</h1>
                    <h1>{price.price}</h1>
                </div>
                    <div className="roulette_price_btn">
                        <button onClick={() => {setPrice(null)
                        setBtnDisabled(false)
                        }}>Ok</button>
                    </div>
            </div>                    
        </div>
        }

        {isSpin && 
        
        <div className="roulette-cs-popup">
            <div className="rcsp-body">
                <i className="fa-solid fa-xmark close-cs-popup" onClick={() => setIsSpin(false)}></i>
                <div className="rcsp-text">
                    <span>Are you sure you want to spin for </span>
                    <i className="fa-solid fa-money-bill"></i>
                    <span className='credit-20'>20 Credits</span>
                </div>
                <div className="rcsp-action">
                    <button onClick={StartSpin}>Yes</button>
                    <button onClick={() => setIsSpin(false)}>Cancel</button>
                </div>
            </div>
        </div>
        }
    </section>
  )
}

export default Roulette