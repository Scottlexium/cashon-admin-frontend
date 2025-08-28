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

export const OverviewIcon = ({ className, ...props }: IconProps) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path d="M15.176 4.23393C14.4363 3.73174 13.633 3.34444 12.7922 3.08018C11.7315 2.74677 11.2011 2.58007 10.6422 2.99887C10.0833 3.41769 10.0833 4.09796 10.0833 5.45849V9.63087C10.0833 10.7889 10.0833 11.3679 10.2978 11.887C10.5125 12.4062 10.9194 12.8114 11.7333 13.622L14.6657 16.5427C15.6218 17.495 16.1 17.9712 16.7856 17.8588C17.4712 17.7464 17.7252 17.2448 18.2334 16.2417C18.6223 15.4742 18.9063 14.6515 19.0738 13.7957C19.4275 11.9889 19.246 10.1161 18.5522 8.41411C17.8583 6.71213 16.6834 5.2574 15.176 4.23393Z" fill="currentColor" stroke="currentColor" strokeWidth="1.375" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.8333 18.7183C11.9841 19.062 11.0558 19.2513 10.0833 19.2513C6.03324 19.2513 2.75 15.9681 2.75 11.918C2.75 8.76744 4.73675 6.08093 7.52572 5.04297" stroke="currentColor" strokeWidth="1.375" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
OverviewIcon.displayName = 'OverviewIcon';

export const HomeIcon = ({ className, ...props }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
);
HomeIcon.displayName = 'HomeIcon';

export const UsersIcon = ({ className, ...props }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
  </svg>
);
UsersIcon.displayName = 'UsersIcon';

export const CreditCardIcon = ({ className, ...props }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
  </svg>
);
CreditCardIcon.displayName = 'CreditCardIcon';

export const BanknotesIcon = ({ className, ...props }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H4.5m-1.25 0H3c-.621 0-1.125.504-1.125 1.125v.375m1.5 0v.75A.75.75 0 0 1 3 6h-.75m0 0V4.5c0-.621.504-1.125 1.125-1.125h.375M3.75 15H3v.75c0 .414.336.75.75.75h.75v-.75" />
  </svg>
);
BanknotesIcon.displayName = 'BanknotesIcon';

export const ArrowDownTrayIcon = ({ className, ...props }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);
ArrowDownTrayIcon.displayName = 'ArrowDownTrayIcon';

export const ArrowUpTrayIcon = ({ className, ...props }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
  </svg>
);
ArrowUpTrayIcon.displayName = 'ArrowUpTrayIcon';

export const ChartBarIcon = ({ className, ...props }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);
ChartBarIcon.displayName = 'ChartBarIcon';

export const DocumentTextIcon = ({ className, ...props }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);
DocumentTextIcon.displayName = 'DocumentTextIcon';

export const Cog6ToothIcon = ({ className, ...props }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a6.759 6.759 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);
Cog6ToothIcon.displayName = 'Cog6ToothIcon';

export const LogoutIcon = ({ className, ...props }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
  </svg>
);
LogoutIcon.displayName = 'LogoutIcon';

// Stats Card Icons
export const DepositIcon = ({ className, ...props }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.467-.22-2.121-.659-1.172-.879-1.172-2.303 0-3.182s3.07-.879 4.242 0L15 9m-3 0V6M12 18v2" />
  </svg>
);
DepositIcon.displayName = 'DepositIcon';

export const WithdrawalIcon = ({ className, ...props }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
  </svg>
);
WithdrawalIcon.displayName = 'WithdrawalIcon';

export const ActiveUsersIcon = ({ className, ...props }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
  </svg>
);
ActiveUsersIcon.displayName = 'ActiveUsersIcon';

export const RevenueIcon = ({ className, ...props }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0-1-3m1 3v-3h-7.5M9 11.25v1.5M12 9v3.75m3-6v6" />
  </svg>
);
RevenueIcon.displayName = 'RevenueIcon';

export const WalletIcon = ({ className, ...props }: IconProps) => (
  <svg className={className} width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M15.2794 6.27005V10.3471C15.2794 12.7855 13.886 13.8305 11.796 13.8305H4.83727C4.48102 13.8305 4.14061 13.7988 3.82394 13.7276C3.62602 13.6959 3.43603 13.6405 3.26186 13.5772C2.07436 13.1338 1.35394 12.1046 1.35394 10.3471V6.27005C1.35394 3.83171 2.74727 2.78674 4.83727 2.78674H11.796C13.5694 2.78674 14.8439 3.53882 15.1844 5.25674C15.2398 5.57341 15.2794 5.89796 15.2794 6.27005Z" stroke="currentColor" strokeWidth="1.1875" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.6548 8.64502V12.7221C17.6548 15.1605 16.2615 16.2054 14.1715 16.2054H7.21273C6.6269 16.2054 6.09649 16.1263 5.63733 15.9521C4.69524 15.6038 4.05399 14.8834 3.8244 13.7276C4.14107 13.7988 4.48148 13.8304 4.83773 13.8304H11.7965C13.8865 13.8304 15.2798 12.7855 15.2798 10.3471V6.27002C15.2798 5.89794 15.2482 5.56546 15.1848 5.25671C16.689 5.57338 17.6548 6.63419 17.6548 8.64502Z" stroke="currentColor" strokeWidth="1.1875" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.31123 10.4024C9.46551 10.4024 10.4012 9.46665 10.4012 8.31238C10.4012 7.1581 9.46551 6.22237 8.31123 6.22237C7.15696 6.22237 6.22122 7.1581 6.22122 8.31238C6.22122 9.46665 7.15696 10.4024 8.31123 10.4024Z" stroke="currentColor" strokeWidth="1.1875" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.784 6.57082V10.0542" stroke="currentColor" strokeWidth="1.1875" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.842 6.57109V10.0544" stroke="currentColor" strokeWidth="1.1875" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
WalletIcon.displayName = 'WalletIcon';

export const LayersIcon = ({ className, ...props }: IconProps) => (
  <svg className={className} width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M10.2996 2.31162L14.9705 4.38579C16.3163 4.97954 16.3163 5.96121 14.9705 6.55496L10.2996 8.62912C9.7692 8.86662 8.89837 8.86662 8.36795 8.62912L3.69712 6.55496C2.35129 5.96121 2.35129 4.97954 3.69712 4.38579L8.36795 2.31162C8.89837 2.07412 9.7692 2.07412 10.2996 2.31162Z" stroke="currentColor" strokeWidth="1.1875" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.375 8.70834C2.375 9.37334 2.87375 10.1413 3.48333 10.4104L8.85875 12.8013C9.27042 12.9833 9.7375 12.9833 10.1413 12.8013L15.5167 10.4104C16.1263 10.1413 16.625 9.37334 16.625 8.70834" stroke="currentColor" strokeWidth="1.1875" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.375 12.6667C2.375 13.4029 2.81042 14.0679 3.48333 14.3687L8.85875 16.7596C9.27042 16.9417 9.7375 16.9417 10.1413 16.7596L15.5167 14.3687C16.1896 14.0679 16.625 13.4029 16.625 12.6667" stroke="currentColor" strokeWidth="1.1875" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
LayersIcon.displayName = 'LayersIcon';

export const DatabaseIcon = ({ className, ...props }: IconProps) => (
  <svg className={className} width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M14.6458 10.0146V12.9438C14.6458 15.4138 12.342 17.4167 9.49996 17.4167C6.65788 17.4167 4.35413 15.4138 4.35413 12.9438V10.0146C4.35413 12.4846 6.65788 14.25 9.49996 14.25C12.342 14.25 14.6458 12.4846 14.6458 10.0146Z" stroke="currentColor" strokeWidth="1.1875" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.6458 6.05625C14.6458 6.77666 14.4479 7.44166 14.0995 8.01166C13.2525 9.40499 11.5108 10.2917 9.49996 10.2917C7.48913 10.2917 5.74746 9.40499 4.90038 8.01166C4.55204 7.44166 4.35413 6.77666 4.35413 6.05625C4.35413 4.82125 4.93204 3.70499 5.85829 2.89749C6.79245 2.08208 8.07496 1.58333 9.49996 1.58333C10.925 1.58333 12.2075 2.08208 13.1416 2.88958C14.0679 3.705 14.6458 4.82125 14.6458 6.05625Z" stroke="currentColor" strokeWidth="1.1875" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.6458 6.05625V10.0146C14.6458 12.4846 12.342 14.25 9.49996 14.25C6.65788 14.25 4.35413 12.4846 4.35413 10.0146V6.05625C4.35413 3.58625 6.65788 1.58333 9.49996 1.58333C10.925 1.58333 12.2075 2.08208 13.1416 2.88958C14.0679 3.705 14.6458 4.82125 14.6458 6.05625Z" stroke="currentColor" strokeWidth="1.1875" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
DatabaseIcon.displayName = 'DatabaseIcon';

export const ReceiptIcon = ({ className, ...props }: IconProps) => (
  <svg className={className} width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M9.89582 17.4168H3.22999C2.31165 17.4168 1.55957 16.6805 1.55957 15.778V4.02967C1.55957 1.95551 3.10332 1.01342 4.9954 1.93967L8.5104 3.6655C9.2704 4.03759 9.89582 5.02717 9.89582 5.86634V17.4168Z" stroke="currentColor" strokeWidth="1.1875" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.393 11.9226V14.9151C17.393 16.6251 16.6013 17.4168 14.8913 17.4168H9.89587V8.2493L10.268 8.32847L13.8305 9.12805L15.4375 9.4843C16.4825 9.71388 17.3375 10.2522 17.385 11.7722C17.393 11.8197 17.393 11.8672 17.393 11.9226Z" stroke="currentColor" strokeWidth="1.1875" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.35413 7.12509H7.10121" stroke="currentColor" strokeWidth="1.1875" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.35413 10.2917H7.10121" stroke="currentColor" strokeWidth="1.1875" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.8304 9.12801V11.6772C13.8304 12.6588 13.0309 13.4584 12.0492 13.4584C11.0675 13.4584 10.2679 12.6588 10.2679 11.6772V8.32843L13.8304 9.12801Z" stroke="currentColor" strokeWidth="1.1875" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.385 11.7722C17.3375 12.7064 16.5617 13.4585 15.6117 13.4585C14.63 13.4585 13.8304 12.6589 13.8304 11.6772V9.12805L15.4375 9.4843C16.4825 9.71388 17.3375 10.2522 17.385 11.7722Z" stroke="currentColor" strokeWidth="1.1875" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
ReceiptIcon.displayName = 'ReceiptIcon';

export const ExchangeIcon = ({ className, ...props }: IconProps) => (
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path d="M14 18.5C18.4183 18.5 22 14.9183 22 10.5C22 6.08172 18.4183 2.5 14 2.5C9.58172 2.5 6 6.08172 6 10.5C6 14.9183 9.58172 18.5 14 18.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M3.15657 11.5C2.42523 12.6176 2 13.9535 2 15.3888C2 19.3162 5.18378 22.5 9.11116 22.5C10.5465 22.5 11.8824 22.0748 13 21.3434" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M15.7712 8.70494C15.555 7.79281 14.4546 6.96974 13.1337 7.58549C11.8128 8.20124 11.603 10.1824 13.601 10.3928C14.5041 10.488 15.0928 10.2825 15.6319 10.8638C16.1709 11.4451 16.2711 13.0617 14.8931 13.4974C13.5151 13.9331 12.1506 13.2523 12.002 12.2857M13.9862 6.50391V7.37295M13.9862 13.6315V14.5039" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
ExchangeIcon.displayName = 'ExchangeIcon';

const Icons = {
  PowerIcon,
  LockIcon,
  MailIcon,
  EyeIcon,
  UserIcon,
  HomeIcon,
  UsersIcon,
  CreditCardIcon,
  BanknotesIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  LogoutIcon,
  OverviewIcon,
  DepositIcon,
  WithdrawalIcon,
  ActiveUsersIcon,
  RevenueIcon,
  WalletIcon,
  LayersIcon,
  DatabaseIcon,
  ReceiptIcon,
  ExchangeIcon,
};

export default Icons;
