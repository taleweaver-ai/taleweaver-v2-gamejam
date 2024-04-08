import Skeleton from "react-loading-skeleton";
import { emptyWorld } from "@/dummies";
import CoverImage from "@/components/CoverImage/CoverImage";
import RadioCardGroup from "@/components/Form/RadioCardGroup";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { getDecisions, setDecision } from "@/utils/openai/decision";
import { GetDecisionsResponseProps } from "@/types/decision";
import { generateDalle } from "@/utils/openai/dalle";
import { showLoader, hideLoader } from "@/utils/loader";

import { emptyDecisions } from "@/dummies";
import { assistantDummy } from "@/dummies";

export default function World() {
  const getWorldId = () => {
    const pathname = window.location.pathname;
    const worldId = pathname.split("/")[2];
    return worldId;
  };
  const onPlay = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    const worldId = getWorldId();
    const decision: string = form.elements["decision"].value;
    setDecision({
      assistant: worldId,
      thread: thread,
      decision: decision,
      counter: 0,
    }).then(({ run }: { run: string }) => {
      const pathname = `/world/${worldId}/play/${thread}/${run}`;
      window.location.pathname = pathname;
    });
  };
  useEffect(showLoader, []);

  const [world, setWorld] = useState(emptyWorld);
  const [image, setImage] = useState("");
  const [context, setContext] = useState("");
  const [contextSummary, setContextSummary] = useState("");
  const [decisions, setDecisions] = useState(emptyDecisions);
  const [thread, setThread] = useState("");

  const pathname = window.location.pathname;
  useEffect(() => {
    if (pathname) {
      const [thread, run] = pathname.split("/").slice(-2);
      setThread(thread);
      getDecisions({ thread, run })
        .then(async (response: GetDecisionsResponseProps) => {
          console.log("opeai response", response);
          let { context, consequence, previousDecision, decisions, dallePrompt, storyContext } =
            response;
          console.log(response);
          setContextSummary(previousDecision);
          context = context || storyContext || consequence;
          setContext(context);
          setDecisions(
            decisions.map((d: any) => {
              return { ...d, value: d.id };
            })
          );
          dallePrompt = dallePrompt || context;
          console.log(dallePrompt);
          if (!image && dallePrompt) {
            const generatedImage = await generateDalle(dallePrompt);
            if (!image) setImage(generatedImage);
          } else console.log("No dalle prompt");
          hideLoader();
        })
        .catch(console.log);
    }
  }, [pathname]);

  const nftSrc = localStorage.getItem("nftSrc");

  return (
    <Form noValidate validated={false} onSubmit={onPlay} id="play-form">
      <div className="container">
        {nftSrc && (
          <img
            src={nftSrc}
            alt="NFT"
            style={{
              position: "absolute",
              width: "100px",
              marginLeft: "7px",
              marginTop: "7px",
              zIndex: 1,
            }}
          />
        )}

        <div style={{ height: "35rem" }}>
          <CoverImage
            id={thread}
            src={image}
            alt={world.title}
            title={contextSummary}
            playButton={true}
          />
        </div>
        <p className="py-2">{context || <Skeleton count={5} />}</p>
        <h2 className="text-center">Make a decision</h2>
        <RadioCardGroup id="decision" name="decision" options={decisions} />
      </div>
    </Form>
  );
}
