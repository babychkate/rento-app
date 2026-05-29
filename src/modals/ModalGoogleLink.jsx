export const GoogleLinkModal = ({ show, step }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.45)' }}>
      <div className="bg-white rounded-[28px] px-8 py-10 w-[300px] flex flex-col items-center gap-5"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>

        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
          alt="Google" className="h-7" />

        {step === 'loading' ? (
          <>
            <div className="w-10 h-10 rounded-full border-4 border-[#e8edf8] border-t-[#0052FF] animate-spin" />
            <p className="font-semibold text-[15px] text-[#012A81] text-center">
              Відбувається зв'язування акаунтів...
            </p>
          </>
        ) : (
          <>
            <div className="w-12 h-12 rounded-full bg-[#eefbf0] flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#16a34a" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="font-bold text-[16px] text-[#012A81] text-center">
              Акаунти з'єднані!
            </p>
            <p className="text-[13px] text-[#718096] text-center -mt-2">
              Ваш Google акаунт успішно прив'язано
            </p>
          </>
        )}
      </div>
    </div>
  );
};