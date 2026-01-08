
// Navbar shadow on scroll
window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
        document.body.classList.add("scrolled");
    } else {
        document.body.classList.remove("scrolled");
    }
});









/* =========================================
   Smooth Scrolling for Nav Links
========================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* =========================================
   Scroll Animations (Intersection Observer)
========================================= */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe existing animated elements
document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
});

// Add scroll-animate class dynamically on load
window.addEventListener('load', () => {
    document.querySelectorAll(
        '.experience-card, .publication-card, .skill-category'
    ).forEach(el => {
        if (!el.classList.contains('scroll-animate')) {
            el.classList.add('scroll-animate');
            observer.observe(el);
        }
    });
});

/* =========================================
   DevOps / Cloud Live Background (Canvas)
========================================= */
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("infra-bg");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let nodes = [];
    const NODE_COUNT = 80;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Node {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.35;
            this.vy = (Math.random() - 0.5) * 0.35;
            this.radius = 2.2;
        }

        move() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(0, 212, 255, 0.9)";
            ctx.fill();
        }
    }

    // Create nodes
    for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push(new Node());
    }

    function connectNodes() {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 160) {
                    ctx.strokeStyle = `rgba(0, 212, 255, ${1 - dist / 160})`;
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        nodes.forEach(node => {
            node.move();
            node.draw();
        });
        connectNodes();
        requestAnimationFrame(animate);
    }

    animate();
});



