import { useState, useEffect, useRef } from "react";

const cars = {
  thar: {
    name: "Mahindra Thar",
    image: "/src/assets/cars/mahindra-thar.png",
    wheelPositions: [
      { x: 310, y: 500, size: 200 },
      { x: 1190, y: 490, size: 200 },
    ],
  },
};

const wheels = {
  surya1780: "/src/assets/wheels/1780-surya-1.png",
};

export default function CarCanvas() {
  const [selectedCar, setSelectedCar] = useState("thar");
  const [selectedWheel, setSelectedWheel] = useState("surya1780");
  const canvasRef = useRef(null);

  useEffect(() => {
    const car = cars[selectedCar];
    const wheelSrc = wheels[selectedWheel];
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const carImg = new Image();
    const wheelImg = new Image();

    carImg.src = car.image;
    wheelImg.src = wheelSrc;

    carImg.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(carImg, 0, 0, canvas.width, canvas.height);

      wheelImg.onload = () => {
        car.wheelPositions.forEach((pos) => {
          ctx.drawImage(wheelImg, pos.x, pos.y, pos.size, pos.size);
        });
      };
    };
  }, [selectedCar, selectedWheel]);

  return (
    <div className="flex gap-4 p-4">
      <canvas
        ref={canvasRef}
        width={1600}
        height={800}
        className="border rounded shadow"
      />
      <div className="flex flex-col gap-2">
        <select
          value={selectedCar}
          onChange={(e) => setSelectedCar(e.target.value)}>
          {Object.entries(cars).map(([key, car]) => (
            <option key={key} value={key}>
              {car.name}
            </option>
          ))}
        </select>

        <select
          value={selectedWheel}
          onChange={(e) => setSelectedWheel(e.target.value)}>
          {Object.entries(wheels).map(([key]) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
