

function randomQuote(){

    let quotes = [
        {
            "quote": 'If there were not luck involved, I would win every time',
            "author": 'Phil Hellmuth',
        },
        {
            "quote": 'Nobody is always a winner, and anybody who say he is, is either a liar or doesn\'t play',
            "author": 'Amarillo Slim',
        },
        {
            "quote": 'Javale Mcgee is in fact the GOAT',
            "author": 'Lebron James',
        },
        {
            "quote": 'When I was in high school, I had a gambling problem',
            "author": 'Young Thug',
        },
        {
            "quote": 'The biggest mistake we made as a company was betting too much on HTML5',
            "author": 'Mark Zuckerberg',
        },
        {
            "quote": 'The greatest risk is not taking one ',
            "author": 'Tim Fargo',
        },
        {
            "quote": 'Go out on a limb. That\'s where the fruit is',
            "author": 'Jimmy Carter',
        },
        {
            "quote": 'If you risk nothing, then you risk everything',
            "author": 'Geena Davis',
        },
        {
            "quote": 'You never get over losses. I\'ve never gotten over one loss I\'ve had in my career. They always stick with me',
            "author": 'Tom Brady',
        },
        {
            "quote": 'Do not be too timid and squeamish about your actions. All life is an experiment. The more experiments you make the better',
            "author": 'Ralph Waldo Emerson',
        },
        {
            "quote": 'Necessity is the mother of taking chances',
            "author": 'Mark Twain',
        },
        {
            "quote": 'I can accept failure. Everybody fails at something. But I can\'t accept not trying. Fear is an illusion',
            "author": 'Michael Jordan',
        },
        {
            "quote": 'I think luck falls on not just the brave but also the ones who believe they belong there',
            "author": 'Novak Djokovic',
        },
        {
            "quote": 'If you don\'t fall, how are you going to know what getting up is like?',
            "author": 'Stephen Curry',
        },

        

    ]
    let random = Math.floor(Math.random() * quotes.length);
     
    return quotes[random];

}

export default randomQuote;