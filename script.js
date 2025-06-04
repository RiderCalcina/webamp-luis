document.addEventListener('DOMContentLoaded', function() {
    // Inicializar partículas
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 60,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": ["#FF8A00", "#E52E71", "#6A3093", "#1D976C"]
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.1,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.5
                    }
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });

    const sponsorsContainer = document.getElementById('sponsors-container');
    
    // Colores para los sponsors
    const colors = [
        '#FF8A00', '#FFD700', '#00FFFF', '#7FFF00',
        '#FF6347', '#9370DB', '#00BFFF', '#FF69B4'
    ];
    
    // Cargar sponsors desde el JSON
    fetch('sponsor.json?' + new Date().getTime()) // Evitar caché
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP! estado: ${response.status}`);
            }
            return response.text(); // Primero obtener como texto
        })
        .then(text => {
            try {
                const sponsors = JSON.parse(text);
                console.log('Sponsors cargados:', sponsors.length);
                
                if (!Array.isArray(sponsors) || sponsors.length === 0) {
                    throw new Error('El JSON no contiene un array válido de sponsors');
                }
                
                displaySponsors(sponsors);
                
                // Auto-refresco cada 10 segundos
                setInterval(() => {
                    refreshSponsors(sponsors);
                }, 2500);
            } catch (e) {
                console.error('Error parseando JSON:', e);
                showError('Error en el formato del JSON: ' + e.message);
            }
        })
        .catch(error => {
            console.error('Error cargando sponsors:', error);
            showError('Error cargando los sponsors. Verifica la consola para más detalles.');
        });

    function displaySponsors(sponsors) {
        const containerWidth = sponsorsContainer.clientWidth;
        const containerHeight = sponsorsContainer.clientHeight;
        const positions = [];
        
        sponsors.forEach(sponsor => {
            createSponsorElement(sponsor, containerWidth, containerHeight, positions);
        });
    }
    
    function createSponsorElement(sponsor, containerWidth, containerHeight, positions) {
        const sponsorElement = document.createElement('div');
        sponsorElement.className = 'sponsor animate-in';
        sponsorElement.textContent = sponsor.name;
        
        // Tamaño
        const size = Math.random() * 2 + 1.5; // Entre 1.5rem y 3.5rem
        sponsorElement.style.fontSize = `${size}rem`;
        
        // Color
        const color = colors[Math.floor(Math.random() * colors.length)];
        sponsorElement.style.color = color;
        sponsorElement.style.border = `2px solid ${color}`;
        
        // Posición que no se solape y esté dentro de la pantalla
        let left, top, overlap;
        const maxAttempts = 100;
        let attempts = 0;
        const elementWidth = sponsor.name.length * size * 0.6;
        const elementHeight = size * 1.5;
        
        do {
            overlap = false;
            left = Math.random() * (containerWidth - elementWidth - 40) + 20;
            top = Math.random() * (containerHeight - elementHeight - 40) + 20;
            
            // Verificar solapamiento
            for (const pos of positions) {
                if (Math.abs(left - pos.left) < pos.width + elementWidth && 
                    Math.abs(top - pos.top) < pos.height + elementHeight) {
                    overlap = true;
                    break;
                }
            }
            
            attempts++;
            if (attempts >= maxAttempts) break;
        } while (overlap);
        
        positions.push({
            left: left,
            top: top,
            width: elementWidth,
            height: elementHeight
        });
        
        sponsorElement.style.left = `${left}px`;
        sponsorElement.style.top = `${top}px`;
        
        // Añadir al contenedor
        sponsorsContainer.appendChild(sponsorElement);
    }
    
    function refreshSponsors(sponsors) {
        const containerWidth = sponsorsContainer.clientWidth;
        const containerHeight = sponsorsContainer.clientHeight;
        const existingSponsors = Array.from(document.querySelectorAll('.sponsor'));
        
        // Animación de salida
        existingSponsors.forEach(sponsor => {
            sponsor.classList.remove('animate-in');
            sponsor.classList.add('animate-out');
        });
        
        // Esperar a que termine la animación
        setTimeout(() => {
            sponsorsContainer.innerHTML = '';
            displaySponsors(sponsors);
        }, 500);
    }
    
    function showError(message) {
        sponsorsContainer.innerHTML = `
            <div class="error-message">
                ${message}<br>
                <small>Por favor recarga la página</small>
            </div>
        `;
    }
    
    // Actualizar al redimensionar
    window.addEventListener('resize', () => {
        const sponsors = Array.from(document.querySelectorAll('.sponsor')).map(el => {
            return { name: el.textContent };
        });
        if (sponsors.length > 0) {
            refreshSponsors(sponsors);
        }
    });
});