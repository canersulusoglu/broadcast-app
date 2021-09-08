import * as React from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
const useVideoJS = (videoJsOptions: any) => {
  const videoNode = React.useRef(null)
  const player = React.useRef<any>(null)

  React.useEffect(() => {
    player.current = videojs(videoNode.current, videoJsOptions)
    return () => {
      player.current.dispose()
    }
  }, [])

  const Video = React.useCallback(
    ({children, ...props}) => {
      return (
        <div data-vjs-player>
          <video ref={videoNode} className="video-js" {...props}>
            {children}
          </video>
        </div>
      )
    },
    [],
  )
  return {Video, player: player.current}
}

export default useVideoJS;