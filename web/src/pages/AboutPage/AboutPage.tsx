import { Link, routes } from '@redwoodjs/router'

const AboutPage = () => {
  return (
    <>
      <p>
        This site was created to demonstrate my mastery of Redwood: Look on my
        works, ye mighty, and despair!
      </p>
      <Link to={routes.home()}>Return home</Link>
    </>
  )
}

export default AboutPage
