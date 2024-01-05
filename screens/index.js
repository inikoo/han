// Home
export { default as Home } from './home/HomeScreen';
export { default as Profile } from './home/Profile';
export { default as FormProfile } from './home/Profile/FormProfile';

// HR
export { default as HomeHr } from './home/HR/Home'; // Renamed to 'HomeHr' to avoid conflict
export { default as WorkingPlaces } from './home/HR/WorkingPlaces';
export { default as TimeSheets } from './home/HR/TimeSheets';
export { default as CreateTimeSheet } from './home/HR/TimeSheets/CreateTimeSheets';
export { default as FormWorkingPlaces } from './home/HR/WorkingPlaces/FormWorkingPlaces';
export { default as WorkingPlacesDetail } from './home/HR/WorkingPlaces/WorkingPlacesDetail';

// Auth Screens
export { default as Login } from './auth/LoginFormScreen';
export { default as LoginScanner } from './auth/LoginScannerScreen';
