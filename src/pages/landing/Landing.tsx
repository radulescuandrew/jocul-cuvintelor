import React, { useEffect, useState } from 'react';
import { getExpiryTime, Timer } from '../../common/components/Timer';
import { GLOBAL_TIMER_T0, SOLUTION_TIMER_T0 } from '../../common/constants/General.constants';
import { QA, WORDS_SETS } from '../../common/constants/WordSets.constants';

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
  const [wordsSet, setWordsSet] = useState(WORDS_SETS);
  const [lastQuestionId, setLastQuestionId] = useState<number>();

  const [currentQA, setCurrentQA] = useState<QA>(WORDS_SETS[0]);
  const [prize, setPrize] = useState(0);
  const [currentPrize, setCurrentPrize] = useState(WORDS_SETS[0].word.length * 10);

  const [letters, setLetters] = useState(
    Array.from({ length: WORDS_SETS[0].word.length }) as string[],
  );

  const [isNewGameStarted, setIsNewGameStarted] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isSolutionPhase, setIsSolutionPhase] = useState(false);

  useEffect(() => {
    console.table({ isNewGameStarted, isGameActive, isSolutionPhase });
  });

  useEffect(() => {
    const max = Math.max(...wordsSet.map((qa) => qa.id));
    setLastQuestionId(max);
  }, [wordsSet]);

  useEffect(() => {
    setCurrentPrize((currentQA?.word?.length - letters.filter(Boolean).length) * 10);
  }, [letters]);

  useEffect(() => {
    if (isNewGameStarted) {
      setIsGameActive(true);
      setIsSolutionPhase(false);
      setLetters(Array.from({ length: WORDS_SETS[0].word.length }) as string[]);
      setPrize(0);
      setCurrentPrize(wordsSet[0].word.length * 10);
      setCurrentQA(wordsSet[0]);
    }
  }, [isNewGameStarted]);

  const giveLetter = () => {
    if (currentQA.word.length !== letters.length) return;

    let freeIndex = -1;
    while (freeIndex === -1) {
      const index = Math.floor(Math.random() * currentQA.word.length);
      if (!letters[index]) {
        freeIndex = index;
      }
    }

    const lettersCopy = [...letters];
    lettersCopy[freeIndex] = currentQA.word[freeIndex];

    setLetters(lettersCopy);
  };

  const giveSolution = () => {
    setIsGameActive(false);
    setIsSolutionPhase(true);
  };

  const onWrongSolution = () => {
    setIsSolutionPhase(false);
    setPrize(prize - currentPrize);
    setLetters(currentQA.word.split(''));
  };

  const onCorrectSolution = () => {
    setIsSolutionPhase(false);
    setPrize(prize + currentPrize);
    setLetters(currentQA.word.split(''));
  };

  const nextWord = () => {
    const next = wordsSet.find((qa) => qa.id == currentQA.id + 1);
    if (next && !isGameEnded) {
      setLetters(Array.from({ length: next.word.length }) as string[]);
      setCurrentQA(next);
      setIsGameActive(true);
    } else {
      alert(`Game ended, you won ${prize} RON`);
    }
  };

  const gameEnded = () => {
    giveSolution();
    setIsGameEnded(true);
  };

  /** HELPERS */

  return (
    <div>
      {isNewGameStarted && (
        <div className="game-zone">
          <div className="flex justify-between mb-1">
            <div>
              Global timer{' '}
              <Timer
                timeToLast={getExpiryTime(GLOBAL_TIMER_T0)}
                onTimerEnd={gameEnded}
                started={isGameActive}
              />
            </div>
            {isSolutionPhase && (
              <div>
                Solution timer{' '}
                <Timer
                  timeToLast={getExpiryTime(SOLUTION_TIMER_T0)}
                  started={isSolutionPhase}
                  onTimerEnd={onWrongSolution}
                />
              </div>
            )}

            <div style={{ fontSize: '50px' }}>
              <span>Prize: {prize}</span>
            </div>
          </div>
          <hr />
          <div>
            <div>Current question: {currentQA?.question}</div>
            {/* <div>Current word: {currentQA?.word} (to be hidden)</div> */}
            <div>Current possible prize: {currentPrize}</div>
          </div>

          <div id="solution-boxes" className="mt-5 flex">
            {currentQA?.word.split('').map((letter: string, i: number) => {
              return (
                <div
                  key={letter + i}
                  className="mx-2 w-[3rem] h-[3rem] border-2 border-indigo-500/100"
                >
                  {letters[i] || ''}
                </div>
              );
            })}
          </div>
          {!isSolutionPhase && (
            <div>
              {isGameActive && (
                <div>
                  <button
                    onClick={giveLetter}
                    type="button"
                    className="relative mt-2 inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    Da-mi litera
                  </button>
                  <button
                    onClick={giveSolution}
                    type="button"
                    className="relative mt-2 inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    Opresc timpul
                  </button>
                </div>
              )}
              {!isGameActive && (
                <button
                  onClick={nextWord}
                  type="button"
                  className="relative mt-2 inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {currentQA.id == lastQuestionId || isGameEnded
                    ? 'Vezi rezultat'
                    : 'Urmatorul cuvant'}
                </button>
              )}
            </div>
          )}
          {isSolutionPhase && (
            <button
              onClick={onCorrectSolution}
              type="button"
              className="relative mt-2 inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              Solutia este corecta
            </button>
          )}
        </div>
      )}

      {!isNewGameStarted && (
        <button
          onClick={() => setIsNewGameStarted(true)}
          type="button"
          className="relative mt-2 inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          Incepe jocul
        </button>
      )}
    </div>
  );
};

export default Landing;
