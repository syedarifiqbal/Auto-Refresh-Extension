import { DEFAULT_SETTINGS } from '../types/index.js';

const minIntervalSlider = document.getElementById('minInterval') as HTMLInputElement;
const maxIntervalSlider = document.getElementById('maxInterval') as HTMLInputElement;
const minValueDisplay = document.getElementById('minValue') as HTMLSpanElement;
const maxValueDisplay = document.getElementById('maxValue') as HTMLSpanElement;
const currentDomainDisplay = document.getElementById('currentDomain') as HTMLSpanElement;
const statusDisplay = document.getElementById('status') as HTMLSpanElement;
const toggleBtn = document.getElementById('toggleBtn') as HTMLButtonElement;
const pauseBtn = document.getElementById('pauseBtn') as HTMLButtonElement;
const nextRefreshDisplay = document.getElementById('nextRefresh') as HTMLParagraphElement;
const lastRefreshDisplay = document.getElementById('lastRefresh') as HTMLParagraphElement;

let currentDomain: string | null = null;

function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
}

function extractDomain(url: string): string | null {
  try {
    const urlObj = new URL(url);
    if (urlObj.protocol === 'chrome:' || urlObj.protocol === 'chrome-extension:') {
      return null;
    }
    return urlObj.hostname;
  } catch {
    return null;
  }
}

async function getCurrentTab(): Promise<chrome.tabs.Tab | null> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab || null;
}

async function initPopup(): Promise<void> {
  const tab = await getCurrentTab();

  if (tab?.url) {
    currentDomain = extractDomain(tab.url);
    if (currentDomain) {
      currentDomainDisplay.textContent = currentDomain;
    } else {
      currentDomainDisplay.textContent = 'Not supported';
      toggleBtn.disabled = true;
    }
  } else {
    currentDomainDisplay.textContent = 'Unknown';
    toggleBtn.disabled = true;
  }

  minIntervalSlider.value = String(DEFAULT_SETTINGS.minInterval);
  maxIntervalSlider.value = String(DEFAULT_SETTINGS.maxInterval);
  updateSliderDisplays();

  const response = await chrome.runtime.sendMessage({ type: 'GET_STATUS' });
  console.log('Service worker status:', response);
}

function updateSliderDisplays(): void {
  const minVal = parseInt(minIntervalSlider.value);
  const maxVal = parseInt(maxIntervalSlider.value);

  minValueDisplay.textContent = formatTime(minVal);
  maxValueDisplay.textContent = formatTime(maxVal);
}

function validateIntervals(): boolean {
  const minVal = parseInt(minIntervalSlider.value);
  const maxVal = parseInt(maxIntervalSlider.value);

  if (minVal >= maxVal) {
    maxIntervalSlider.value = String(minVal + 10);
    updateSliderDisplays();
  }

  return true;
}

minIntervalSlider.addEventListener('input', () => {
  updateSliderDisplays();
  validateIntervals();
});

maxIntervalSlider.addEventListener('input', () => {
  updateSliderDisplays();
  validateIntervals();
});

toggleBtn.addEventListener('click', () => {
  console.log('Toggle clicked for domain:', currentDomain);
});

pauseBtn.addEventListener('click', () => {
  console.log('Pause clicked');
});

document.addEventListener('DOMContentLoaded', initPopup);
