import { ChangeEventHandler } from "react";
import Card from "react-bootstrap/Card";
import Skeleton from 'react-loading-skeleton';

interface CardProps {
  type?: "checkbox" | "radio";
  id: string,
  title?: string;
  description?: string;
  url?: string;
  value?: string;
  name?: string;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function CheckRadioCard({ type = "checkbox", id, title, description, url, value, name, checked, onChange }: CardProps) {
  // Fill value with id if not provided
  value = value || id;
  const show = title || description;
  return (
    <>
      <input type={type} name={name} className="btn-check" id={id} value={value} defaultChecked={checked} onChange={onChange} />
      <label className="btn p-0 m-1" htmlFor={id} style={{ borderWidth: "2px" }} >
        <Card className={"m-0 h-100 text-start" + (title ? "" : " opacity-75")}
          style={{ width: "min(30rem, 80vw)" }} >
          {show ?
            (<Card.Body>
              {title && <Card.Title>{title}</Card.Title>}
              <Card.Text style={{ fontSize: "0.8rem" }}>
                {description}
              </Card.Text>
            </Card.Body>)
            : <Skeleton height="8rem" style={{ lineHeight: "unset" }} />
          }
        </Card>
      </label >
    </>
  );
}
