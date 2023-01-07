import React, { useState, useEffect } from 'react'

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window
    return {
        width,
        height,
    }
}

const Debug = () => {
    const [windowSize, setWindowSize] = useState(getWindowDimensions())
    let bootstrapWidth = 'bad value'
    let bootstrapHeight = 'bad value'

    useEffect(() => {
        function handleResize() {
            setWindowSize(getWindowDimensions())
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    if (windowSize.height >= 1200) bootstrapHeight = 'xl'
    else if (windowSize.height >= 992) bootstrapHeight = 'lg'
    else if (windowSize.height >= 768) bootstrapHeight = 'md'
    else if (windowSize.height >= 576) bootstrapHeight = 'sm'
    else if (windowSize.height < 576) bootstrapHeight = 'default'

    if (windowSize.width >= 1200) bootstrapWidth = 'xl'
    else if (windowSize.width >= 992) bootstrapWidth = 'lg'
    else if (windowSize.width >= 768) bootstrapWidth = 'md'
    else if (windowSize.width >= 576) bootstrapWidth = 'sm'
    else if (windowSize.width < 576) bootstrapWidth = 'default'

    return (
        <div>
            <h3>Debug Item</h3>
            <p>
                width: {windowSize.width} : {bootstrapWidth}
            </p>
            <p>
                height: {windowSize.height} : {bootstrapHeight}
            </p>
        </div>
    )
}

export default Debug
