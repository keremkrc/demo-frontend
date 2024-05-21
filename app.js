document.addEventListener('DOMContentLoaded', () => {
  const data = [
    { deskNo: 1, full: true, sectionName: 'Section A', chairs: [
      { chairId: 1, occupied: true },
      { chairId: 2, occupied: false }
    ]},
    { deskNo: 2, full: false, sectionName: 'Section B', chairs: [
      { chairId: 3, occupied: true },
      { chairId: 4, occupied: true }
    ]},
    { deskNo: 3, full: false, sectionName: 'Section A', chairs: [
      { chairId: 5, occupied: false },
      { chairId: 6, occupied: false }
    ]},
    { deskNo: 4, full: true, sectionName: 'Section C', chairs: [
      { chairId: 7, occupied: true },
      { chairId: 8, occupied: false }
    ]},
    { deskNo: 5, full: false, sectionName: 'Section B', chairs: [
      { chairId: 9, occupied: false },
      { chairId: 10, occupied: true }
    ]}
  ];

  const sectionContainer = document.getElementById('section-container');
  const deskContainer = document.getElementById('desk-container');
  const chairContainer = document.getElementById('chair-container');

  function renderDesks(filteredData) {
    deskContainer.innerHTML = ''; // Clear existing desks
    filteredData.forEach(item => {
      const deskCard = document.createElement('div');
      deskCard.className = 'desk-card';
      deskCard.classList.add(item.full ? 'full' : 'available'); // Add appropriate class based on desk status
      deskCard.innerHTML = `
        <h3>Desk Number: ${item.deskNo}</h3>
        <p>Status: ${item.full ? 'Full' : 'Available'}</p>
        <p>Location: ${item.sectionName}</p>
      `;
      deskCard.addEventListener('click', () => {
        sessionStorage.setItem('selectedDesk', JSON.stringify(item)); // Store the selected desk
        window.location.href = 'chairs.html'; // Navigate to chairs page
      });
      deskContainer.appendChild(deskCard);
    });
  }

  function renderChairs(chairs) {
    chairContainer.innerHTML = ''; // Clear existing chairs
    chairs.forEach(chair => {
      const chairCard = document.createElement('div');
      chairCard.className = 'chair-card';
      chairCard.classList.add(chair.occupied ? 'occupied' : 'empty'); // Add appropriate class based on chair status
      chairCard.innerHTML = `
        <p>Chair ID: ${chair.chairId}</p>
      `;
      chairContainer.appendChild(chairCard);
    });
  }

  function filterDesks(section) {
    const filteredData = data.filter(desk => desk.sectionName === section);
    renderDesks(filteredData);
  }

  // Event listener for section selection
  if (sectionContainer) {
    sectionContainer.addEventListener('click', (event) => {
      const sectionCard = event.target.closest('.section-card');
      if (sectionCard) {
        const section = sectionCard.getAttribute('data-section');
        sessionStorage.setItem('selectedSection', section); // Store the selected section
        window.location.href = 'desks.html'; // Navigate to desks page
      }
    });
  }

  // Display desks on desks.html
  if (deskContainer) {
    const selectedSection = sessionStorage.getItem('selectedSection');
    if (selectedSection) {
      document.getElementById('section-title').textContent = `Desks in ${selectedSection}`;
      filterDesks(selectedSection);
    } else {
      deskContainer.innerHTML = '<p>No section selected. Please go back and select a section.</p>';
    }
  }

  // Display chairs on chairs.html
  if (chairContainer) {
    const selectedDesk = JSON.parse(sessionStorage.getItem('selectedDesk'));
    if (selectedDesk) {
      document.getElementById('desk-title').textContent = `Chairs in Desk ${selectedDesk.deskNo}`;
      renderChairs(selectedDesk.chairs);
    } else {
      chairContainer.innerHTML = '<p>No desk selected. Please go back and select a desk.</p>';
    }
  }

  // Event listeners for go back buttons
  const goBackButton = document.getElementById('go-back-button');
  if (goBackButton) {
    goBackButton.addEventListener('click', () => {
      const currentPage = window.location.pathname.split('/').pop();
      if (currentPage === 'desks.html') {
        window.location.href = 'index.html';
      } else if (currentPage === 'chairs.html') {
        window.location.href = 'desks.html';
      }
    });
  }
});
