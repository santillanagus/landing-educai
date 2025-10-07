"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Brain,
  Users,
  TrendingUp,
  Instagram,
  Linkedin,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"

import Aurora from "./components/Aurora"
import TrueFocus from "./components/TrueFocus"
import WobbleCardDemo from "@/components/wobble-card-demo"
import TextType from './components/TextType';

interface MenuItem {
  label: string
  ariaLabel: string
  link: string
}

interface SocialItem {
  label: string
  link: string
}

function HeroSection() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  // Transformaciones para el mockup basadas en el scroll
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const mockupScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.08, 1.05])

  // Variantes de animación para los elementos
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section ref={heroRef} className="relative z-10 min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left Column - Text Content */}
          <motion.div 
            className="text-center lg:text-left order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Línea superior estática */}
            <motion.div 
              className="mb-2 text-[#fd4c61] text-3xl md:text-4xl lg:text-5xl font-bold italic"
              variants={itemVariants}
            >
              La revolución en la
            </motion.div>

            <motion.div variants={itemVariants}>
              <TextType 
                text={["Educación, + IA"]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="_"
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white"
              />
            </motion.div>

            <motion.p 
              className="mt-8 text-lg md:text-xl lg:text-2xl text-white/80 mb-12 leading-relaxed"
              variants={itemVariants}
            >
              Una app que potencia el proceso de enseñanza y aprendizaje combinándolos con el nuevo mundo.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
              variants={itemVariants}
            >
              <Link href="#sobre-app">
                <Button className="bg-black text-white hover:bg-black/80 hover:scale-105 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 ease-in-out w-full sm:w-auto">
                  Quiero saber más
                </Button>
              </Link>
              <Link href="#demo">
                <Button 
                  variant="outline" 
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black hover:scale-105 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 ease-in-out w-full sm:w-auto"
                >
                  Unirme a la lista de espera
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Dashboard Mockup con animación de scroll */}
          <motion.div 
            className="relative flex justify-center lg:justify-end lg:-mr-20 xl:-mr-32 order-2"
            style={{ y: mockupY, scale: mockupScale }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-full max-w-xl lg:max-w-none lg:w-[140%] xl:w-[150%]">
              <Image
                src="/images/dashboard-banner.png"
                alt="Dashboard de EducAI"
                width={2000}
                height={1200}
                className="w-full h-auto rounded-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function SobreAppSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section ref={sectionRef} id="sobre-app" className="relative z-10 py-20 md:py-32 border-t border-white/5">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8"
            variants={itemVariants}
          >
            Revolucionando la educación
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-white/70 leading-relaxed mb-12 md:mb-16"
            variants={itemVariants}
          >
            Educai analiza las entregas de los estudiantes y proporciona insights accionables para mejorar el proceso
            de enseñanza-aprendizaje.
          </motion.p>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 md:gap-12"
            variants={containerVariants}
          >
            <motion.div 
              className="text-center hover:scale-105 transition-transform duration-300"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-[#fd4c61]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-[#fd4c61]" />
              </div>
              <h3 className="text-xl font-semibold mb-4">IA Avanzada</h3>
              <p className="text-white/60">Algoritmos inteligentes que comprenden el aprendizaje</p>
            </motion.div>
            
            <motion.div 
              className="text-center hover:scale-105 transition-transform duration-300"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-[#fd4c61]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-[#fd4c61]" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Para Todos</h3>
              <p className="text-white/60">Diseñado para docentes y estudiantes</p>
            </motion.div>
            
            <motion.div 
              className="text-center hover:scale-105 transition-transform duration-300"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-[#fd4c61]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-[#fd4c61]" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Resultados</h3>
              <p className="text-white/60">Mejora medible en el proceso educativo</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default function EducAILanding() {
  // Ítems del menú (anclas internas de tu landing)
  const menuItems: MenuItem[] = [
    { label: "Home", ariaLabel: "Ir al inicio", link: "#top" },
    { label: "Sobre", ariaLabel: "Ir a Sobre la app", link: "#sobre-app" },
    { label: "Features", ariaLabel: "Ir a Características", link: "#caracteristicas" },
    { label: "Contacto", ariaLabel: "Ir a Lista de espera", link: "#demo" },
    // { label: "Nosotros", ariaLabel: "Ir a Nosotros", link: "#nosotros" },
  ]

  const socialItems: SocialItem[] = [
    { label: "Twitter", link: "https://twitter.com" },
    { label: "GitHub", link: "https://github.com" },
    { label: "LinkedIn", link: "https://linkedin.com" },
  ]

  return (
    <main id="top" className="relative min-h-screen overflow-hidden bg-[#161616] text-white">
      {/* Fondo Aurora */}
      <Aurora
        className="aurora-bg"
        colorStops={["#3A29FF", "#FF94B4", "#fd4c61"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />

      {/* Header / Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 py-6 bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="#top" className="transition-transform hover:scale-105 duration-300">
              <Image
                src="/images/logo-blanco.png"
                alt="EducAI Logo"
                width={300}
                height={100}
                className="h-14 md:h-16 lg:h-20 w-auto"
                priority
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Sobre la app */}
      <SobreAppSection />

      {/* Características principales - WobbleCard */}
      <section id="caracteristicas" className="relative z-10 py-20 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4 lg:px-8">
          <WobbleCardDemo />
        </div>
      </section>

      {/* Lista de espera */}
      <section id="demo" className="relative z-10 py-20 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Únete a la lista de espera</h2>
            <p className="text-lg md:text-xl text-white/70 mb-8 md:mb-12">
              Sé el primero en conocer las últimas noticias y avances de EducAI.
            </p>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6 md:p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-white/80">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#fd4c61] focus:ring-1 focus:ring-[#fd4c61] transition-colors"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-white/80">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#fd4c61] focus:ring-1 focus:ring-[#fd4c61] transition-colors"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="role" className="text-sm font-medium text-white/80">
                      ¿Cuál es tu rol? (Opcional)
                    </label>
                    <select
                      id="role"
                      name="role"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#fd4c61] focus:ring-1 focus:ring-[#fd4c61] transition-colors [&>option]:text-black [&>option]:bg-white"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="profesor">Profesor</option>
                      <option value="estudiante">Estudiante</option>
                      <option value="institucion">Institución</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#fd4c61] hover:bg-[#fd4c61]/90 text-white py-4 text-lg rounded-xl font-medium"
                  >
                    Unirme a la lista de espera
                  </Button>
                </form>
                <div className="mt-6 text-center">
                  <p className="text-sm text-white/40">
                    🔒 Tu información está segura. No compartimos datos con terceros.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nosotros */}
      <section id="nosotros" className="relative z-10 py-20 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">
              Conoce a <span className="text-[#fd4c61]">EDUCAI</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-12 md:mb-16">
              Somos un equipo en etapa de desarrollo dedicado a crear herramientas innovadoras para la educación con
              IA. Combinamos experiencia en tecnología y educación para desarrollar soluciones que realmente
              impacten.
            </p>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#fd4c61] mb-2">{"2025"}</div>
                <p className="text-white/60">Año de fundación</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#fd4c61] mb-2">100%</div>
                <p className="text-white/60">Enfoque en educación</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#fd4c61] mb-2">∞</div>
                <p className="text-white/60">Posibilidades de aprendizaje</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 md:py-16 border-t border-white/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col space-y-8 md:flex-row md:justify-between md:items-start md:space-y-0">
            {/* Left side - EducAI branding */}
            <div className="space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start">
                <Image
                  src="/images/logo-blanco.png"
                  alt="EducAI Logo"
                  width={150}
                  height={50}
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-white/60 max-w-xs mx-auto md:mx-0">
                Transformando la educación con inteligencia artificial
              </p>
            </div>

            {/* Right side - Contact */}
            <div className="space-y-4 text-center md:text-right">
              <h4 className="font-semibold">Contacto</h4>
              <div className="space-y-2">
                <p className="text-white/60">educai.contact@gmail.com</p>
                <div className="flex space-x-6 pt-2 justify-center md:justify-end">
                  <Link href="https://www.instagram.com/educai__" className="text-white/60 hover:text-white transition-colors">
                    <Instagram className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="text-white/60 hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 mt-8 md:mt-12 pt-6 md:pt-8 text-center">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} EducAI. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
