import '../Styles/WordItem.css'

interface WordItemProps {
    word: string;
    displayWord: boolean;
    color: string;
}

const WordItem = ({ word, displayWord, color }: WordItemProps) => {

    const style = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50px",
        minWidth: "50px",
        color: color,
        border: " 2px solid transparent",
        borderBottom: `3px solid ${color}` ,
        borderBottomColor: color,

    }


    return (
        <div className="letterBox">
            <h2 style={style}>{displayWord ? word : undefined}</h2>
        </div>
    );
}

export default WordItem;