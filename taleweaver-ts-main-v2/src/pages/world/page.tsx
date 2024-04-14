import { AvatarProps } from "@/types/avatar";
import { useDojo } from "@/dojo/useDojo";
import { useReadWorld } from "@/utils/world";
import { playWorld } from "@/utils/openai/world";
import { formatDalleUrl } from "@/utils/ipfs/pinata";
import Skeleton from "react-loading-skeleton";
import CoverImage from "@/components/CoverImage/CoverImage";
import RadioCardGroup from "@/components/Form/RadioCardGroup";
import Form from "react-bootstrap/Form";
import { useState, useEffect, useCallback } from "react";
import { emptyWorld } from "@/dummies";
import { showLoader, hideLoader } from "@/utils/loader";

import { MadeDecisionProps } from "@/types/decision";

import { imgUrlDummy, avatarDummy, assistantDummy } from "@/dummies";

interface NFT {
  metadata: {
    normalized: {
      name?: string;
      description?: string;
      image?: string;
    };
  };
  owner: string;
}

function formatAvatarToOptions(avatars: AvatarProps[]) {
  return JSON.parse(JSON.stringify(avatars)).map(
    ({ id, name, alias, description, imgSrc }: AvatarProps) => {
      return {
        id: id,
        name: name,
        alias: alias,
        value: id,
        description: description,
        imgSrc: imgSrc,
        title: alias ? `${name} (${alias})` : name,
      };
    }
  );
}
const dummyAvatars = formatAvatarToOptions(avatarDummy);

export default function World() {
  const getWorldId = () => {
    const pathname = window.location.pathname;
    const worldId = pathname.split("/")[2];
    return worldId;
  };
  const onPlay = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    const worldId = getWorldId();
    const avatarId = form.elements["avatars"].value;
    const avatar = avatars.find((avatar) => String(avatar.id) === String(avatarId));
    if (avatar)
      playWorld({ assistant: worldId, avatar: avatar }).then(
        ({ thread, run }: MadeDecisionProps) => {
          if (avatar.imgSrc) localStorage.setItem("nftSrc", avatar.imgSrc);

          const pathname = `/world/${worldId}/play/${thread}/${run}`;
          window.location.pathname = pathname;
        }
      );
  };

  useEffect(showLoader, []);

  // Manage world state
  const [world, setWorld] = useState(emptyWorld);
  // Manage avatar state
  const [avatars, setAvatars] = useState(dummyAvatars);
  const [avatarsLoaded, setAvatarsLoaded] = useState(false);

  // Get worlId from pathname
  const worldId = getWorldId();
  const readWorld = useReadWorld();
  useEffect(() => {
    if (worldId) {
      showLoader();
      readWorld(worldId).then(async (worldPromise) => {
        const worldData = await worldPromise;
        if (worldData) {
          const { avatars, ...worldRest } = worldData;
          setWorld(worldRest);
          setAvatars(formatAvatarToOptions(avatars)); // Actualiza con avatares reales.
          setAvatarsLoaded(true); // Indica que los avatares reales han sido cargados.
          hideLoader();
        }
      });
    }
  }, [worldId]);

  // Wallet address to show NFTs
  const walletAddress = localStorage.getItem("walletAddress");

  const fetchNFTs = async () => {
    try {
      const response = await fetch("http://localhost:3000/nfts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: walletAddress }),
      });
  
      if (!response.ok) throw new Error("Network response was not ok.");
  
      const data = await response.json();
      // Asegúrate de que la respuesta contiene el arreglo esperado; de lo contrario, devuelve un arreglo vacío.
      return (data.result || []).map(({ metadata: { normalized } }) => ({
        id: normalized.name,
        name: normalized.name,
        description: normalized.description,
        imgSrc: normalized.image,
      }));
    } catch (error) {
      console.error("Error fetching NFTs:", error);
      return []; // Devuelve un arreglo vacío en caso de error para mantener la consistencia del tipo de retorno.
    }
  };

  useEffect(() => {
    // Asegúrate de llamar a fetchNFTs solo después de que los avatares reales han sido cargados.
    if (avatarsLoaded && walletAddress) {
      fetchNFTs().then(nftAvatars => {
        // Aquí, usas prevAvatars para referirte al estado actual de los avatares justo antes de esta actualización.
        setAvatars(prevAvatars => [...nftAvatars, ...prevAvatars]);
      });
    }
  }, [walletAddress, avatarsLoaded]);

  return (
    <Form noValidate validated={false} onSubmit={onPlay} id="play-form">
      <div className="container text-center">
        <CoverImage
          id={world.id}
          src={world.dalleUrl}
          alt={world.title}
          title={world.title}
          playButton={true}
        />
        <p className="py-2 text-start">{world.description || <Skeleton count={5} />}</p>
        <h2 className="text-center">Or choose your avatar</h2>
        <RadioCardGroup id="avatars" name="avatars" options={formatAvatarToOptions(avatars)} />
      </div>
    </Form>
  );
}
