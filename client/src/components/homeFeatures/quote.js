import randomQuote from "../../util/quote";
import Auth from "../../util/auth";
import './quote.css'
let quote = randomQuote()



function Quote(){

    
    let user = Auth.getProfile().data;

    return (
        <>
        <div className="welcome-container">
            <div className="name-container">
                <h3>Welcome</h3>
                <h3>{user.username}!</h3>
            </div>
            <div className="quote-container">
                <h5 className="quote"><i>{quote.quote}</i></h5>
                <i>~{quote.author}</i>
            </div>
        </div>

        </>


    )

}

export default Quote;