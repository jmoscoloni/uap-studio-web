export const getMobileOS = (): string | null => {
  if (typeof navigator === 'undefined') return null;
  const ua = navigator.userAgent || '';

  if (/windows phone/i.test(ua)) {
    return 'Windows Phone';
  }

  if (/android/i.test(ua)) {
    return 'Android';
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(ua) && typeof window !== 'undefined' && !(window as any).MSStream) {
    return 'iOS';
  }

  return null;
};
