import openai from "@/utils/openai/openai";
import { emptyDecisionsResponse } from "@/dummies"
import { GetDecisionsResponseProps, GetDecisionsProps, MadeDecisionProps, MakeDecisionProps } from "@/types/decision";

function parseResponseJSON(text: string) {
  try {
    return JSON.parse(text)
  } catch {
    try {
      const clean = text.replace("```json", "").replace("```", "").trim()
      return JSON.parse(clean)
    } catch {
      console.log("message", text)
      console.log("clean", clean)
    }
  }
}

export async function makeDecision({ assistant, thread, decision, counter }: MakeDecisionProps): Promise<MadeDecisionProps> {
  // Initialize thread
  const threadObj = thread ? { id: thread } : await openai.beta.threads.create();
  thread = threadObj.id;

  console.log("Making decision", thread, decision)

  // Send a message to the thread
  await openai.beta.threads.messages.create(thread, {
    role: "user",
    content: decision
  });
  // Run the message through the assistant
  const run = await openai.beta.threads.runs.create(thread, {
    assistant_id: assistant
  });

  return { thread: threadObj.id, run: run.id };
}

export async function getDecisions({ thread: threadId, run: runId }: GetDecisionsProps): Promise<GetDecisionsResponseProps> {
  let run = await openai.beta.threads.runs.retrieve(
    threadId,
    runId
  );
  while (run.status !== "completed") {
    await new Promise(resolve => setTimeout(resolve, 2000));
    run = await openai.beta.threads.runs.retrieve(
      threadId,
      runId
    );
  }

  const messages = await openai.beta.threads.messages.list(threadId);
  const message = messages.data.find((m: any) =>
    (m.run_id === runId && m.role === "assistant"));

  if (message) {
    console.log(message)
    // @ts-ignore
    const content = parseResponseJSON(message.content[0].text.value);
    return content
  }
  return emptyDecisionsResponse;
}

export async function setDecision({ assistant, thread, decision, counter }: MakeDecisionProps): Promise<MadeDecisionProps> {
  const madeDecision: MadeDecisionProps = await makeDecision({ assistant, thread, decision: decision, counter: 0 });
  return madeDecision;
}
