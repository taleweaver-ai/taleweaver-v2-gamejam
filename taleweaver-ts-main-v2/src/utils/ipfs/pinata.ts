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
  // Ahora, en lugar de apuntar a CORS_PROXY, apunta directamente al servidor
  const response = await fetch(CORS_PROXY, { 
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JWT}`, // Asegúrate de que JWT es accesible aquí o manéjalo de otra manera
    },
    body: JSON.stringify({ dalleUrl }),
  });
  
  if (response.status === 200) {
    const { IpfsHash } = await response.json();
    return IpfsHash;
  }
}

