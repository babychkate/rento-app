const StepIndicator = ({ step = 1, position = 'absolute' }) => {
  const posClass = position === 'absolute'
    ? 'absolute bottom-[60px] left-1/2 -translate-x-1/2'
    : 'relative';

  return (
    <>
      <style>{`
        .step-indicator-ring {
          position: relative;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: radial-gradient(circle at top left, #cfd6ff 0%, #b8c2f3 45%, #aab5eb 100%);
          border: 0.2px solid rgba(255, 255, 255, 0.8);
          box-shadow:
            inset 1px 1px 3px rgba(255, 255, 255, 1),
            inset -2px -3px 6px rgba(0, 30, 120, 0.15),
            0px 6px 12px rgba(0, 20, 90, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Montserrat', sans-serif;
          font-size: 20px;
          font-weight: bold;
          color: #003285;
          z-index: 1;
        }
        .step-indicator-ring::after {
          content: '';
          position: absolute;
          inset: -11px;
          border-radius: 50%;
          padding: 5px;
          border: 5px solid transparent;
          background:
            linear-gradient(
              50deg,
              rgba(120, 150, 255, 1) 10%,
              rgba(210, 220, 255, 1) 60%,
              #2048c7 70%,
              #0b2d8f 85%,
              #001550 100%
            ) border-box;
          -webkit-mask:
            linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          box-shadow:
            0 4px 12px rgba(0, 25, 100, 0.28),
            inset 0 1px 2px rgba(255, 255, 255, 0.65);
          z-index: -1;
        }
      `}</style>
      <div
        className={`step-indicator-ring ${posClass}`}
        aria-label={`Крок ${step}`}
      >
        {step}
      </div>
    </>
  );
};

export default StepIndicator;