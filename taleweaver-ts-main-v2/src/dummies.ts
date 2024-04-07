import { WorldCardProps } from "@/types/world"

export const emptyWorld: WorldCardProps = {
  id: "",
  title: "",
  description: "",
  url: "",
  assistant: "",
}

export const emptyDecisions = [
  { id: "", value: "", description: "" },
  { id: "", value: "", description: "" },
  { id: "", value: "", description: "" },
  { id: "", value: "", description: "" },
]

export const emptyDecisionsResponse = {
  context: "",
  consequence: "",
  previousDecision: "",
  dalle: "",
  decisions: emptyDecisions,
}

export const imgUrlDummy = 'https://gray-reasonable-haddock-27.mypinata.cloud/ipfs/QmbL7CZndhvHEoDqEsxg5ERZrXefPf82e5Ey1mroyeAbCk'

export const assistantDummy = "asst_rp77NVpReQVbicOHZPYlPsfD"
// export const assistantDummy = "asst_ftIlO9Z1XRC4BndkXYQKaJxp"

export const runDummy = "run_R5qGm7HyJdPMWLc5ULg7sW0H"

export const threadDummy = "thread_9yJTPpMzl4NkGUTKSLPc73jZ"

export const messageDummy = "msg_9GMZDSeeWQmET5LarXFjeOGG"

export const avatarDummy = [
  {
    id: '1',
    name: 'Lyra Nightshade',
    alias: 'Shadow Weaver',
    description: 'Mysterious sorceress with the power to manipulate shadows.'
  },
  {
    id: '2',
    name: 'Finn Thornwood',
    alias: 'Nature Warden',
    description: 'Guardian of the enchanted forest with control over plant life.'
  },
  {
    id: '3',
    name: 'Aria Frostwind',
    alias: 'Frost Sorceress',
    description: 'Ice mage capable of conjuring blizzards and freezing enemies.'
  },
  {
    id: '4',
    name: 'Draven Fireheart',
    alias: 'Inferno Knight',
    description: 'Fearless warrior whose sword is ablaze with mystical fire.'
  },
  {
    id: '5',
    name: 'Luna Moonshadow',
    alias: 'Celestial Enchanter',
    description: 'Channeler of moon magic, casting spells under starlit skies.'
  },
  {
    id: '6',
    name: 'Soren Skybloom',
    alias: 'Sky Dancer',
    description: 'Graceful aerial acrobat who floats on clouds and wields wind powers.'
  }
]
