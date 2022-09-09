import './genActiveBetDiv.css'


function GenActiveBetDiv({betData}){

    

    return(
        <>
            <div className="all-bets-indiv">
                <div className='all-bets-header'>
                    <p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  className="bi bi-person-badge" viewBox="0 0 16 16">
                        <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z"/>
                        </svg>
                        {betData?.sender?.username}
                    </p>
                    <p>vs.</p>
                    <p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  className="bi bi-person-badge" viewBox="0 0 16 16">
                        <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z"/>
                        </svg>
                        {betData?.receiver?.username}
                    </p>
                </div>
                <div className='all-bets-wager'>
                    <p>Wager</p>
                    <p>{betData.condition}</p>

                </div>
                <div className='all-bets-prize'>
                    <p>OTL</p>
                    <p>{betData.reward}</p>
                </div>

                <div className='caret'>
                    <a href={`/bet-details/${betData._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" className="bi bi-caret-right" viewBox="0 0 16 16">
                      <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                        </svg>
                    </a>
                </div>

            </div>
        </>
    )
}

export default GenActiveBetDiv;