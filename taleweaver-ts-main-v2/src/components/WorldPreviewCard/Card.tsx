import Card from 'react-bootstrap/Card';
import CoverImage from '@/components/CoverImage/CoverImage';
import CardImgSkeleton from './CardImgSkeleton';
import { WorldCardProps } from "@/types/world";
import Skeleton from "react-loading-skeleton";

import './Card.css'

interface WorldPreviewCardProps extends WorldCardProps {
  onView?: (_: any) => void;
}

export default function WorldPreviewCard({ id, title, description, url }: WorldPreviewCardProps) {
  return (
    <Card className={"story-preview-card m-1" + (id ? "" : " opacity-75")} style={{ width: '20rem' }}>
      {
        url ?
          <CoverImage id={id} src={url} alt={title} title={title} /> :
          < CardImgSkeleton />}
      <Card.Body className="pt-0">
        <Card.Text style={{ fontSize: "small" }}>
          {description || <Skeleton count={3} />}
        </Card.Text>
      </Card.Body>
      <a href={`/world/${id}`} className="stretched-link" />
    </Card >
  );
}
