import '../Styles/Main.css';
import { useEffect, useState } from "react";
import Letter from "./Letters";
import WordItem from "./WordItem";
import { generate } from 'random-words';
import ResultMessage from './ResultMessage';
import Tag from './Tag';


interface Letter {
    letter: string;
    correct: boolean | undefined;
    used: boolean;
}

interface Word {
    word: string;
    display: boolean

}

interface Tag {
    text: string;
    backgroundColor: string;
    textColor: string;
}

const Main = () => {

    const [letters, setLetters] = useState<Letter[]>(() => { return (generateLetters()) });
    const [displayLetter, setDisplayLetter] = useState<JSX.Element[] | null>(null);


    const [myWord, setMyWord] = useState<string>(() => { return (generateMyWord()) });
    const [word, setWord] = useState<Word[]>(() => { return (generateWord()) });
    const [displayWord, setDisplayWord] = useState<JSX.Element[] | null>(null);


    const [attempts, setAttempts] = useState<number>(8);
    const [result, setResult] = useState<number>(() => { return (myWord.length) })

    const [tags, setTags] = useState<Tag[]>(() => { return (generateTags()) })

    const [eliminateMessage, setEliminateMessage] = useState<JSX.Element | null>(() => { return (null) })



    function handleCheck(id: number) {
        !myWord.includes(letters[id].letter) ? setAttempts(prevAttempts => prevAttempts - 1) : setResult(prevResult => prevResult - myWord.match(new RegExp(letters[id].letter, "g"))!.length);
        setLetters((prevLetters) => prevLetters.map(item => letters[id].letter === item.letter ? { ...item, correct: myWord.includes(letters[id].letter) ? true : false, used: true } : { ...item }));
        setWord(prevWord => prevWord.map(item => letters[id].letter === item.word ? { ...item, display: true } : { ...item }))
    }

    function generateLetters(): Letter[] {
        return Array.from({ length: 26 }, (_, index) => ({
            letter: String.fromCharCode(65 + index),
            correct: undefined,
            used: false,
        }));
    }

    function generateWord(): Word[] {
        const arrayWord = myWord.split("")
        return Array.from({ length: arrayWord.length }, (_, index) => ({
            word: arrayWord[index],
            display: false
        }))
    }

    function generateMyWord(): string {
        const word: string | string[] = generate()

        if (Array.isArray(word)) {
            return word[0].toUpperCase()
        }

        return word.toUpperCase()
    }

    function generateTags(): Tag[] {

        const colors: string[] = ['#E2680F', '#328AF1', '#F4EB13', '#2ED3E9', '#298EC6', '#599137', '#FFD742', '#D02B2B', '#2D519F']
        const tags: string[] = ['HTML', 'CSS', 'JavaScript', ' React', 'TypeScript', 'Node.js', 'Python', 'Ruby', 'Assembly']
        const textColors: string[] = ['#faf5dc', '#faf5dc', '#1E1E1E', '#1E1E1E', '#faf5dc', '#faf5dc', '#1E1E1E', '#faf5dc', '#faf5dc']

        return Array.from({ length: 9 }, (_, index) => ({
            text: tags[index],
            backgroundColor: colors[index],
            textColor: textColors[index]
        }))
    }

    function restartGame() {
        setAttempts(8)
        setMyWord(generateMyWord())
        setTags(generateTags())
    }



    useEffect(() => {
        setDisplayLetter(letters.map((letter: Letter, index: number): JSX.Element => {
            return <Letter key={index} id={index} letter={letter.letter} correct={letter.correct} check={handleCheck} disabled={attempts === 0 || result === 0 || letter.used} />
        }));
    }, [letters]);


    useEffect(() => {
        console.log(word)
        console.log(myWord)

        if (attempts !== 0 && result !== 0) {
            setDisplayWord(word.map((item: Word, index: number): JSX.Element => { return (<WordItem key={index} word={item.word} displayWord={item.display} color={'#faf5dc'} />) }))
        }

        if (attempts === 0 || result === 0) {
            setDisplayWord(word.map((item: Word, index: number): JSX.Element => { return (<WordItem key={index} word={item.word} displayWord={true} color={item.display ? '#10A95B' : '#EC5D49'} />) }))
        }
    }, [word]);


    useEffect(() => {
        setTags(prevTags => prevTags.map((item: Tag, index: number) => (index + attempts) === 7 ? { ...item, backgroundColor: '#EC5D49' } : item))
        if (attempts !== 8) setEliminateMessage(<ResultMessage message={`Farewell ${tags[7 - attempts].text}`} color={'#7A5EA7'} />)
    }, [attempts]);


    useEffect(() => {
        setEliminateMessage(<ResultMessage message={  attempts !== 8 ?'Well Done' : 'Use The Buttons At The Bottom'} color='#10A95B' />) 
    }, [result]);

    useEffect(() => {
        setWord(generateWord())
        setResult(myWord.length)
        setLetters(generateLetters())
    }, [myWord])


    return (
        <div className='containerMain'>

            <div className='containerResult'>
                {attempts === 0 ? <ResultMessage message={'You lose'} color={'#EC5D49'} /> : undefined}
                {result === 0 ? <ResultMessage message={'You win'} color={'#10A95B'} /> : undefined}
                {eliminateMessage && (attempts !== 0 && result !== 0) ? eliminateMessage : undefined}
            </div>

            <div>
                {tags.map((tag, index) => <Tag key={index} text={tag.text} backgroundColor={tag.backgroundColor} textColor={tag.textColor} />)}
            </div>

            <div className="containerWordItems">
                {displayWord}
            </div>

            <div className='containerLetters'>
                {displayLetter}
            </div>


            {attempts === 0 || result === 0 ? <button className='resetButton' onClick={restartGame}  >{'NewGame'}</button> : undefined}
        </div>
    );
}


export default Main;