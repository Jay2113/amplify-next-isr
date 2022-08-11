import { useEffect, useState } from 'react'

const App = ({ date }) => {
  const [afterBuildTimeSec, setAfterBuildTimeSec] = useState(0)
  const shouldReload = afterBuildTimeSec > 120
  const reload = () => {
    location.reload()
  }

  useEffect(() => {
    const buildDate = new Date(date)
    const timer = setInterval(() => {
      const sec = ((new Date().getTime() - buildDate.getTime()) / 1000).toFixed(0)
      setAfterBuildTimeSec(sec)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <div>
      <h3>{date}</h3>
      <div>
        <p>
          {afterBuildTimeSec} second(s) passed after built
        </p>
        <button disabled={!shouldReload} onClick={reload}>
          Reload
        </button>
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  return {
    props: {
      date: new Date().toString()
    },
    revalidate: 120
  }
}

export default App