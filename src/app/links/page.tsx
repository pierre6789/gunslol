'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const links = [
  {
    title: 'Twitter',
    url: 'https://twitter.com',
    icon: '𝕏',
    description: 'Suivez-moi sur Twitter'
  },
  {
    title: 'GitHub',
    url: 'https://github.com',
    icon: '🐙',
    description: 'Mes projets open source'
  },
  {
    title: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: '💼',
    description: 'Mon profil professionnel'
  },
  {
    title: 'Instagram',
    url: 'https://instagram.com',
    icon: '📸',
    description: 'Mes photos et stories'
  }
]

export default function Links() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Vidéo de fond */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>

      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Contenu */}
      <div className="relative min-h-screen py-16 px-4">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              Mes Liens
            </h1>
            <p className="text-gray-300">Retrouvez-moi sur les réseaux sociaux</p>
          </motion.div>

          <div className="space-y-4">
            {links.map((link, index) => (
              <motion.a
                key={link.title}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="block backdrop-blur-lg bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 border border-white/20"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{link.icon}</span>
                    <span className="text-gray-400">→</span>
                  </div>
                  <h3 className="text-white font-medium text-lg">{link.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{link.description}</p>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link
              href="/"
              className="inline-block px-6 py-2 backdrop-blur-lg bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300"
            >
              ← Retour
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  )
} 