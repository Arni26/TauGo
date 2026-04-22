// ===== FILTER ROUTES =====
document.querySelectorAll('.filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.card').forEach(card => {
      if (filter === 'all' || card.dataset.difficulty === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== SOS TRIGGER =====
function triggerSOS() {
  const modal = document.getElementById('sosModal');
  const coordsEl = document.getElementById('modalCoords');
  modal.classList.add('open');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const lat = pos.coords.latitude.toFixed(5);
        const lon = pos.coords.longitude.toFixed(5);
        coordsEl.textContent = `GPS: ${lat}° N, ${lon}° E`;
      },
      () => {
        coordsEl.textContent = 'GPS недоступен — сигнал отправлен без координат';
      }
    );
  } else {
    coordsEl.textContent = 'Геолокация не поддерживается браузером';
  }
}

function closeModal() {
  document.getElementById('sosModal').classList.remove('open');
}

document.getElementById('sosModal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// ===== SHARE LOCATION =====
function shareLocation() {
  if (!navigator.geolocation) {
    alert('Геолокация не поддерживается вашим браузером.');
    return;
  }
  navigator.geolocation.getCurrentPosition(
    pos => {
      const lat = pos.coords.latitude.toFixed(5);
      const lon = pos.coords.longitude.toFixed(5);
      const text = `Мои координаты: ${lat}° N, ${lon}° E\nhttps://maps.google.com/?q=${lat},${lon}`;
      if (navigator.share) {
        navigator.share({ title: 'Мои координаты', text });
      } else {
        navigator.clipboard.writeText(text).then(() => {
          alert('Координаты скопированы в буфер обмена!');
        });
      }
    },
    () => alert('Не удалось получить координаты. Проверьте разрешения браузера.')
  );
}

// ===== COMPANION FORM =====
document.querySelector('.form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.textContent = 'Опубликовано!';
  btn.style.background = '#43a047';
  setTimeout(() => {
    btn.textContent = 'Опубликовать группу';
    btn.style.background = '';
    this.reset();
  }, 3000);
});

// ===== SMOOTH APPEAR ON SCROLL =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .weather-card, .diff-item, .companion, .sos-action').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});
