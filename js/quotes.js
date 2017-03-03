$(document).ready(function() {

    var tQuote, tAuthor;

    function getHardcodedQuote() {
        var quotes = ["Software is like sex: it's better when its free.",
            "Whether gods exist or not, there is no way to get absolute certainty about ethics. Without absolute certainty, what do we do? We do the best we can.",
            "That's what Paradise is - never knowing the difference.",
            "Kindness is the language which the deaf can hear and the blind can see.",
            "What transforms this world is — knowledge. Do you see what I mean? Nothing else can change anything in this world. Knowledge alone is capable of transforming the world, while at the same time leaving it exactly as it is. When you look at the world with knowledge, you realize that things are unchangeable and at the same time are constantly being transformed.",
            "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma - which is living with the results of other people's thinking. Don't let the noise of others' opinions drown out your own inner voice. And most important, have the courage to follow your heart and intuition.",
            "It does not matter how slowly you go so long as you do not stop.",
            "Much of the stress that people feel doesn't come from having too much to do. It comes from not finishing what they started.",
            "Science without religion is lame, religion without science is blind."
        ];
        var authors = ["Linus Torvalds", "Richard Stallman", "Joesph Heller", "Mark Twain", "Yukio Mishima", "Steve Jobs", "Confucius", "David Allen", "Albert Einstein"];
        var random = Math.floor(Math.random() * quotes.length);
        tQuote = quotes[random];
        tAuthor = authors[random];

        $("#quote").hide().fadeIn(2500).text('"' + tQuote + '"');
        $("#author").hide().fadeIn(2500).text('- ' + tAuthor);
    }

    $('#newQuote').click(function() {
        var randomNumber = Math.floor(Math.random() * 100);
        if (randomNumber <= 20) {
            getHardcodedQuote();
        } else {
            $.ajax({
                url: 'https://andruxnet-random-famous-quotes.p.mashape.com/',
                type: "GET",
                dataType: 'json',
                success: function(data) {
                    tQuote = data.quote;
                    tAuthor = data.author;
                    $('#quote').hide().fadeIn(2500).text('"' + tQuote + '"');
                    $('#author').hide().fadeIn(2500).text('- ' + tAuthor);
                },
                error: function(xhr, status, error) {
                    getHardcodedQuote();
                    console.log("API failure: " + status + " HTTP Error: " + error);
                },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("X-Mashape-Authorization", "JtFLL4PUpgmshNOM8150T9PNeldYp1Ci8jDjsn8J7B1Q0nMgFO");
                }
            })
        }
    });

    $('#tweet').click(function() {
        if(tQuote.length > 140){
          tQuote="Woops! The quote is too long for Twitter's preferences!";
          tAuthor="The Developer Of The Random Quote Machine";
        }
        window.open("https://twitter.com/intent/tweet?text=" + tQuote + " -- " + tAuthor);
    });
});
