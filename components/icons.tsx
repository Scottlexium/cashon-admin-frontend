import React from 'react';

export const PowerIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="132"
    height="131"
    viewBox="0 0 132 131"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <rect x="0.981618" y="0.481618" width="130.037" height="130.037" rx="29.3787" fill="url(#paint0_linear_1939_5055)" />
    <rect x="0.981618" y="0.481618" width="130.037" height="130.037" rx="29.3787" stroke="url(#paint1_linear_1939_5055)" strokeWidth="0.963235" />
    <path d="M99.7134 68.3829C99.7134 87.0741 84.5072 102.28 65.8127 102.28C47.1181 102.28 31.9187 87.0741 31.9187 68.3829C31.9187 52.5723 42.9409 38.8249 58.272 35.3399V47.7737C49.7116 50.9108 43.8662 59.1572 43.8662 68.3829C43.8662 80.4823 53.7098 90.3294 65.8127 90.3294C77.9155 90.3294 87.7659 80.4857 87.7659 68.3829C87.7659 59.164 81.9205 50.9176 73.3634 47.7804V35.3365C88.6912 38.8283 99.7134 52.5723 99.7134 68.3795V68.3829Z" fill="#00FFB3" />
    <path d="M70.5436 32.7601V48.3006C70.5436 50.9075 68.4229 53.0248 65.8193 53.0248C63.2157 53.0248 61.0883 50.9041 61.0883 48.3006V32.7601C61.0883 30.1531 63.2089 28.0358 65.8193 28.0358C68.4296 28.0358 70.5436 30.1565 70.5436 32.7601Z" fill="#00FFB3" />
    <defs>
      <linearGradient id="paint0_linear_1939_5055" x1="66" y1="0" x2="66" y2="131" gradientUnits="userSpaceOnUse">
        <stop stopColor="#26262A" />
        <stop offset="1" stopColor="#212123" />
      </linearGradient>
      <linearGradient id="paint1_linear_1939_5055" x1="66" y1="0" x2="68.8897" y2="115.107" gradientUnits="userSpaceOnUse">
        <stop stopColor="#5C616D" stopOpacity="0.8" />
        <stop offset="1" stopColor="#48518D" stopOpacity="0.2" />
      </linearGradient>
    </defs>
  </svg>
);
PowerIcon.displayName = 'PowerIcon';

export type IconProps = React.SVGProps<SVGSVGElement>;

export const LockIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <rect x="3" y="10" width="18" height="11" rx="2" stroke="#BFC6CC" strokeWidth="1.5" />
    <path d="M7 10V8a5 5 0 0 1 10 0v2" stroke="#00FFB3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
LockIcon.displayName = 'LockIcon';

export const MailIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <rect x="2" y="5" width="20" height="14" rx="2" stroke="#BFC6CC" strokeWidth="1.5" />
    <path d="M3 7.5l8.5 6L20 7.5" stroke="#00FFB3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
MailIcon.displayName = 'MailIcon';

export const EyeIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="#BFC6CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" stroke="#00FFB3" strokeWidth="1.5" />
  </svg>
);
EyeIcon.displayName = 'EyeIcon';

export const UserIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <circle cx="12" cy="8" r="3" stroke="#BFC6CC" strokeWidth="1.5" />
    <path d="M4 20c1.333-4 6-6 8-6s6.667 2 8 6" stroke="#00FFB3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
UserIcon.displayName = 'UserIcon';

const Icons = {
  PowerIcon,
  LockIcon,
  MailIcon,
  EyeIcon,
  UserIcon,
};

export default Icons;
