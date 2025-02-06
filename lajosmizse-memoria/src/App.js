// Frissítés a Vercel újraindításához

import { useState, useEffect } from "react";

const images = [
  "/images/img1.jpg",
  "/images/img2.jpg",
  "/images/img3.jpg",
  "/images/img4.jpg",
  "/images/img5.jpg",
  "/images/img6.jpg",
  "/images/img7.jpg",
  "/images/img8.jpg"
];

const shuffleArray = (array) => [...array, ...array].sort(() => Math.random() - 0.5);

function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    setCards(shuffleArray(images));
  }, []);

  const handleCardClick = (index) => {
    if (flipped.length < 2 && !flipped.includes(index) && !matched.includes(index)) {
      setFlipped([...flipped, index]);
    }
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  }, [flipped]);

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold text-center my-4">
        Üdv Lajosmizse Memóriajátékában!
      </h1>

      <div className="grid grid-cols-4 gap-4 p-4">
        {cards.map((image, index) => (
          <div key={index} onClick={() => handleCardClick(index)} className="border p-2 cursor-pointer">
            <img
              src={flipped.includes(index) || matched.includes(index) ? image : "/images/back.jpg"}
              alt="memory"
              className="w-full h-auto rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
