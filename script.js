const menuToggle=document.querySelector(".menu-toggle");
const nav=document.querySelector(".nav");
menuToggle.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const sections=[...document.querySelectorAll("section[id]")];
const navLinks=[...document.querySelectorAll(".nav a[href^='#']")];
window.addEventListener("scroll",()=>{
  let current="home";
  sections.forEach(s=>{if(window.scrollY>=s.offsetTop-140) current=s.id});
  navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+current));
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const filters=document.querySelectorAll(".filter");
const projects=document.querySelectorAll(".project");
filters.forEach(btn=>{
  btn.addEventListener("click",()=>{
    filters.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    const value=btn.dataset.filter;
    projects.forEach(p=>{
      p.classList.toggle("hidden",value!=="all" && p.dataset.category!==value);
    });
  });
});

const glow=document.querySelector(".cursor-glow");
window.addEventListener("mousemove",e=>{
  glow.style.left=e.clientX+"px";
  glow.style.top=e.clientY+"px";
});

document.getElementById("year").textContent=new Date().getFullYear();

const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("formNote");
const submitBtn = document.getElementById("submitBtn");

contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const formData = new FormData(contactForm);

    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(
            "https://formspree.io/f/xkjwykkw",
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        if (response.ok) {
            formNote.textContent =
                "Message sent successfully! I'll get back to you soon.";
            contactForm.reset();
        } else {
            const result = await response.json();
            formNote.textContent =
                result.errors?.[0]?.message ||
                "Something went wrong. Please try again.";
        }

    } catch (error) {
        formNote.textContent =
            "Network error. Please try again.";
    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message ↗";
});