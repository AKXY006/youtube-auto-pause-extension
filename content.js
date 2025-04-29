// Function to pause any video element
function pauseVideo(videoElement) {
  if (videoElement && !videoElement.paused) {
    console.log('Pausing video...');
    videoElement.pause();
  } else {
    console.log('Video is either not found or already paused.');
  }
}

// Function to check if the current page is YouTube Shorts
function isShortsPage() {
  return window.location.href.includes("youtube.com/shorts/");
}

// Function to pause video in YouTube Shorts
function pauseShortsVideo() {
  if (isShortsPage()) {
    const videoElement = document.querySelector("video");
    pauseVideo(videoElement);  // Try to pause the video in Shorts
  }
}

// Function to pause video in normal YouTube pages
function pauseMainVideo() {
  const videoElement = document.querySelector("video");
  pauseVideo(videoElement);  // Try to pause the video
}

// Function to handle iframe videos (in case YouTube Shorts is embedded inside an iframe)
function pauseIframeVideos() {
  const iframes = document.querySelectorAll("iframe");
  iframes.forEach((iframe, index) => {
    try {
      const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      const video = iframeDocument.querySelector("video");
      if (video && !video.paused) {
        console.log(`Pausing video in iframe #${index}`);
        video.pause();
      }
    } catch (error) {
      console.error('Error accessing iframe video:', error);
    }
  });
}

// Check and pause all videos (on YouTube and Shorts)
function checkAndPauseVideos() {
  console.log('Checking for video elements...');
  pauseMainVideo();      // Check and pause main YouTube video
  pauseShortsVideo();    // Check and pause Shorts video
  pauseIframeVideos();   // Check and pause videos in iframe (if any)
}

// Detect tab visibility changes (pause videos when tab is switched)
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    console.log('Tab switched, pausing videos...');
    checkAndPauseVideos();
  }
});

// MutationObserver to detect dynamically added videos or content
const observer = new MutationObserver(() => {
  console.log('DOM updated, checking for new video...');
  checkAndPauseVideos();  // Pause videos whenever DOM changes (like new video loading)
});

// Observe for changes in the DOM (important for dynamic content like YouTube videos)
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
});

// Event listener for page load (pause videos as soon as page is ready)
document.addEventListener("DOMContentLoaded", () => {
  console.log('Page loaded, checking for videos...');
  checkAndPauseVideos();
});

// Debounced function for better performance when scrolling or resizing
let timeout;
function debouncePause() {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    console.log('Debounced check for video pause...');
    checkAndPauseVideos();  // Pause video after 200ms of inactivity
  }, 200);
}

// Attach debounced function to scroll and resize events
window.addEventListener("scroll", debouncePause);
window.addEventListener("resize", debouncePause);
