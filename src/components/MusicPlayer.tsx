import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'

interface Song {
  title: string
  artist: string
  file: string
}

interface MusicPlayerProps {
  onStart?: () => void
}

export interface MusicPlayerRef {
  getAudio: () => HTMLAudioElement | null
}

const songs = [
  {
    title: 'PUTIN',
    artist: 'Raus',
    file: '/music/Raus - PUTIN (Official Video).mp3'
  },
  {
    title: 'Cascade',
    artist: 'Alpha Wann',
    file: '/music/Alpha Wann - Cascade.mp3'
  },
  {
    title: 'Changer',
    artist: 'Unknown',
    file: '/music/Changer.mp3'
  },
  {
    title: 'NOUVEAU OPPS',
    artist: 'Unknown',
    file: '/music/NOUVEAU OPPS.mp3'
  }
]

const MusicPlayer = forwardRef<MusicPlayerRef, MusicPlayerProps>(({ onStart }, ref) => {
  const [currentSong, setCurrentSong] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [hasStarted, setHasStarted] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)

  useImperativeHandle(ref, () => ({
    getAudio: () => audio
  }))

  useEffect(() => {
    setAudio(new Audio(songs[0].file))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (audio) {
      const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
      const handleLoadedMetadata = () => setDuration(audio.duration)
      audio.addEventListener('timeupdate', handleTimeUpdate)
      audio.addEventListener('loadedmetadata', handleLoadedMetadata)
      document.body.appendChild(audio)
      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate)
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
        document.body.removeChild(audio)
      }
    }
  }, [audio])

  const startPlayback = () => {
    if (audio) {
      audio.play()
      setIsPlaying(true)
      setHasStarted(true)
      onStart?.()
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handlePlayPause = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const playNext = () => {
    if (!audio) return
    const nextSong = (currentSong + 1) % songs.length
    setCurrentSong(nextSong)
    audio.src = songs[nextSong].file
    if (isPlaying) {
      audio.play()
    }
  }

  const playPrevious = () => {
    if (!audio) return
    const prevSong = (currentSong - 1 + songs.length) % songs.length
    setCurrentSong(prevSong)
    audio.src = songs[prevSong].file
    if (isPlaying) {
      audio.play()
    }
  }

  return (
    <>
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 w-screen h-screen bg-black/95 backdrop-blur-md z-[100] flex items-center justify-center"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              transform: 'none'
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center space-y-12"
            >
              <motion.h1 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-7xl font-light text-white tracking-wider"
              >
                Bienvenue
              </motion.h1>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={startPlayback}
                className="text-white border border-white/30 px-16 py-4 rounded-full text-lg font-light tracking-wider hover:bg-white/10 transition-all duration-300"
              >
                Entrer
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: hasStarted ? 1 : 0, y: hasStarted ? 0 : 20 }}
        transition={{ duration: 0.5, delay: hasStarted ? 0.5 : 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-white/20 w-[600px]"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={playPrevious}
              className="text-white hover:text-purple-400 transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handlePlayPause}
              className="text-white hover:text-purple-400 transition-colors duration-300"
            >
              {isPlaying ? (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </button>

            <button
              onClick={playNext}
              className="text-white hover:text-purple-400 transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-bold text-white">
              {songs[currentSong].title}
            </h3>
            <p className="text-gray-300 text-sm">
              {songs[currentSong].artist}
            </p>
          </div>

          <div className="w-[100px]">
            {/* Espace réservé pour d'autres contrôles si nécessaire */}
          </div>
        </div>

        <div className="mt-4 flex items-center space-x-2">
          <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <span className="text-xs text-gray-400">{formatTime(duration)}</span>
        </div>
      </motion.div>
    </>
  )
})

MusicPlayer.displayName = 'MusicPlayer'

export default MusicPlayer 