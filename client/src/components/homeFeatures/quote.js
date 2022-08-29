import randomQuote from "../../util/quote";
let quote = randomQuote()

function Quote(){

    

    return (
        <>
        <div>
            <h5 className="quote"><i>{quote.quote}</i></h5>
            <i>~{quote.author}</i>
        </div>
        </>


    )

}

export default Quote;