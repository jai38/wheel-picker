import { useState, useEffect, useRef } from "react";

import thar from "../assets/cars/mahindra-thar-roxx.png";
import surya1780 from "../assets/wheels/1780-surya-1.png";

const cars = {
  thar: {
    name: "Mahindra Thar",
    image: thar,
    wheelPositions: [
      { x: 250, y: 465, size: 200 },
      { x: 1205, y: 465, size: 200 },
    ],
    baseWidth: 1600,
    baseHeight: 800,
  },
};

const wheels = {
  surya1780: surya1780,
};

// export default function CarCanvas() {
//   const [selectedCar, setSelectedCar] = useState("thar");
//   const [selectedWheel, setSelectedWheel] = useState("surya1780");
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const car = cars[selectedCar];
//     const wheelSrc = wheels[selectedWheel];
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     const carImg = new Image();
//     const wheelImg = new Image();

//     carImg.src = car.image;
//     wheelImg.src = wheelSrc;

//     carImg.onload = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.drawImage(carImg, 0, 0, canvas.width, canvas.height);

//       wheelImg.onload = () => {
//         car.wheelPositions.forEach((pos) => {
//           ctx.drawImage(wheelImg, pos.x, pos.y, pos.size, pos.size);
//         });
//       };
//     };
//   }, [selectedCar, selectedWheel]);

//   return (
//     <div className="flex gap-4 p-4">
//       <canvas
//         ref={canvasRef}
//         width={1600}
//         height={800}
//         className="border rounded shadow"
//       />
//       <div className="flex flex-col gap-2">
//         <select
//           value={selectedCar}
//           onChange={(e) => setSelectedCar(e.target.value)}>
//           {Object.entries(cars).map(([key, car]) => (
//             <option key={key} value={key}>
//               {car.name}
//             </option>
//           ))}
//         </select>

//         <select
//           value={selectedWheel}
//           onChange={(e) => setSelectedWheel(e.target.value)}>
//           {Object.entries(wheels).map(([key]) => (
//             <option key={key} value={key}>
//               {key}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// }

export default function CarCanvas() {
  const [selectedCar, setSelectedCar] = useState("thar");
  const [selectedWheel, setSelectedWheel] = useState("surya1780");
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const container = containerRef.current;

    const car = cars[selectedCar];
    const wheelSrc = wheels[selectedWheel];

    const carImg = new Image();
    const wheelImg = new Image();
    carImg.src = car.image;
    wheelImg.src = wheelSrc;

    const draw = () => {
      if (!container) return;

      // Base scaling
      const width = container.offsetWidth;
      const height = width * (car.baseHeight / car.baseWidth);
      const dpr = window.devicePixelRatio || 1;

      // Reset transformations before scaling again
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      // Canvas resizing
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Draw car
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(carImg, 0, 0, width, height);

      // Scale wheel positions
      const scaleX = width / car.baseWidth;
      const scaleY = height / car.baseHeight;

      car.wheelPositions.forEach((pos, i) => {
        const x = pos.x * scaleX;
        const y = pos.y * scaleY;
        const size = pos.size * scaleX;

        // Draw wheel
        ctx.drawImage(wheelImg, x, y, size, size);
      });
    };

    Promise.all([
      new Promise((resolve) => (carImg.onload = resolve)),
      new Promise((resolve) => (wheelImg.onload = resolve)),
    ]).then(() => {
      draw();
      window.addEventListener("resize", draw);
    });

    return () => window.removeEventListener("resize", draw);
  }, [selectedCar, selectedWheel]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div ref={containerRef} className="w-full max-w-6xl">
        <canvas
          style={{ width: "25vw" }}
          ref={canvasRef}
          className="w-full h-auto border rounded-xl shadow-lg bg-white"
        />
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        <select
          value={selectedCar}
          onChange={(e) => setSelectedCar(e.target.value)}
          className="border rounded-lg p-2">
          {Object.entries(cars).map(([key, car]) => (
            <option key={key} value={key}>
              {car.name}
            </option>
          ))}
        </select>

        <select
          value={selectedWheel}
          onChange={(e) => setSelectedWheel(e.target.value)}
          className="border rounded-lg p-2">
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
