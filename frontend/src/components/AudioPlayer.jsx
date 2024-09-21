import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { FaPlay, FaPause, FaRedo, FaTimes } from 'react-icons/fa';
import styles from '../styles/AudioPlayer.module.css';

const AudioPlayer = ({ track }) => {
  const [playing, setPlaying] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [visible, setVisible] = useState(true); // حالة للتحكم في ظهور المشغل
  const playerRef = useRef(null);

  const togglePlayPause = () => {
    setPlaying(!playing);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleTimeUpdate = (state) => {
    setCurrentTime(state.playedSeconds);
  };

  const toggleRepeat = () => {
    setRepeat(!repeat);
  };

  const closePlayer = () => {
    setPlaying(false);
    setVisible(false); // إخفاء المشغل عند الإغلاق
  };

  useEffect(() => {
    if (currentTime === duration && !repeat) {
      setPlaying(false);
    }
  }, [currentTime, duration, repeat]);

  if (!visible) return null; // إخفاء المشغل إذا كانت الحالة غير مرئية

  return (
    <div className={styles.audioPlayer}>
      <button className={styles.closeButton} onClick={closePlayer}>
        <FaTimes />
      </button>
      <ReactPlayer
        ref={playerRef}
        url={track.url}
        playing={playing}
        onDuration={handleDuration}
        onProgress={handleTimeUpdate}
        loop={repeat}
        controls={false}
        height="0"
        width="0"
      />
      <div className={styles.controls}>
        <button className={styles.controlButton} onClick={toggleRepeat}>
          <FaRedo style={{ color: repeat ? '#ff2727' : 'black' }} />
        </button>
        <button className={styles.controlButton} onClick={togglePlayPause}>
          {playing ? <FaPause /> : <FaPlay />}
        </button>
      </div>
      <div className={styles.trackInfo}>
        <span className='no-wrap'>{track.title}</span>
        <div className={styles.timeInfo}>
          <span>{Math.floor(currentTime)} / {Math.floor(duration)} seconds</span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;