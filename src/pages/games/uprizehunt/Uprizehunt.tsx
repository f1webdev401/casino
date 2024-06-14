import '../../../assets/css/pages/games/uprizehunt/Uprizehunt.css'
const Uprizehunt = () => {
    const data = [
        0,0,0,0,0,
        0,0,0,0,0,
        0,0,1,0,0,
        0,0,0,0,0,
        0,0,0,0,0,
    ]
  return (
    <section className="uprizehunt-container">

        <div className="uprize-h-header">
            <h1>500k Jackpot Prize</h1>
        </div>

        <div className="uprize-h-game">
            {data.map((key:number,index:number) => (
                <div className="uprize-box" key={index}>
                    {key}
                </div>
            ))}
        </div>
        <div className="uprize-action-btn">
            <button>Start</button>
        </div>
        <div className="uprize-sure-start">

        </div>
    </section>
  )
}

export default Uprizehunt