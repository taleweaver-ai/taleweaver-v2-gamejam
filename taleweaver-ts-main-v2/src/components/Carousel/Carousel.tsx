"use client";
import React from 'react';
import { Carousel, Card } from 'react-bootstrap';


const cardGroups = [
  [{ id: 1, title: 'Carta 1-1', text: 'Texto 1-1' }, { id: 2, title: 'Carta 1-2', text: 'Texto 1-2' }, { id: 3, title: 'Carta 1-3', text: 'Texto 1-3' }, { id: 4, title: 'Carta 1-4', text: 'Texto 1-4' }],
  [{ id: 5, title: 'Carta 2-1', text: 'Texto 2-1' }, { id: 6, title: 'Carta 2-2', text: 'Texto 2-2' }, { id: 7, title: 'Carta 2-3', text: 'Texto 2-3' }, { id: 8, title: 'Carta 2-4', text: 'Texto 2-4' }],

];

export default function CardCarousel({ cardGroups }) {
  console.log(cardGroups)
  return (
    <Carousel interval={null}>
      {cardGroups.map((group, index) => (
        <Carousel.Item key={index}>
          <div>
            <h2>group.title</h2>
          </div>
          <div className="d-flex justify-content-center">
            {group.cards.map(({ id, title, url }) => (
              <Card key={id} className="bg-dark text-white m-2" style={{ width: '18rem', height: '250px' }}>
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Text>{title}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
