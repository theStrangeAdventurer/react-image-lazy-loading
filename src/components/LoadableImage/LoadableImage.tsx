import React from 'react'
import styles from './LoadableImage.module.css'
import cn from 'classnames'
import useOnScreen from '../../hooks/use-on-screen';

export interface ILoadableImage {
  src: string;
  alt?: string;
  onLoad?(): void;
}
const LoadableImage = (props: ILoadableImage) => {
  const { src, alt = '', onLoad = () => {} } = props
  const [isLoaded, setIsLoaded] = React.useState(false)
  const imageRef = React.useRef<HTMLImageElement | null>(null)
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const isVisible = useOnScreen(containerRef);

  React.useEffect(() => {
    if (!isVisible || isLoaded) {
      return;
    }
    if (imageRef.current) {
      imageRef.current.onload = () => {
        setIsLoaded(true)
        onLoad()
      }
    }
  }, [isVisible, onLoad, isLoaded])

  return (
    <div ref={containerRef} className={cn(styles.container, {
      [styles.containerLoaded]: isLoaded
    })}>
      {(isVisible || isLoaded) && (<img ref={imageRef} className={cn(styles.image, {
        [styles.imageLoaded]: isLoaded
      })} src={src} alt={alt} />)}
    </div>
  )
}

export default LoadableImage