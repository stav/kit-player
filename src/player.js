export function hotkeys(event, player) {
  const p = player
  // Full screen
  if (event.key === 'f') {
    p.isFullscreen() ? p.exitFullscreen() : p.requestFullscreen()
  }
  // Mute
  if (event.key === 'm') {
    p.muted(!p.muted())
  }
  // Play / pause
  if (event.key === ' ') {
    p.paused() ? p.play() : p.pause()
  }
  // Back 1 minute
  if (event.key === 'ArrowDown') {
    p.currentTime(p.currentTime() - 60)
  }
  // Back 10 seconds
  if (event.key === 'ArrowLeft' && !event.ctrlKey) {
    p.currentTime(p.currentTime() - 10)
  }
  // Back 1 seconds
  if (event.key === 'ArrowLeft' && event.ctrlKey) {
    p.currentTime(p.currentTime() - 1)
  }
  // Forward 1 minute
  if (event.key === 'ArrowUp') {
    p.currentTime(p.currentTime() + 60)
  }
  // Forward 10 seconds
  if (event.key === 'ArrowRight' && !event.ctrlKey) {
    p.currentTime(p.currentTime() + 10)
  }
  // Forward 1 seconds
  if (event.key === 'ArrowRight' && event.ctrlKey) {
    p.currentTime(p.currentTime() + 1)
  }
}
