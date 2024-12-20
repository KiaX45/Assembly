import '../Styles/Result.css'

interface ResultMessageProps {
    message: string;
    color: string;
}

const ResultMessage = ({ message, color } : ResultMessageProps) => {
  return (
    <div className="result-message" style={{ backgroundColor: color }}>
      {message}
    </div>
  );
}

export default ResultMessage;