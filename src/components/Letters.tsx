
import '../Styles/Letter.css';

//propiedades que vamos a recibir 
interface LettersProps {
    id: number;
    letter: string;
    correct: boolean|undefined;
    check: (id:number) => void;
    disabled:boolean;
}



const Letters = ({letter, check, id, correct, disabled}: LettersProps) => {

    const setColor = () => {
        if (correct === true) {
            return "#10A95B"
        } else if (correct === false) {
            return "#EC5D49"
        } else {
            return "#FCBA29"
        }
    }


    const style = {
        backgroundColor: setColor(),
    }



    return (
        <>
            <button className="Letter" disabled={disabled} style={style} onClick={() => check(id)}>{letter}</button>
        
        </>

    )
}

export default Letters;