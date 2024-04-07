import Image from "react-bootstrap/Image";
import PlayButton from "@/components/Button/PlayButton/PlayButton";
import Skeleton from "react-loading-skeleton";
import "./CoverImage.css";

interface CoverImageProps {
  id: string,
  src: string,
  alt: string,
  title?: string,
  href?: string,
  playButton?: boolean,
}

export default function CoverImage({ id, src, alt, title, href, playButton }: CoverImageProps) {
  const elementId = "cover-image-" + id;
  const handleImageLoaded = () => {
    const children = document.getElementById(elementId)?.children!
    if (children.length == 1)
      return
    // Remove skeleton
    children[0].remove();
    // Show image
    children[0].style.visibility = "visible";
  };

  return (
    <div id={elementId} className="cover-image-container">
      {src ?
        <>
          <Skeleton height="100%" />
          <div className="w-100" style={{ visibility: "hidden", maxHeight: "35vh" }}>
            <Image src={src} alt={alt} className="cover-image w-100 h-100" 
              onLoad={() => handleImageLoaded()} />
            {playButton && <PlayButton href={href} />}
            {title && <h1 className="cover-image-title px-3">{title}</h1>}
          </div>
        </>
        : <Skeleton height="100%" />
      }
    </div>
  )

}
