import "./PlayButton.css"

interface PlayButtonProps {
  href?: string;
}

function PlayButtonSvg() {
  return (
    <svg>
      <circle cx="41" cy="41" r="37" stroke="#fff" strokeWidth="3" fill="none"></circle>
      <polygon fill="none" stroke="#fff" strokeWidth="3" points="32,25 32,58 60,42"></polygon>
    </svg>

  )
}

export default function PlayButton({ href }: PlayButtonProps) {

  return (
    <div className="play-btn-container">
      {href ?
        <a href={href} className="play-btn stretched-link">
          <PlayButtonSvg />
        </a> :
        <button type="submit" className="play-btn streched-link">
          <PlayButtonSvg />
        </button>
      }

    </div>
  );
}
