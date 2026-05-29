export const NotifIcon = ({ type, muted }) => {
  const color = muted ? '#a0aec0' : '#0052FF';
  
  if (type === 'star') return (
    <svg width="38" height="38" viewBox="0 0 42 42" fill="none">
      <path d="M21 5L24.9 14.3L35 15.3L27.8 22L30.2 32L21 27L11.8 32L14.2 22L7 15.3L17.1 14.3Z"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (type === 'heart') return (
    <svg width="38" height="38" viewBox="0 0 42 42" fill="none">
      <path d="M21 35S6 25.5 6 15.5C6 11.4 9.1 8 13 8C16 8 18.6 9.8 20 12.3C21.4 9.8 24 8 27 8C30.9 8 34 11.4 34 15.5C34 25.5 21 35 21 35Z"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (type === 'message') return (
    <svg width="38" height="38" viewBox="0 0 42 42" fill="none">
      <path d="M8 8H34C35.1 8 36 8.9 36 10V28C36 29.1 35.1 30 34 30H14L6 38V10C6 8.9 6.9 8 8 8Z"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return (
    <svg width="38" height="38" viewBox="0 0 42 42" fill="none">
      <path d="M21.5 25.98V11.98" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.82 9.27C10.92 5.67 15.41 3.3 20.46 3.02C20.8 3 21.14 2.99 21.49 2.99C31.43 2.99 39.49 11.05 39.49 20.99C39.49 30.93 31.43 38.99 21.49 38.99C11.55 38.99 3.49 30.93 3.49 20.99C3.49 17.84 3.83 16.03 5.25 13.46"
        stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M22.49 28.99C22.49 29.54 22.04 29.99 21.49 29.99C20.94 29.99 20.49 29.54 20.49 28.99C20.49 28.44 20.94 27.99 21.49 27.99C22.04 27.99 22.49 28.44 22.49 28.99Z"
        fill={color} />
    </svg>
  );
};