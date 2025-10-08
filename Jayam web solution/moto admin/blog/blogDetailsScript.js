const rightCol = document.querySelector('.right-column');
const leftCol = document.querySelector('.left-column');

function handleScroll() {
  const leftBottom = leftCol.getBoundingClientRect().bottom;
  const rightHeight = rightCol.offsetHeight;

  if (leftBottom <= rightHeight + 100) {
    rightCol.style.position = 'relative';
    rightCol.style.top = 'auto';
  } else {
    rightCol.style.position = 'sticky';
    rightCol.style.top = '20px';
  }
}

window.addEventListener('scroll', handleScroll);
