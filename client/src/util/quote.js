

function randomQuote(){

    let quotes = [
        {
            "quote": 'If there were not luck involved, I would win every time',
            "author": 'Phil Hellmuth',
        },
        {
            "quote": 'The man who has no imagination has no wings',
            "author": 'Muhammad Ali',
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
            "quote": 'The more difficult the victory, the greater the happiness in winning',
            "author": 'Pele',
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
            "quote": 'You can\'t put a limit on anything. The more you dream, the farther you get',
            "author": 'Michael Phelps',
        },
        {
            "quote": 'If you are afraid of failure you don’t deserve to be successful',
            "author": 'Charles Barkley',
        },
        {
            "quote": 'Necessity is the mother of taking chances',
            "author": 'Mark Twain',
        },
        {
            "quote": 'You have to expect things of yourself before you can do them',
            "author": 'Michael Jordan',
        },
        {
            "quote": 'You can’t get much done in life if you only work on the days when you feel good',
            "author": 'Jerry West',
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