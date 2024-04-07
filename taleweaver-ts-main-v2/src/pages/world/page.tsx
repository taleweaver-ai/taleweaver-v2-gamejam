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

function formatAvatarToOptions(avatars: AvatarProps[]) {
  return avatars.map(({ id, name, alias, description }: AvatarProps) => {
    return {
      id: id,
      value: id,
      title: `${name} (${alias})`,
      description: description,
    };
  });
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
      const world = readWorld(worldId).then(async (worldPromise) => {
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

  return (
    <Form noValidate validated={false} onSubmit={onPlay} id="play-form">
      <div className="container text-center">
        <CoverImage src={world.dalleUrl} alt={world.title} title={world.title} playButton={true} />
        <p className="py-2 text-start">{world.description || <Skeleton count={5} />}</p>
        <a href="." class="btn btn-primary my-3">
          Load an NFT from your wallet
        </a>
        <h2 className="text-center">Or choose your avatar</h2>
        <RadioCardGroup id="avatars" name="avatars" options={formatAvatarToOptions(avatars)} />
      </div>
    </Form>
  );
}
