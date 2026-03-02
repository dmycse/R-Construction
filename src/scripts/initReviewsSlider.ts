// Workflow:
// button clik -> update currentReviewIndex -> call updateActiveReview ->
//  wait for animation end -> call handleLoop -> 
// -> call updateActiveReview (if we reach the end or the start)
export function initReviewsSlider() {
  const reviewsWpapper = document.querySelector<HTMLDivElement>('[data-reviews-wrapper]'); 
  if (!reviewsWpapper) return;

  const reviewsContainer = reviewsWpapper.querySelector<HTMLDivElement>('[data-reviews]');
  const reviews = reviewsContainer?.querySelectorAll<HTMLDivElement>('[data-review]');

  const prevReviewBtn = reviewsWpapper?.querySelector<HTMLButtonElement>('[data-reviews-prev]');
  const nextReviewBtn = reviewsWpapper?.querySelector<HTMLButtonElement>('[data-reviews-next]');
  
  if (!reviewsContainer || !reviews?.length) return;

  // --- STATE ---
  const originalReviewsLength = reviews.length - 2;
  let currentReviewIndex = 1;
  let isTransitioning = false;

  // --- SLIDES ---
  const updateActiveReview = (withAnimation = true) => {
    reviewsContainer.style.transition = withAnimation ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';

    // instead of 100%, we use a calculation based on 
    // the width of a single card in pixels.
    const reviewCardWidth = reviews[0].offsetWidth;

    requestAnimationFrame(() => {
      reviewsContainer.style.transform = `translateX(-${currentReviewIndex * reviewCardWidth}px)`; 
    });

    if (withAnimation) isTransitioning = true;
  };

  const handleLoop = () => {
    isTransitioning = false;
    // if reached the end (first clone) -> jump to the real first
    if (currentReviewIndex === originalReviewsLength + 1) {
      currentReviewIndex = 1;
      updateActiveReview(false);
    }
    // if reached the start (last clone) -> jump to the real last 
    if (currentReviewIndex === 0) {
      currentReviewIndex = originalReviewsLength;
      updateActiveReview(false);
    }
  }

  // --- EVENTS ---
  // check any animation end and call handleloop
  reviewsContainer.addEventListener('transitionend', e => {
    if (e.target !== reviewsContainer) return;
    if (e.propertyName !== 'transform') return;
    handleLoop();
  });
  
  // in case of resize, recalculate the position 
  // without animation (as a precaution)
  window.addEventListener('resize', () => {
    updateActiveReview(false);
  });

  prevReviewBtn?.addEventListener('click', () => {
    if (isTransitioning) return;
    currentReviewIndex--;
    updateActiveReview();
  });

  nextReviewBtn?.addEventListener('click', () => {
    if (isTransitioning) return;
    currentReviewIndex++;
    updateActiveReview();
  });

  // --- INIT ---
  updateActiveReview(false);
}