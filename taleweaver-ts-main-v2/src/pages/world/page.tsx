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

  // Get worlId from pathname
  const worldId = getWorldId();
  const readWorld = useReadWorld();
  useEffect(() => {
    if (worldId) {
      readWorld(worldId).then(async (worldPromise) => {
        const worldData = await worldPromise;
        console.log(worldData);
        if (worldData) {
          const { avatars, ...world } = worldData;
          setWorld(world);
          setAvatars(avatars);
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
      const nfts = (data.result || []).map((nft: NFT) => {
        const name = nft.metadata.normalized.name;
        const description = nft.metadata.normalized.description;
        const imgSrc = nft.metadata.normalized.image;
        return {
          id: name,
          name: name,
          description: description,
          imgSrc: imgSrc,
        };
      });
      console.log(avatars);

      setAvatars([...nfts, ...avatars]);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, [walletAddress]);

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
