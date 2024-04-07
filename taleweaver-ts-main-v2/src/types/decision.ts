export interface DecisionProps {
  id: string;
  value: string;
  description: string;
}

export interface DecisionRequestProps {
  theme: string;
  title: string;
  description: string;
}

export interface MadeDecisionProps {
  thread: string,
  run: string,
}

export interface GetDecisionsProps extends MadeDecisionProps {};

export interface GetDecisionsResponseProps {
  context: string,
  consequence: string,
  previousDecision: string,
  decisions: DecisionProps[],
  dalle: string, // dalle prompt
}

export interface SetDecisionsProps {
  assistant: string,
  thread: string,
  decision: string,
  counter: number,
}

export interface MakeDecisionProps {
  assistant: string,
  decision: string,
  thread?: string,
  counter: number,
}
