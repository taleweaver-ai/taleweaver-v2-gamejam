import axios from "axios";

const JWT = import.meta.env.VITE_PINATA_JWT
const CORS_PROXY = import.meta.env.VITE_CORS_PROXY

export function formatDalleUrl(cid: string) {
  if (cid)
    return `https://ipfs.io/ipfs/${cid}`
}

export function splitCid(cid: string) {
  const half = Math.round(cid.length / 2);
  return [ cid.slice(0, half), cid.slice(half) ]
}

export async function uploadToPinata(json: object) {
  console.log("pinata", json)
  const blob = new Blob([JSON.stringify(json)], { type: "application/json" });
  const data = new FormData();
  data.append("file", blob);

  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
    body: data,
  });
  const resData = await res.json();
  if (resData)
    return resData.IpfsHash
};

export async function readFromPinata(cid: string) {
  try {
    const res = await fetch(formatDalleUrl(cid));
    if (res.ok)
      return await res.json();
  } catch (error) {
    console.log("failed")
  }
}

export async function uploadDalleToPinata(dalleUrl: string) {
  const dalle = await axios.get(CORS_PROXY + dalleUrl, { 
    responseType: "blob",
    timeout: 30000,
    
  });
  const imageBlob = new Blob([dalle.data], { type: 'image/jpeg' });

  const imageFile = new File([imageBlob], '/tmp/image.jpg', { type: 'image/jpeg' });

  const data = new FormData()
  data.append("file", imageFile)

  const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
    body: data,
  });
  if (response.status == 200) {
    return await response.json().IpfsHash;
  }
}
