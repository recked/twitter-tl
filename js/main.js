(function () {
	'use strict';

    //Codebird init
    var cb = new Codebird;
    cb.setConsumerKey('NqAdX4XSP99pAtadilguiAwRy', 'T1kQeGQd6XAJXYpPvlly1nmQLqlJwo9eQTjuZpnNNChYkIzngX');
    cb.setToken('90739861-dw2SqkD8BjGV1265VO1uTWVaBFzKNi1wGlGKzA0t9', '61cEusg6VesSoqlCknczP4lLQGvyHX6KX3m1trnR9kMlW');

    /* 
    ==========================================
    */

    var user = document.getElementsByClassName('user'), //the input
    	userButton = document.getElementsByClassName('btn-user'), //user button
    	loadButton = document.getElementsByClassName('btn-load'), //load more button
    	feed = document.getElementsByClassName('feed'), //feed div
    	bio = document.getElementsByClassName('bio'), //bio div
    	loader = document.getElementById('spin'), //css loader
    	tweetCount, 
    	tweets;

    // Get Tweets Button click
    userButton[0].addEventListener('click', function () {
        feed[0].innerHTML = '';
        bio[0].innerHTML = '';
        var twitterUser = user[0].value;
        tweetCount = 6;
        if (twitterUser === '') {
            feed[0].innerHTML = '<div class="error">Please enter a username!</div>';
        } else {
            twitterUser = twitterUser.replace(/[@]/, '');
            getTweets(twitterUser);  
        }

    });

    //Get user's tweets
    var getTweets = function (result) {

        loader.setAttribute('style', 'display: block;');

        var params = {
            screen_name: result,
            count: 100
        };
        cb.__call(
            'statuses_userTimeline',
            params,
            function (reply) {
                loader.setAttribute('style', 'display: none;');
                tweets = reply;
                loadMore(tweetCount, tweets);
                bio[0].innerHTML = 'Latest tweets from ' + tweets[0].user.name;
                return tweets;
            },
            true
        );
    };

    // Get Tweets Button click
    loadButton[0].addEventListener('click', function () {
        loadMore(tweetCount, tweets);
    });

    var loadMore = function (length, data) { //load more tweets

        if (data[0] === undefined) {
            var error = document.createElement('div');
            error.className = 'error';

            if (data.errors === undefined) { //if someone put a space in the username. ex: 'miami dolphins'
                error.innerHTML = 'Try a valid username.';
            } else {
                error.innerHTML = data.errors[0].message + '. Try a valid username.';
            }
            
            feed[0].appendChild(error);

        } else {
            
            loadButton[0].setAttribute('style', 'display: inline-block;');

            for (var i = length - 6; i < length; i++) {
                //creating elements to wrap tweets
                //containg div
                var tiles = document.createElement('div');
                tiles.className = 'tiles';

                //tweet
                var tweet = document.createElement('div');
                tweet.className = 'tweet';
                tweet.innerHTML = data[i].text;

                //retweets
                var retweet = document.createElement('div');
                retweet.className = 'retweet';
                retweet.innerHTML = 'Retweets ' + data[i].retweet_count;

                //favs
                var fav = document.createElement('div');
                fav.className = 'fav';
                fav.innerHTML = 'Favorites ' + data[i].favorite_count;

                tiles.appendChild(tweet);
                tiles.appendChild(retweet);
                tiles.appendChild(fav);

                feed[0].appendChild(tiles);
            }
            tweetCount = tweetCount + 6;
        }

    };

})();