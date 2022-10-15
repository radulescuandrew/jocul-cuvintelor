import React, { useEffect, useState } from 'react';
import InputField from '../../common/components/input-field/InputField';
import { getExpiryTime, Timer } from '../../common/components/Timer';
import { GLOBAL_TIMER_T0 } from '../../common/constants/General.constants';
import { WORDS_SETS } from '../../common/constants/WordSets.constants';

/*
  
    Jocul cuvintelor:
    
    * Data: multiple sets with 14 words, 2x4 ... 2x10 letters, question and solution for each

    Functional requirements:
    1. Start game
      - Global timer set to 4 minutes
      - Global timer is starting 
      - Prize set to 0 
      - Display first word (of 4 letters)
    2. Give solution
      - Stop global timer
      - Start solution timer (30 seconds)
    3. Confirm solution
      - Correct solution is displayed
      - Prize is increased with 10 * number of letters remaining unguessed
    4. Ask for letter
      - A new letter is displayed from the current word
      - The prize is reduced with 10 points
      - A maximum of *word length* letters can be asked 
    5. Next word
      - The new word/question is displayed
      - Possible prize displayed equal to "number of letters" from the word
      - The global timer is starting


    Business rules:
      General:
        - The game has 4 minutes
        - When the global time reached 0 (zero), the game is done and the user has to "Give solution". 
        - When all the words are answerd, the game is finished.
        - For each word the "current possible prize" (CPP) is calculated [10 * numberOfLetters]
      1. User asks for letter
        - A new random letter is displayed from the current word
        - The "current possible prize" (CPP) is reduced by 10
      2. User asks to "Give Solution" (GS)
        - the global timer is stopped
        - the "current solution timer" (CST) is starting from 30 seconds
        - if the correct solution is given, the global prize is increased with [10 * (totalLetters - askedLetters)]
        - if the 30 seconds passed without a correct solution, the prize is reduced with [10 * (totalLetters - askedLetters)]
      3. Next word
        - the global timer is starting
        - the new word and the question are displayed
        - the "current possible prize" (CPP) is displayed [10 * numberOfLetters]
*/

const WORDS: any = WORDS_SETS;

const Landing = () => {
  const [wordsSet, setWordsSet] = useState(WORDS_SETS[0]);
  const [currentQA, setCurrentQA] = useState(WORDS_SETS[0][4][0]);
  const [letters, setLetters] = useState(
    Array.from({ length: WORDS_SETS[0][4][0].word.length }) as string[],
  );

  const giveLetter = () => {
    const currWordLetters = currentQA.word.split('');
    // Exclude already existing letters to find the pool used to get a random letter
    // const remaining = currWordLetters.reduce((arr: any, curr, i) => {
    //   return letters.includes(curr) ? arr : { ...arr, i: curr };
    // }, {});

    // const newLetters = [...letters];

    // setLetters([...letters]);

    // console.log(remaining);
  };

  const giveSolution = () => undefined;

  const startCurrentTimer = () => undefined;
  const stopGlobalTimer = () => undefined;

  /** HELPERS */

  return (
    <div>
      <div className="mb-1">
        Global timer
        <Timer timeToLast={getExpiryTime(GLOBAL_TIMER_T0)} />
      </div>
      <hr />
      <div>
        <div>Current question: {currentQA.question}</div>
        <div>Current word: {currentQA.word} (to be hidden)</div>
      </div>

      <div id="solution-boxes" className="mt-5 flex">
        {currentQA.word.split('').map((letter, i) => {
          return (
            <div key={letter + i} className="mx-2 w-[3rem] h-[3rem] border-2 border-indigo-500/100">
              {letters[i] || ''}
            </div>
          );
        })}
      </div>

      <button
        onClick={giveLetter}
        type="button"
        className="relative mt-2 inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        Da-mi litera
      </button>
    </div>
  );
};

export default Landing;
