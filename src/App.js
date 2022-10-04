import './App.scss';
import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareTwitter, faSquareTumblr } from '@fortawesome/free-brands-svg-icons';
import COLORS_ARRAY from './Colors'



let quoteUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {

  const [randNum, setRandNum] = useState(Math.floor(Math.random() * 2));
  const [quote, setQuote] = useState("The most common way people give up their power is by thinking they don’t have any.");
  const [author, setAuthor] = useState("Alice Walker");
  const [quoteArr, setQuoteArr] = useState(null);
  const [accentColor, setAccentColor] = useState('#282c34');
  
  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuoteArr(parsedJSON.quotes)
  }

  useEffect(() => {
    fetchQuotes(quoteUrl)
  }, [quoteUrl]);

  const generateNewQuote = () => {
    setRandNum(Math.floor(Math.random() * quoteArr.length));
    setQuote(quoteArr[randNum].quote);
    setAuthor(quoteArr[randNum].author);
    setAccentColor(COLORS_ARRAY[randNum]);
  }

  const tweetQuoteLink =  encodeURI("https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
                          "\"" +
                          quote +
                          "\" -" +
                          author);

  const tumblrPostLink = encodeURI("https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
                          author + 
                          "&content=" +
                          quote + 
                          "&canonicalUrl=https://www.tumblr.com/buttons&shareSource=tumblr_share_button");

  
  
  return (
    <div className="App" >
      <header className="App-header"
              style={{backgroundColor: accentColor,
                      color: accentColor}}>
        <div id="quote-box">
          <p id="text">
            "{quote}"
          </p>
          <p id="author">
            - {author}
          </p>
          <div id='button-box'>
            <div className='sns-btn' >
              <a id="tweet-quote" href={ tweetQuoteLink } title="Tweet this quote!" target="_blank">
                <FontAwesomeIcon icon={faSquareTwitter} size="xl" className='icons' style={{color: accentColor}}></FontAwesomeIcon>
              </a>
              <a id="post-quote" href={ tumblrPostLink } title="Post this on Tumblr!" target="_blank">
                <FontAwesomeIcon icon={faSquareTumblr} size='xl' className='icons' style={{color: accentColor}}></FontAwesomeIcon>
              </a>
            </div>
            <button id="new-quote" 
                    onClick={generateNewQuote} 
                    className="btn"
                    style={{background: accentColor}}>
                      New Quote
            </button>
          </div>
        </div>
        
      </header>
    </div>
  );
}

export default App;
