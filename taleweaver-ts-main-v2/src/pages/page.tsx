import WorldPreviewCard from '@/components/WorldPreviewCard/Card';
import { WorldCardProps } from "@/types/world";
import { useReadWorlds } from "@/utils/world";
import { useState, useEffect } from "react";

const urlDummy = 'https://gray-reasonable-haddock-27.mypinata.cloud/ipfs/QmbL7CZndhvHEoDqEsxg5ERZrXefPf82e5Ey1mroyeAbCk'

function formatDescription(description) {
  const max = 200;
  if (description.length > max)
    return description.slice(0, max - 3) + "...";
  return description
}

export default function HomePage() {

  const readWorlds = useReadWorlds();
  const [worlds, setWorlds] = useState([])
  useEffect(() => {
    readWorlds().then(worlds => setWorlds(worlds))
  }, [])
  return (
    <div className="d-flex flex-col flex-wrap justify-content-center w-100">
      {worlds.map(({ id, title, description, dalleUrl }: WorldCardProps) => {
        return <WorldPreviewCard key={id} id={id} title={title} description={formatDescription(description)} url={dalleUrl} assistant={id} />
      })}
    </div>
  )
}
