import React, { useEffect, useRef, useState } from "react";
import { X, Mail, Phone, Building2, Home, Star, ListChecks, Car, Check, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const sections = [
  { id: "home", label: "Acasă" },
  { id: "beneficii", label: "Beneficii" },
  { id: "cerinte", label: "Cerințe" },
  { id: "masini", label: "Maşini flotă" },
  { id: "contact", label: "Contact" },
];

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const refs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    // Observăm toate secțiunile
    sections.forEach(s => {
      const el = refs.current[s.id];
      if (el) observer.observe(el);
    });

    // Fallback + reset când ieși din "contact"
    const handleScroll = () => {
      setActiveSection(prev => {
        const { scrollY, innerHeight } = window;
        const fullH = document.documentElement.scrollHeight;
        // dacă ești jos de tot
        if (scrollY + innerHeight >= fullH - 2) {
          return "contact";
        }
        // dacă erai pe contact și te-ai ridicat măcar puțin, du-te la masini
        if (prev === "contact") {
          return "masini";
        }
        // altfel, lasă IntersectionObserver-ul să decidă
        return prev;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const scrollTo = id => refs.current[id]?.scrollIntoView({ behavior: "smooth" });

  const masini = [
    {
      id: 1,
      title: "Skoda Rapid 2016",
      status: "Închiriată",
      rent: "450 RON / săptămână",
      km: "235.000 km",
      transmission: "Manuala",
      fuel: "Motorina (1.4 TDI)",
      images: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/2014_Skoda_Rapid_SE_Connect_TSi_1.2_Rear.jpg/2560px-2014_Skoda_Rapid_SE_Connect_TSi_1.2_Rear.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/e/ee/Skoda_MissionL_%28rear_quarter%29.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/%C5%A0koda_Rapid_-_wn%C4%99trze_%28MSP15%29.JPG/2560px-%C5%A0koda_Rapid_-_wn%C4%99trze_%28MSP15%29.JPG",
        "https://upload.wikimedia.org/wikipedia/commons/7/7e/Skoda_Rapid_2021_%28cropped%29.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/2/2f/Skoda_Rapid_2021_3_%28cropped%29.jpg"
      ]
    },
    {
      id: 2,
      title: "Tesla Model 3 Standard Range Plus 2019",
      status: "Disponibilă",
      rent: "1000 RON / săptămână",
      km: "130.000 km",
      transmission: "Automată",
      fuel: "Electrica (50 kW)",
      images: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Tesla_Model_3_Performance_%28Facelift%29_%E2%80%93_h_01012025.jpg/2560px-Tesla_Model_3_Performance_%28Facelift%29_%E2%80%93_h_01012025.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Tesla_Model_3_%282023%29_Auto_Zuerich_2023_1X7A1315.jpg/2560px-Tesla_Model_3_%282023%29_Auto_Zuerich_2023_1X7A1315.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/The_Model_3_Interior.jpg/2560px-The_Model_3_Interior.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/First_Model_3_production_cars_ready_for_delivery.jpg/2560px-First_Model_3_production_cars_ready_for_delivery.jpg"
      ]
    },
    {
      id: 3,
      title: "Dacia Logan 2023",
      status: "Disponibilă",
      rent: "600 RON / săptămână",
      km: "81.000 km",
      transmission: "Manuala",
      fuel: "GPL + Benzină (1.0 TCe)",
      images: [
        "https://upload.wikimedia.org/wikipedia/commons/d/d4/Dacia_Logan_2023_Front_2_%28cropped%29.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/2023_Dacia_Logan_III_IMG_9671_%28cropped%29.jpg/2560px-2023_Dacia_Logan_III_IMG_9671_%28cropped%29.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/f/f7/Renault_Taliant_1.0_Turbo_90_X-tronic_%28Exterior%29.png",
        "https://upload.wikimedia.org/wikipedia/commons/d/d4/Renault_Taliant_1.0_Turbo_90_X-tronic_%28Interior%29_1.png"
      ]
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:block fixed top-4 left-4 w-40 bg-green-800 bg-opacity-90 backdrop-blur-md text-white p-4 rounded-xl shadow-2xl z-50 space-y-2">
        <h1 className="text-xl font-bold mb-1">Flota Bolt<br/>Cluj</h1>
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className={`block text-left text-sm px-2 py-1 rounded-lg hover:bg-green-700 transition ${
              activeSection === s.id ? "bg-green-700 font-bold" : ""
            }`}
          >
            {s.label}
          </button>
        ))}
      </aside>

      {/* Mobile bottom-nav */}
      <header className="md:hidden fixed bottom-0 left-0 w-full bg-white bg-opacity-90 backdrop-blur-md flex justify-around items-center py-2 shadow-t-lg z-50">
        {[Home, Star, ListChecks, Car, MessageCircle].map((Icon, i) => {
          const s = sections[i];
          const isActive = activeSection === s.id;
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
                    <strong>propriul autoturism</strong> sau unul <strong>pus la dispoziție de noi</strong>. Oferim suport complet pentru a începe cât mai ușor și rapid.
                  </p>
                  <p className="text-lg text-green-700">
                    Inclusiv posibilitatea de a <strong>achizitiona autoturismul dorit prin chirie cu ramanere</strong>, lucrând ca șofer în cadrul flotei noastre. Totul transparent, documentat legal și adaptat nevoilor tale.
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
                      "Posibilitatea de a achiziționa autoturismul lucrând prin flotă (chirie cu opțiune de cumpărare), cu documentație legală completă și perioadă/rată flexibilă discutabilă individual."
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
                <div className="max-w-3xl mx-auto space-y-6">
                  <h2 className="text-3xl font-semibold text-green-700">
                    Cerințe
                  </h2>
                  <p className="text-lg">
                    Serviciile de transport alternativ sunt reglementate de OUG
                    49/2019. Pentru a desfășura această activitate trebuie să
                    îndeplinești:
                  </p>
                  <ul className="list-decimal list-inside text-lg space-y-3">
                    <li>Vârsta minimă: 21 de ani</li>
                    <li>Permis de conducere cu vechime de minim 2 ani</li>
                    <li>Cazier judiciar fără abateri</li>
                    <li>
                      Cazier auto cu istoricul pe ultimii 5 ani (fără suspendarea
                      dreptului de a conduce în ultimul an pentru conducerea sub
                      influența băuturilor alcoolice sau a substanțelor
                      psihoactive sau implicarea în accidente rutiere grave)
                    </li>
                    <li>
                      Adeverință de la medicul de familie care să ateste că ești
                      clinic sănătos
                    </li>
                  </ul>
                </div>
              )}

              {/* Mașini flotă */}
              {sec.id === "masini" && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <h2 className="text-3xl font-semibold text-green-700">
                    Mașinile noastre
                  </h2>
                  {masini.map(car => (
                    <motion.div
                      key={car.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="bg-white rounded-xl shadow-md p-6 mb-6"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-6 flex-wrap">
                        <div className="flex flex-col flex-shrink-0">
                          <img
                            src={car.images[0]}
                            alt={car.title}
                            className="w-full sm:w-64 h-40 object-cover rounded mb-4 cursor-pointer"
                            onClick={() =>
                              openImageViewer(car, car.images[0])
                            }
                          />
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
                        <div className="flex-grow space-y-1">
                          <h3 className="text-xl font-semibold">
                            {car.title}
                          </h3>
                          <p className="text-sm">Kilometraj: {car.km}</p>
                          <p className="text-sm">
                            Transmisie: {car.transmission}
                          </p>
                          <p className="text-sm">Combustibil: {car.fuel}</p>
                          <p className="text-green-700 font-bold mt-2">
                            {car.rent}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold flex-shrink-0 ${car.status==="Disponibilă"? "bg-green-200 text-green-800" : "bg-gray-300 text-gray-600"}`}>{car.status}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Contact */}
              {sec.id === "contact" && (
                <div className="max-w-3xl mx-auto space-y-6 text-center">
                  <h2 className="text-3xl font-semibold text-green-800">
                    Contact
                  </h2>
                  <p>Vrei să începi sau ai întrebări? Suntem aici pentru tine.</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      <div>
                        <p>SC Flota Trans SRL</p>
                        <p>CUI: RO12345678</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      <FaWhatsapp size={20} className="text-green-500" />
                      <a href="tel:+40712345678" className="underline">
                        +40 712 345 678
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      <a href="mailto:flota@example.com" className="underline">
                        flota@example.com
                      </a>
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
            <button
              className="absolute top-6 right-6 text-white"
              onClick={closeImageViewer}
            >
              <X size={32} />
            </button>
            <img
              src={selectedImage}
              className="max-w-full max-h-[80vh] mb-4 object-contain rounded-lg"
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
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
