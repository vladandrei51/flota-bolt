// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  X,
  Mail,
  Phone,
  Building2,
  Home,
  Star,
  ListChecks,
  Car,
  Check,
  MessageCircle
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

import skodaImg1 from "./pics/skoda/1.jpeg";
import skodaImg2 from "./pics/skoda/2.jpeg";
import skodaImg3 from "./pics/skoda/3.jpg";
import skodaImg4 from "./pics/skoda/4.jpg";
import skodaImg5 from "./pics/skoda/5.jpg";

import teslaImg1 from "./pics/tesla/1.jpg";
import teslaImg2 from "./pics/tesla/2.jpg";
import teslaImg3 from "./pics/tesla/3.jpg";
import teslaImg4 from "./pics/tesla/4.jpg";
import teslaImg5 from "./pics/tesla/5.jpg";

import loganImg1 from "./pics/logan/1.jpg";
import loganImg2 from "./pics/logan/2.jpg";
import loganImg3 from "./pics/logan/3.jpg";
import loganImg4 from "./pics/logan/4.jpg";

// “Enum” de statusuri
const CAR_STATUS = {
  DISPONIBILA: "Disponibilă",
  INCHIRIATA:  "Închiriată",
};

// Stiluri pentru badge-ul de status
const STATUS_CLASSES = {
  [CAR_STATUS.DISPONIBILA]: "bg-green-100 text-green-800",
  [CAR_STATUS.INCHIRIATA]:  "bg-gray-100 text-gray-600"
};

const sections = [
  { id: "home",      label: "Acasă" },
  { id: "beneficii", label: "Beneficii" },
  { id: "cerinte",   label: "Cerințe" },
  { id: "masini",    label: "Mașini flotă" },
  { id: "contact",   label: "Contact" }
];

export default function App() {
  const [activeSection, setActiveSection]   = useState("home");
  const [manualSection, setManualSection]   = useState(null);
  const [selectedCar,    setSelectedCar]    = useState(null);
  const [selectedImage,  setSelectedImage]  = useState("");
  const refs             = useRef({});
  const manualRef        = useRef(manualSection);
  manualRef.current     = manualSection;

  // 1) IntersectionObserver pentru actualizarea activeSection
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(s => {
      const el = refs.current[s.id];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // 2) Scroll handler și reset manualSection doar la input user
  useEffect(() => {
    const handleScroll = () => {
      if (manualRef.current) return;
      setActiveSection(prev => {
        const { scrollY, innerHeight } = window;
        const fullH = document.documentElement.scrollHeight;
        if (scrollY + innerHeight >= fullH - 2) return "contact";
        if (prev === "contact") return "masini";
        return prev;
      });
    };
    const clearManual = () => {
      if (manualRef.current) setManualSection(null);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", clearManual,    { passive: true });
    window.addEventListener("touchmove", clearManual,{ passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", clearManual);
      window.removeEventListener("touchmove", clearManual);
    };
  }, []);

  // 3) Scroll-to cu override manualSection
  const scrollTo = id => {
    setManualSection(id);
    refs.current[id]?.scrollIntoView({ behavior: "smooth" });
  };

  const masini = [
    {
      id: 1,
      title: "Skoda Rapid 2016",
      status: CAR_STATUS.INCHIRIATA,
      rent: "450 RON / săptămână",
      km: "235.000 km",
      transmission: "Manuală",
      fuel: "Motorină (1.4 TDI)",
      images: [ skodaImg1, skodaImg2, skodaImg3, skodaImg4, skodaImg5 ]
    },
    {
      id: 2,
      title: "Tesla Model 3 SR+ 2020",
      status: CAR_STATUS.INCHIRIATA,
      rent: "1000 RON / săptămână",
      km: "130.000 km",
      transmission: "Automată",
      fuel: "Electrică (50 kW)",
      images: [ teslaImg1, teslaImg2, teslaImg3, teslaImg4, teslaImg5 ]
    },
    {
      id: 3,
      title: "Dacia Logan 2022",
      status: CAR_STATUS.INCHIRIATA,
      rent: "600 RON / săptămână",
      km: "81.000 km",
      transmission: "Manuală",
      fuel: "GPL + Benzină (1.0 TCe)",
      images: [ loganImg1, loganImg2, loganImg3, loganImg4 ]
    }
  ];

  const openImageViewer = (car, img) => {
    setSelectedCar(car);
    setSelectedImage(img);
  };
  const closeImageViewer = () => {
    setSelectedCar(null);
    setSelectedImage("");
  };

  const sectionVariants = {
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:block fixed top-4 left-4 w-40 bg-green-800 bg-opacity-90 backdrop-blur-md text-white p-4 rounded-xl shadow-2xl z-50 space-y-2">
        <h1 className="text-xl font-bold mb-1">Flota Bolt<br/>Cluj</h1>
        {sections.map(s => {
          const isActive = manualSection
            ? manualSection === s.id
            : activeSection === s.id;
          return (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`block text-left text-sm px-2 py-1 rounded-lg hover:bg-green-700 transition ${
                isActive ? "bg-green-700 font-bold" : ""
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </aside>

      {/* Mobile bottom-nav */}
      <header className="md:hidden fixed bottom-0 left-0 w-full bg-white bg-opacity-90 backdrop-blur-md flex justify-around items-center py-2 shadow-t-lg z-50">
        {[Home, Star, ListChecks, Car, MessageCircle].map((Icon, i) => {
          const s = sections[i];
          const isActive = manualSection
            ? manualSection === s.id
            : activeSection === s.id;
          return (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="flex flex-col items-center text-xs"
            >
              <Icon size={20} className={isActive ? "text-green-700" : "text-gray-400"} />
              <span className={isActive ? "text-green-700 font-semibold" : "text-gray-500"}>
                {s.label}
              </span>
              {isActive && (
                <motion.div layoutId="underline" className="h-1 w-6 bg-green-700 rounded-full mt-1" />
              )}
            </button>
          );
        })}
      </header>

      {/* Conținut principal */}
      <main className="ml-0 md:ml-64 w-full pt-0 md:pt-0">
        <AnimatePresence>
          {sections.map(sec => (
            <motion.section
              key={sec.id}
              id={sec.id}
              ref={el => (refs.current[sec.id] = el)}
              initial="hidden"
              whileInView="visible"
              variants={sectionVariants}
              viewport={{ once: true }}
              className="py-16 px-8 bg-green-50"
            >
              {/* Acasă */}
              {sec.id === "home" && (
                <div className="max-w-3xl mx-auto text-center space-y-6">
                  <h2 className="text-4xl font-bold text-green-800">Bun venit!</h2>
                  <p className="text-lg">
                    Alătură-te flotei noastre autorizate și începe să câștigi bani conducând pentru{" "}
                    <strong>Bolt</strong> sau <strong>Uber</strong> în Cluj! Poți folosi{" "}
                    <strong>propriul autoturism</strong> sau unul{" "}
                    <strong>pus la dispoziție de noi</strong>. Oferim suport complet pentru a începe
                    cât mai ușor și rapid.
                  </p>
                  <p className="text-lg text-green-700">
                    Inclusiv posibilitatea de a{" "}
                    <strong>achiziționa autoturismul dorit prin închiriere cu opțiune de cumpărare</strong>,
                    lucrând ca șofer în cadrul flotei noastre. Totul transparent, documentat legal și
                    adaptat nevoilor tale.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <motion.div className="bg-white bg-opacity-80 backdrop-blur rounded-lg px-6 py-4 shadow-lg">
                      <h3 className="text-2xl font-bold">24/7</h3>
                      <p>asistență rutieră</p>
                    </motion.div>
                    <motion.div className="bg-white bg-opacity-80 backdrop-blur rounded-lg px-6 py-4 shadow-lg">
                      <h3 className="text-2xl font-bold">24/7</h3>
                      <p>suport tehnic</p>
                    </motion.div>
                    <motion.div className="bg-white bg-opacity-80 backdrop-blur rounded-lg px-6 py-4 shadow-lg">
                      <h3 className="text-2xl font-bold">ARR</h3>
                      <p>ecusoane rapide</p>
                    </motion.div>
                  </div>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="mt-8 bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition"
                  >
                    Aplică acum
                  </button>
                </div>
              )}

              {/* Beneficii */}
              {sec.id === "beneficii" && (
                <div className="max-w-3xl mx-auto space-y-6">
                  <h2 className="text-3xl font-semibold text-green-700">Beneficii</h2>
                  <ul className="list-none text-lg space-y-3">
                    {[
                      "Suport pentru a lucra în cadrul Bolt/Uber pe autoturismul propriu sau pe unul din cele ale flotei.",
                      "Asistență rutieră și tehnică 24/7.",
                      "Asigurăm eliberarea copiei conforme și a ecusoanelor de la ARR.",
                      "Posibilitatea de a închiria mașina cu opțiune de cumpărare (chirie cu rămânere), astfel să o poți cumpăra în timp ce lucrezi și generezi venituri. Totul cu documentație legală, completă și condiții de rate personalizate de la caz la caz."
                    ].map((item, i) => (
                      <li key={i}>
                        <Check className="inline-block w-5 h-5 text-green-700 mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Cerințe */}
              {sec.id === "cerinte" && (
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-3xl font-semibold text-green-700">Cerințe</h2>
                  <p className="text-lg mt-2">
                    Serviciile de transport alternativ sunt reglementate de <strong>OUG 49/2019</strong>. 
                    Pentru a desfășura această activitate trebuie să îndeplinești:
                  </p>
                  <div className="space-y-4 mt-6">
                    {[
                      "Vârsta minimă: 21 de ani",
                      "Permis de conducere cu vechime de minim 2 ani",
                      "Cazier judiciar fără abateri",
                      "Cazier auto cu istoricul pe ultimii 5 ani (fără suspendarea dreptului de a conduce în ultimul an pentru conducerea sub influența băuturilor alcoolice sau a substanțelor psihoactive sau implicarea în accidente rutiere grave)",
                      "Adeverință de la medicul de familie care să ateste că ești clinic sănătos"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-green-700 text-white rounded-full text-sm font-semibold mt-1">
                          {idx + 1}
                        </div>
                        <p className="text-lg">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mașini flotă */}
              {sec.id === "masini" && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <h2 className="text-3xl font-semibold text-green-700">Mașinile noastre</h2>
                  {masini.map(car => (
                    <motion.div
                      key={car.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="bg-white rounded-xl shadow-md p-6 mb-6"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                        {/* imagine + badge overlay */}
                        <div className="relative flex-shrink-0">
                          <img
                            src={car.images[0]}
                            alt={car.title}
                            className="w-full sm:w-64 h-40 object-cover rounded mb-4 cursor-pointer"
                            onClick={() => openImageViewer(car, car.images[0])}
                          />
                          <span
                            className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full ${
                              STATUS_CLASSES[car.status]
                            }`}
                          >
                            {car.status}
                          </span>
                          <div className="flex gap-2">
                            {car.images.slice(1, 4).map((img, i) => (
                              <img
                                key={i}
                                src={img}
                                className="h-16 w-20 object-cover rounded cursor-pointer"
                                onClick={() => openImageViewer(car, img)}
                              />
                            ))}
                          </div>
                        </div>

                        {/* detalii text */}
                        <div className="flex-grow space-y-1">
                          <h3 className="text-xl font-semibold">{car.title}</h3>
                          <p className="text-sm">Kilometraj: {car.km}</p>
                          <p className="text-sm">Transmisie: {car.transmission}</p>
                          <p className="text-sm">Combustibil: {car.fuel}</p>
                          <p className="text-green-700 font-bold mt-2">{car.rent}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Contact */}
              {sec.id === "contact" && (
                <div className="max-w-3xl mx-auto space-y-6 text-center pb-5">
                  <h2 className="text-3xl font-semibold text-green-800">Contact</h2>
                  <p>Vrei să începi sau ai întrebări? Suntem aici pentru tine.</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      <div><p>SC Siatati SRL</p></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      <FaWhatsapp size={20} className="text-green-500" />
                      <a href="tel:+40760556225" className="underline">+40 760 556 225</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      <a href="mailto:siatati3003@gmail.com" className="underline">siatati3003@gmail.com</a>
                    </div>
                  </div>
                </div>
              )}
            </motion.section>
          ))}
        </AnimatePresence>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedCar && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="absolute top-6 right-6 text-white" onClick={closeImageViewer}>
              <X size={32} />
            </button>
            <img
              src={selectedImage}
              className="max-w-full max-h-[80vh] mb-4 object-contain rounded-lg"
              alt="Preview"
            />
            <div className="flex gap-3 overflow-x-auto px-4">
              {selectedCar.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className={`h-20 w-24 object-cover rounded cursor-pointer ${
                    selectedImage === img ? "border-2 border-white" : ""
                  }`}
                  onClick={() => setSelectedImage(img)}
                  alt={`Thumbnail ${i+1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
