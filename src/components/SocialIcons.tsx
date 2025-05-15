import { motion } from 'framer-motion'

interface SocialLink {
  id: string
  name: string
  icon: string // Chemin vers votre image/icône
  url: string
  clickable?: boolean
}

const socialLinks: SocialLink[] = [
  {
    id: 'telegram-1',
    name: 'Telegram',
    icon: '/icons/Spinning_star_thing.gif', // Remplacez par le chemin de votre icône
    url: 'https://t.me/focus4ofm',
    clickable: false
  },
  {
    id: 'telegram-2',
    name: 'Telegram',
    icon: '/icons/tele_copy.gif', // Remplacez par le chemin de votre icône
    url: 'https://t.me/focus4ofm',
    clickable: true
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: '/icons/dc_copy.gif', // Remplacez par le chemin de votre icône
    url: 'https://discord.com/users/826049555271385108',
    clickable: true
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: '/icons/7197-black-diamond.gif',
    url: 'https://hetr.xyz',
    clickable: true
  },
  {
    id: 'spotify',
    name: 'Spotify',
    icon: '/icons/spotify_copy.gif', // Remplacez par le chemin de votre icône
    url: 'https://open.spotify.com/playlist/66wJ6X3l5mp2f9q9RjeJqc?si=32fe037419764b4c',
    clickable: true
  },
  {
    id: 'paypal',
    name: 'Paypal',
    icon: '/icons/donate_copy.gif', // Remplacez par le chemin de votre icône
    url: 'https://paypal.me/DarynaBella',
    clickable: true
  },
  {
    id: 'telegram-3',
    name: 'Telegram',
    icon: '/icons/output-onlinegiftools.gif', // Remplacez par le chemin de votre icône
    url: 'https://t.me/focus4ofm',
    clickable: false
  }
]

export default function SocialIcons() {
  return (
    <div className="flex space-x-10">
      {socialLinks.map((link, index) => {
        const IconContent = (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
            whileHover={{
              scale: 1.2,
              rotate: 5,
              transition: { duration: 0.2 }
            }}
          >
            <div className="relative">
              <motion.img 
                src={link.icon} 
                alt={link.name}
                className={`object-contain ${link.id === 'github' ? 'w-12 h-12' : 'w-10 h-10'}`}
                whileHover={{
                  filter: "brightness(1.2)",
                  transition: { duration: 0.2 }
                }}
              />
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.div>
        )

        return link.clickable ? (
          <motion.a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {IconContent}
          </motion.a>
        ) : (
          <div key={link.id}>
            {IconContent}
          </div>
        )
      })}
    </div>
  )
} 